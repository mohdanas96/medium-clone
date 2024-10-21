import z from 'zod';
declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}, {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}>;
declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
declare const updateUserInput: z.ZodObject<{
    username: z.ZodNullable<z.ZodString>;
    firstName: z.ZodNullable<z.ZodString>;
    lastName: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
}, {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export type SigninParams = z.infer<typeof signinInput>;
export type updateUserInput = z.infer<typeof updateUserInput>;
export {};
