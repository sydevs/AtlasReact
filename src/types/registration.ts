import z from 'zod'

export const RegistrationSchema = z.object({
  startingAt: z.coerce.date(),
  name: z.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\-\s]{3,}$/),
  email: z.string().email(),
  questions: z.record(z.string()).optional(),
  // Opt-in mailing-list consent (unchecked by default). SahajCloud records it as
  // `mailingListSubscribedAt`; the widget sends it regardless of backend support.
  subscribe: z.boolean().optional(),
})

export type Registration = z.infer<typeof RegistrationSchema>
