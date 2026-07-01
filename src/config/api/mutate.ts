import type { Registration } from '@/types'

import z from 'zod'

import client from './client'

// Confirmation returned by `POST /api/events/:id/register` (EventRegistrationResponse).
const RegistrationResponseSchema = z.object({
  ok: z.literal(true),
  registration: z.object({ id: z.number(), uuid: z.string() }),
})

export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>

const createRegistration = async (
  eventId: number,
  data: Registration,
): Promise<RegistrationResponse> => {
  const response = await client.post(`/events/${eventId}/register`, {
    email: data.email,
    name: data.name,
    startingAt: data.startingAt.toISOString(),
    questions: data.questions,
    subscribe: data.subscribe,
  })

  return RegistrationResponseSchema.parse(response.data)
}

export default {
  createRegistration,
}
