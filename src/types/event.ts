import z from "zod"

export const EventTimingSchema = z.object({
  type: z.string(),
  localStartTime: z.string(),
  localEndTime: z.string().nullable(),
  duration: z.number().nullable(),
  timeZone: z.string(),
  
  firstDate: z.coerce.date(),
  lastDate: z.coerce.date().nullable(),
  upcomingDates: z.array(z.coerce.date()),
  recurrenceCount: z.number().nullable(),
  recurrenceType: z.enum(["daily", "weekly_1", "weekly_2", "monthly_1st", "monthly_2nd", "monthly_3rd", "monthly_4th", "monthly_last"]).nullable()
})

export const EventContactSchema = z.object({
  phoneName: z.string(),
  phoneNumber: z.string(),
})

export const EventLocationSchema = z.object({
  countryCode: z.string().length(2),
  regionCode: z.string().nullish(),
  areaPath: z.string(),
  venuePath: z.string().optional(),
  platform: z.enum(['zoom', 'google_meet', 'youtube']).optional(),
  areaName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  venue: z.object({
    name: z.string().nullable(),
    street: z.string(),
    city: z.string(),
    directionsUrl: z.string(),
    address: z.string(),
    postalCode: z.string().optional(),
  }).nullable(),
})

export const EventRegistrationSchema = z.object({
  mode: z.string(),
  externalUrl: z.string().optional(),
  maxParticipants: z.number().nullable(),
  participantCount: z.number(),
  questions: z.array(z.string()),
})

export const EventImageSchema = z.object({
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
  altText: z.string().optional(),
})

export const EventQuestionSchema = z.object({
  slug: z.string(),
  title: z.string(),
})

export const EventCoreSchema = z.object({
  id: z.number(),
  path: z.string(),
  label: z.string(),
  online: z.boolean(),
  languageCode: z.string(),
  category: z.enum(['dropin', 'course', 'single', 'festival', 'concert', 'inactive']),
})

export const EventSlimSchema = z.object({
  recurrenceType: z.enum(["daily", "weekly_1", "weekly_2", "monthly_1st", "monthly_2nd", "monthly_3rd", "monthly_4th", "monthly_last"]).nullable(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  nextDate: z.coerce.date(),
  firstDate: z.coerce.date(),
  duration: z.number().nullable(),
  timeZone: z.string(),
  locationId: z.number(),
  locationType: z.string(),
  distance: z.number().optional(),
}).merge(EventCoreSchema)

export const EventSchema = z.object({
  url: z.string(),
  description: z.string().nullable(),
  descriptionHtml: z.string().nullable(),

  registration: z.nullable(EventRegistrationSchema),
  timing: z.nullable(EventTimingSchema),
  contact: z.nullable(EventContactSchema),
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
