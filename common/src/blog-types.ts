import z from 'zod'

export const createBlogInputs = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
})

export const updateBlogInputs = z.object({
  title: z
    .string()
    .nullable()
    .transform((value) => value ?? NaN),
  content: z
    .string()
    .nullable()
    .transform((value) => value ?? NaN),
  published: z
    .boolean()
    .nullable()
    .transform((value) => value ?? NaN),
})

export type CreateBlogParams = z.infer<typeof createBlogInputs>

export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>
