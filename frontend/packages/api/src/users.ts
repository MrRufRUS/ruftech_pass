import { z } from 'zod'

export const LoginRequest = z.object({
  username: z.string(),
  password: z.string(),
})

export type ILoginRequest = z.infer<typeof LoginRequest>

export const SignupRequest = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email().nullable().optional(),
})

export type ISignupRequest = z.infer<typeof SignupRequest>

export const TokenInfo = z.object({
  access_token: z.string(),
  token_type: z.string(),
})

export type ITokenInfo = z.infer<typeof TokenInfo>

export const UserMe = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string().email().nullable().optional(),
})

export type IUserMe = z.infer<typeof UserMe>

export const UserUpdate = z.object({
  email: z.string().email().nullable().optional(),
  password: z.string().nullable().optional(),
})

export type IUserUpdate = z.infer<typeof UserUpdate>

export const MessageResponse = z.object({
  message: z.string(),
})

export type IMessageResponse = z.infer<typeof MessageResponse>
