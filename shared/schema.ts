import { z } from "zod";

// Organization schema
export interface Organization {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}

export const insertOrganizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// Form schema
export interface Form {
  id: string;
  orgId: string;
  title: string;
  description: string;
  createdAt: number;
}

export const insertFormSchema = z.object({
  title: z.string().min(3, "Form title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type InsertForm = z.infer<typeof insertFormSchema>;

// Feedback schema
export type FeedbackCategory = "Complaint" | "Compliment";

export interface Feedback {
  id: string;
  formId: string;
  orgId: string;
  message: string;
  category: FeedbackCategory;
  anonymous: boolean;
  createdAt: number;
}

export const insertFeedbackSchema = z.object({
  message: z.string().min(10, "Feedback must be at least 10 characters"),
  category: z.enum(["Complaint", "Compliment"], {
    required_error: "Please select a category",
  }),
  anonymous: z.boolean().default(false),
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
