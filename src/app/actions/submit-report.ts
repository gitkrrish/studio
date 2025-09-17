
"use server";

import { z } from "zod";

const schema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  location: z.string().optional(),
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
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.title?.[0] || 
               validatedFields.error.flatten().fieldErrors.description?.[0] || 
               validatedFields.error.flatten().fieldErrors.category?.[0] || 
               "Invalid data provided.",
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
