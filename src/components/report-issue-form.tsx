'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { issueCategories } from '@/lib/data';
import { Camera, MapPin, Sparkles } from 'lucide-react';
import { getCategorySuggestion } from '@/app/actions/categorize-issue';
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
  const [state, formAction] = useFormState(getCategorySuggestion, { success: false, message: "" });
  const [category, setCategory] = React.useState('');

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Suggestion Ready' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success && state.category) {
        setCategory(state.category);
      }
    }
  }, [state, toast]);


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a New Issue</CardTitle>
        <CardDescription>Provide details about the issue you&apos;ve found. The more details, the better!</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Large pothole on Elm Street" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the issue in detail..." className="min-h-[120px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Category</Label>
                 <Button formAction={formAction} type="submit" variant="outline" size="sm" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Suggest
                </Button>
              </div>
              <Select name="category" value={category} onValueChange={setCategory}>
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
              <Button variant="outline" className="w-full justify-start text-muted-foreground gap-2">
                <MapPin className="h-4 w-4" />
                Pick location from map
              </Button>
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