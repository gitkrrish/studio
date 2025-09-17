
"use server";

import { z } from "zod";
import { addIssue } from "@/services/issue-service";
import { revalidatePath } from "next/cache";

const schema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  location: z.string().min(1, { message: "Please enter a location." }),
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
    const firstError = validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]]?.[0];
    return {
      success: false,
      message: firstError || "Invalid data provided. Please check the form and try again.",
    };
  }

  try {
    // In a real app, you would get the current user from your authentication system.
    await addIssue({
        ...validatedFields.data,
        category: validatedFields.data.category as any, // Cast because category is a string from the form
    });

    // Revalidate paths to show the new issue dynamically
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/my-reports');
    revalidatePath('/admin', 'layout');


    return {
      success: true,
      message: "Thank you! Your issue has been successfully reported.",
    };

  } catch (error) {
    console.error("Failed to submit report:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
