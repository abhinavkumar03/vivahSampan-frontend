import { z } from 'zod';

// User schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// Vendor schemas
export const vendorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(2, 'Category is required'),
  profile: z.object({
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
  }).and(z.record(z.string())),
});

// Media schemas
export const mediaSchema = z.object({
  vendorId: z.number(),
  type: z.enum(['image', 'video']),
  url: z.string().url('Invalid URL'),
  metadata: z.object({
    caption: z.string().optional(),
  }).and(z.record(z.string())),
});

// Helper function to validate forms
export function validateForm<T>(schema: z.ZodType<T>, data: unknown): {
  success: boolean;
  data?: T;
  error?: string;
} {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Validation failed' };
  }
}
