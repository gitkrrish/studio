"use server";

import { categorizeIssue as categorizeIssueWithAI } from "@/ai/flows/categorize-issue-with-ai";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

type FormState = {
  success: boolean;
  message: string;
  category?: string;
};

export async function getCategorySuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please enter a description of at least 10 characters to get a suggestion.",
    };
  }

  try {
    const { description } = validatedFields.data;
    const result = await categorizeIssueWithAI({ description });
    
    if (result.category) {
      return {
        success: true,
        message: `We've suggested a category based on your description.`,
        category: result.category,
      };
    } else {
      return { success: false, message: "Could not determine a category." };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred while analyzing the issue." };
  }
}