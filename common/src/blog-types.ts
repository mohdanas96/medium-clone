import z from 'zod'

export const createBlogInputs = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
})

export const updateBlogInputs = z.object({
  title: z.string().nullable(),
  content: z.string().nullable(),
  published: z.boolean().nullable(),
})

export type CreateBlogParams = z.infer<typeof createBlogInputs>

export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>
