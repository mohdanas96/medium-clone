import z from 'zod'

export const signupInput = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string(),
  lastName: z.string(),
})

export const signinInput = z.object({
  username: z.string(),
  password: z.string(),
})

export const updateUserInput = z.object({
  username: z
    .string()
    .nullable()
    .transform((value) => value ?? NaN),
  firstName: z
    .string()
    .nullable()
    .transform((value) => value ?? NaN),
  lastName: z
    .string()
    .nullable()
    .transform((value) => value ?? NaN),
})

export type SignupParams = z.infer<typeof signupInput>

export type SigninParams = z.infer<typeof signinInput>

export type updateUserInput = z.infer<typeof updateUserInput>
