import z from "zod"

export const RegistrationSchema = z.object({
  startingAt: z.coerce.date().min(new Date()),
  name: z.string().regex(/^[a-zA-Z\s]{3,}$/),
  email: z.string().email(),
  questions: z.record(z.string()).optional(),
})

export type Registration = z.infer<typeof RegistrationSchema>
