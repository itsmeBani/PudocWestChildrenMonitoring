import { z } from 'zod';

export const malnutritionSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    caregiver: z.string().min(1, { message: "Caregiver name is required" }),
    purok: z.number().min(1, { message: "Purok is required" }),
    birthdate: z.string().min(1, { message: "Birthdate is required" }),
    sex: z.string().min(1, { message: "Sex is required" }),
    weight: z.number().min(1, { message: "Weight is required" }),
    height: z.number().min(1, { message: "Height is required" }),
});
