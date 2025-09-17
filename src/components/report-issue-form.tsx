
'use client';

import React, { useEffect, useRef, useState, useTransition, useActionState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { issueCategories } from '@/lib/data';
import { Camera, Sparkles, Loader2, X } from 'lucide-react';
import { getCategorySuggestion } from '@/app/actions/categorize-issue';
import { submitReport } from '@/app/actions/submit-report';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const initialSubmitState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = React.useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="animate-spin" /> : 'Submit Report'}
    </Button>
  );
}

export function ReportIssueForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, formAction] = useActionState(submitReport, initialSubmitState);
  
  const [isSuggestionPending, startSuggestionTransition] = useTransition();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    mediaDataUri: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setFormData(prev => ({ ...prev, mediaDataUri: loadEvent.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setFormData(prev => ({...prev, mediaDataUri: ''}));
    // Reset file input
    const fileInput = formRef.current?.querySelector('input[type="file"]') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }
  
  const handleSuggestCategory = async () => {
    if (!formData.description || formData.description.length < 10) {
      toast({
        title: 'Error',
        description: 'Please enter a description of at least 10 characters to get a suggestion.',
        variant: 'destructive',
      });
      return;
    }

    startSuggestionTransition(async () => {
      const suggestionFormData = new FormData();
      suggestionFormData.append('description', formData.description);
      const result = await getCategorySuggestion(suggestionFormData);
      if (result.message) {
        toast({
            title: result.success ? 'Suggestion Ready' : 'Error',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
        if (result.success && result.category) {
            handleCategoryChange(result.category);
        }
      }
    });
  };

  useEffect(() => {
    if (submitState.message) {
      toast({
        title: submitState.success ? 'Report Submitted!' : 'Submission Failed',
        description: submitState.message,
        variant: submitState.success ? 'default' : 'destructive',
      });
      if (submitState.success) {
        formRef.current?.reset();
        setFormData({ title: '', description: '', category: '', location: '', mediaDataUri: '' });
      }
    }
  }, [submitState, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a New Issue</CardTitle>
        <CardDescription>Provide details about the issue you've found. The more details, the better!</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Large pothole on Elm Street" required value={formData.title} onChange={handleInputChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the issue in detail..." className="min-h-[120px]" required minLength={10} value={formData.description} onChange={handleInputChange}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Category</Label>
                <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleSuggestCategory} disabled={isSuggestionPending}>
                  {isSuggestionPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  AI Suggest
                </Button>
              </div>
              <Select name="category-select" value={formData.category} onValueChange={handleCategoryChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {issueCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <input type="hidden" name="category" value={formData.category} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Near Civil Lines, Sagar" required value={formData.location} onChange={handleInputChange}/>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="media">Photo / Video</Label>
            {formData.mediaDataUri ? (
                <div className="relative">
                    <Image src={formData.mediaDataUri} alt="Media preview" width={200} height={200} className="rounded-md border aspect-video object-cover" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={handleRemoveMedia}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove media</span>
                    </Button>
                </div>
            ) : (
                <Button variant="outline" asChild className="cursor-pointer">
                <label htmlFor="media-upload" className="w-full justify-start text-muted-foreground gap-2">
                    <Camera className="h-4 w-4" />
                    Upload media
                    <Input id="media-upload" type="file" name="media" className="sr-only" onChange={handleMediaChange} accept="image/*" />
                </label>
                </Button>
            )}
             <input type="hidden" name="mediaDataUri" value={formData.mediaDataUri} />
            <p className="text-xs text-muted-foreground">You can upload an image or a short video clip.</p>
          </div>

          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
