import { z } from 'zod'

export const PasswordCreate = z.object({
  service_name: z.string(),
  service_url: z.string().url().nullable().optional(),
  login: z.string(),
  password: z.string(),
})

export type IPasswordCreate = z.infer<typeof PasswordCreate>

export const PasswordPublic = z.object({
  id: z.number().int(),
  service_name: z.string(),
})

export type IPasswordPublic = z.infer<typeof PasswordPublic>

export const PasswordDetail = z.object({
  id: z.number().int(),
  service_name: z.string(),
  service_url: z.string().url().nullable().optional(),
  login: z.string(),
  password_hash: z.string(),
})

export type IPasswordDetail = z.infer<typeof PasswordDetail>

export const PasswordUpdate = z.object({
  service_name: z.string().nullable().optional(),
  service_url: z.string().url().nullable().optional(),
  login: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
})

export type IPasswordUpdate = z.infer<typeof PasswordUpdate>
