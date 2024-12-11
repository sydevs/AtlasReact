
export type EventCore = {
  id: number;
  label: string;
  online: boolean;
  parentId: number;
  parentType: string;
  languageCode: string;
}

export type EventSlim = {
  recurrence: string;
  address: string;
  latitude: number;
  longitude: number;
  timing: string;
  timeZone: string;
} & EventCore;

export type Event = {
  url: string;
  description: string;
  descriptionHtml: string;
  language: string;
  languageCode: string;
  category: string;

  registration: EventRegistration;
  timing: EventTiming;
  contact: EventContact;
  images: EventImage[];
  location: EventLocation;
} & EventCore;

export type EventRegistration = {
  mode: string;
  externalUrl: string;
  maxParticipants: number;
  participantCount: number;
  questions: EventQuestion[];
};

export type EventImage = {
  url: string;
  thumbnailUrl: string;
}

export type EventTiming = {
  firstDate: Date;
  lastDate: Date;
  upcomingDates: Date[];
  recurrenceCount: number;

  startTime: string;
  endTime: string;

  recurrence: string;
  duration: number;
  timeZone: string;
}

export type EventContact = {
  phoneName: string;
  phoneNumber: string;
}

export type EventLocation = {
  id: number;
  type: string;
  directionsUrl: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type EventQuestion = {
  slug: string;
  title: string;
}
