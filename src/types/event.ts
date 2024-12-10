
export type EventPreview = {
  id: number;
  label: string;
  online: boolean;
  address: string;
  recurrence: string;
  locationId: number;
  locationType: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  timing: string;
};

export type Event = {
  id: number;
  url: string;
  label: string;
  descriptionHtml: string;
  category: string;
  address: string;
  languageCode: string;
  path: string;
  registrationMode: string;
  registrationUrl: string;
  registrationQuestions: RegistrationQuestion[];
  timing: EventTiming;
  contact: EventContact;
  images: EventImage[];
  location: EventLocation;
  online: boolean;
};

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

export type RegistrationQuestion = {
  slug: string;
  title: string;
}
