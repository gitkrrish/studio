
'use client';

import React, { useRef, useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { issueCategories } from '@/lib/data';
import { Camera, Sparkles, Loader2 } from 'lucide-react';
import { getCategorySuggestion } from '@/app/actions/categorize-issue';
import { submitReport } from '@/app/actions/submit-report';
import { useToast } from '@/hooks/use-toast';

export function ReportIssueForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSuggestionPending, startSuggestionTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  
  const [category, setCategory] = useState('');

  const handleSuggestCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const description = formData.get('description') as string;

    if (!description || description.length < 10) {
      toast({
        title: 'Error',
        description: "Please enter a description of at least 10 characters to get a suggestion.",
        variant: 'destructive',
      });
      return;
    }

    startSuggestionTransition(async () => {
      const result = await getCategorySuggestion(formData);
      if (result.message) {
        toast({
            title: result.success ? 'Suggestion Ready' : 'Error',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
        if (result.success && result.category) {
            setCategory(result.category);
        }
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    
    startSubmitTransition(async () => {
      const result = await submitReport(formData);
      toast({
        title: result.success ? 'Report Submitted!' : 'Submission Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
      if (result.success) {
        form.reset();
        setCategory('');
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a New Issue</CardTitle>
        <CardDescription>Provide details about the issue you've found. The more details, the better!</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Large pothole on Elm Street" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the issue in detail..." className="min-h-[120px]" required minLength={10} />
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
              <Select name="category" value={category} onValueChange={setCategory} required>
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
            </div>
             <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Near Civil Lines, Sagar" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="media">Photo / Video</Label>
            <Button variant="outline" asChild className="cursor-pointer">
              <label htmlFor="media-upload" className="w-full justify-start text-muted-foreground gap-2">
                <Camera className="h-4 w-4" />
                Upload media
                <Input id="media-upload" type="file" name="media" className="sr-only" />
              </label>
            </Button>
            <p className="text-xs text-muted-foreground">You can upload an image or a short video clip.</p>
          </div>

          <div className="flex justify-end">
             <Button type="submit" disabled={isSubmitPending} className="w-full md:w-auto">
              {isSubmitPending ? <Loader2 className="animate-spin" /> : "Submit Report"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
