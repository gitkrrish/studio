
"use server";

import { z } from "zod";

const schema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  location: z.string().nullable().optional().default(""),
});

type FormState = {
  success: boolean;
  message: string;
};

export async function submitReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors)[0]?.[0];
    
    return {
      success: false,
      message: firstError || "Invalid data provided. Please check the form and try again.",
    };
  }

  // In a real app, you would save this data to a database.
  // For now, we'll just simulate a successful submission.
  console.log("New issue submitted:", validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: "Thank you! Your issue has been successfully reported.",
  };
}
