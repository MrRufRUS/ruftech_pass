import { z } from 'zod'

export const ApiError = z.object({
  detail: z.string(),
})

export type IApiError = z.infer<typeof ApiError>

export const ValidationErrorItem = z.object({
  loc: z.array(z.union([z.string(), z.number()])),
  msg: z.string(),
  type: z.string(),
})

export type IValidationErrorItem = z.infer<typeof ValidationErrorItem>

export const ValidationError = z.object({
  detail: z.array(ValidationErrorItem),
})

export type IValidationError = z.infer<typeof ValidationError>
