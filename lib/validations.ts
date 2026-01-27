import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores"),
  fullName: z.string().min(1, "Full name is required"),
});

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required").max(100),
  oneLiner: z.string().max(140, "One-liner must be under 140 characters").optional(),
  description: z.string().max(2000).optional(),
  stage: z.enum(["idea", "building", "launched", "scaling"]).default("idea"),
  industry: z.string().optional(),
  location: z.string().optional(),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  isOpenToInvestors: z.boolean().default(false),
});

export const logSchema = z.object({
  type: z.enum(["shipped", "experiment", "decision", "pivot", "failure"]),
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().max(5000).optional(),
  companyId: z.string().uuid(),
  isFeedbackRequest: z.boolean().default(false),
  feedbackOptions: z.array(z.object({
    id: z.string(),
    text: z.string(),
    votes: z.number().default(0),
  })).optional(),
});

export const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  bio: z.string().max(500).optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type LogFormData = z.infer<typeof logSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
