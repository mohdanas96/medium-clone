import z from 'zod'

const signupInput = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string(),
  lastName: z.string(),
})

const signinInput = z.object({
  username: z.string(),
  password: z.string(),
})

const updateUserInput = z.object({
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export type SignupParams = z.infer<typeof signupInput>

export type SigninParams = z.infer<typeof signinInput>

export type updateUserInput = z.infer<typeof updateUserInput>
