import { z } from 'zod';

export const malnutritionSchema = z.object({
    firstName: z.string().min(1, { message: "firstName name is required" }),
    lastName: z.string().min(1, { message: "lastName name is required" }),
    caregiver: z.string().min(1, { message: "Caregiver name is required" }),
    purok: z.number().min(1, { message: "Purok is required" }),
    birthdate: z.string().min(1, { message: "Birthdate is required" }),
    sex: z.string().min(1, { message: "Sex is required" }),
    weight: z
        .string()
        .min(1, { message: "Weight is required" })
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Weight must be a valid number" }),
    height: z
        .string()
        .min(1, { message: "Height is required" })
        .regex(/^\d+$/, { message: "Height must be a valid number" }),
});

