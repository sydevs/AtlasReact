import z from "zod"

export const EventTimingSchema = z.object({
  firstDate: z.coerce.date(),
  lastDate: z.coerce.date().nullable(),
  upcomingDates: z.array(z.coerce.date()),
  //recurrenceCount: z.number(),

  startTime: z.string(),
  endTime: z.string().nullable(),

  recurrence: z.string(),
  duration: z.number().nullable(),
  timeZone: z.string(),
})

export const EventContactSchema = z.object({
  phoneName: z.string(),
  phoneNumber: z.string(),
})

export const EventLocationSchema = z.object({
  id: z.number(),
  type: z.string(),
  directionsUrl: z.string().nullish(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const EventRegistrationSchema = z.object({
  mode: z.string(),
  externalUrl: z.string().optional(),
  maxParticipants: z.number().nullable(),
  participantCount: z.number(),
  questions: z.array(z.object({
    slug: z.string(),
    title: z.string(),
  })),
})

export const EventImageSchema = z.object({
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
})

export const EventQuestionSchema = z.object({
  slug: z.string(),
  title: z.string(),
})

export const EventCoreSchema = z.object({
  id: z.number(),
  label: z.string(),
  online: z.boolean(),
  languageCode: z.string(),
})

export const EventSlimSchema = z.object({
  recurrence: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timing: z.string(),
  timeZone: z.string(),
  locationId: z.number(),
  locationType: z.string(),
}).merge(EventCoreSchema)

export const EventSchema = z.object({
  url: z.string(),
  description: z.string().nullable(),
  descriptionHtml: z.string().nullable(),
  language: z.string(),
  languageCode: z.string(),
  category: z.string(),

  registration: EventRegistrationSchema,
  timing: EventTimingSchema,
  contact: EventContactSchema,
  images: z.array(EventImageSchema),
  location: EventLocationSchema,
}).merge(EventCoreSchema)

export type Event = z.infer<typeof EventSchema>
export type EventSlim = z.infer<typeof EventSlimSchema>
export type EventTiming = z.infer<typeof EventTimingSchema>
export type EventContact = z.infer<typeof EventContactSchema>
export type EventLocation = z.infer<typeof EventLocationSchema>
export type EventQuestion = z.infer<typeof EventQuestionSchema>
export type EventRegistration = z.infer<typeof EventRegistrationSchema>
export type EventImage = z.infer<typeof EventImageSchema>
