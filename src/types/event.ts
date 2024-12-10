
export type EventCore = {
  id: number;
  label: string;
  online: boolean;
  address: string;
  parentId: number;
  parentType: string;
  timeZone: string;
  languageCode: string;
}

export type EventSlim = {
  recurrence: string;
  latitude: number;
  longitude: number;
  timing: string;
} & EventCore;

export type Event = {
  url: string;
  description: string;
  descriptionHtml: string;
  location: EventLocation;
  language: string;
  category: string;
  registrationUrl: string;
  registrationMode: string;
  registrationQuestions: EventQuestion[];
  timing: EventTiming;
  contact: EventContact;
  images: EventImage[];
} & EventCore;

export type EventImage = {
  url: string;
  thumbnailUrl: string;
}

export type EventContact = {
  phoneName: string;
  phoneNumber: string;
  emailName: string;
  emailAddress: string;
  meetup: string;
  facebook: string;
}

export type EventLocation = {
  id: number;
  type: string;
  label: string;
  directionsUrl: string;
  latitude: number;
  longitude: number;
}

export type EventTiming = {
  duration: number;
  timeZone: string;
  firstDate: string;
  lastDate: string;
  upcomingDates: string[];
  recurrence: string;
  recurrenceCount: number;
}

export type EventQuestion = {
  slug: string;
  title: string;
}
