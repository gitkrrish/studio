
'use client';

import React, { useEffect, useRef, useState, useTransition, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { issueCategories } from '@/lib/data';
import { Camera, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { getCategorySuggestion } from '@/app/actions/categorize-issue';
import { submitReport } from '@/app/actions/submit-report';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Report"}
    </Button>
  );
}

export function ReportIssueForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [category, setCategory] = useState('');
  const [isSuggestionPending, startSuggestionTransition] = useTransition();

  const [submitState, submitAction] = useActionState(submitReport, { success: false, message: "" });


  useEffect(() => {
    if (submitState.message) {
       toast({
        title: submitState.success ? 'Report Submitted!' : 'Submission Failed',
        description: submitState.message,
        variant: submitState.success ? 'default' : 'destructive',
      });
      if (submitState.success) {
        formRef.current?.reset();
        setCategory('');
      }
    }
  }, [submitState, toast]);

  const handleSuggestCategory = async () => {
    const description = descriptionRef.current?.value;
    if (!description || description.length < 10) {
      toast({
        title: 'Error',
        description: "Please enter a description of at least 10 characters to get a suggestion.",
        variant: 'destructive',
      });
      return;
    }

    startSuggestionTransition(async () => {
      const result = await getCategorySuggestion(new FormData(formRef.current!));
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a New Issue</CardTitle>
        <CardDescription>Provide details about the issue you've found. The more details, the better!</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={submitAction} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Large pothole on Elm Street" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea ref={descriptionRef} id="description" name="description" placeholder="Describe the issue in detail..." className="min-h-[120px]" required minLength={10} />
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
              <Select value={category} onValueChange={setCategory} required>
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
              <Input type="hidden" name="category" value={category} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Button type="button" variant="outline" className="w-full justify-start text-muted-foreground gap-2">
                <MapPin className="h-4 w-4" />
                Pick location from map
              </Button>
              <Input type="hidden" name="location" value="Sagar, MP" />
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
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
