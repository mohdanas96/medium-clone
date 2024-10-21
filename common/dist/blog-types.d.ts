import z from 'zod';
declare const createBlogInputs: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
}, {
    title: string;
    content: string;
    published: boolean;
}>;
declare const updateBlogInputs: z.ZodObject<{
    title: z.ZodNullable<z.ZodString>;
    content: z.ZodNullable<z.ZodString>;
    published: z.ZodNullable<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string | null;
    content: string | null;
    published: boolean | null;
}, {
    title: string | null;
    content: string | null;
    published: boolean | null;
}>;
export type CreateBlogParams = z.infer<typeof createBlogInputs>;
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>;
export {};
