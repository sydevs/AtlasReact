import axios from "axios";
import { Country, Region, Area, Event, EventPreview, Venue } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT + "/graphql",
  headers: {
    "Content-type": "application/json",
  },
});

const graphqlTypes = {
  country: `
    id
    label
    eventCount
    regions {
      id
      name
      eventCount
    }
    areas {
      id
      name
      eventCount
    }
  `,
  region: `
    id
    parentId
    parentType
    name
    eventCount
    areas {
      id
      name
      eventCount
    }
  `,
  area: `
    id
    parentId
    parentType
    name
    eventIds
    eventCount
  `,
  event: `
    id
    url
    label
    descriptionHtml
    category
    address
    languageCode
    path
    registrationMode
    registrationUrl
    registrationQuestions {
      slug
      title
    }
    timing {
      duration
      timeZone
      firstDate
      lastDate
      upcomingDates
      recurrence
      recurrenceCount
    }
    contact {
      phoneName
      phoneNumber
      emailName
      emailAddress
      meetup
      facebook
    }
    images {
      url
      thumbnailUrl
    }
    location {
      id
      type
      label
      directionsUrl
    }
  `,
  venue: `
    id
    name
    eventIds
    parentId
    parentType
  `,
};

const getGeojson = async () => {
  const response = await client.post("/", {
    query: `{
      geojson(languageCode: "en", locale: "en") { 
        type
        features {
          type
          id
          geometry {
            type
            coordinates
          }
          properties {
            id
            type
            label
            latitude
            longitude
            radius
            onlineEventIds
            offlineEventIds
            parentId
            parentType
          }
        }
      }
    }`,
  });

  return response.data.data.geojson;
};

const getCountries = async () => {
  const response = await client.post("/", {
    query: `{ countries { ${graphqlTypes.country} } }`,
  });

  return response.data.data.countries as Country[];
};

const getCountry = async (id: number) => {
  const response = await client.post("/", {
    query: `{ country(id: ${id}) { ${graphqlTypes.country} } }`,
  });

  return response.data.data.country as Country;
};

const getRegion = async (id: number) => {
  const response = await client.post("/", {
    query: `{ region(id: ${id}) { ${graphqlTypes.region} } }`,
  });

  return response.data.data.region as Region;
};

const getArea = async (id: number) => {
  const response = await client.post("/", {
    query: `{ area(id: ${id}) { ${graphqlTypes.area} } }`,
  });

  return response.data.data.area as Area;
};

const getVenue = async (id: number) => {
  const response = await client.post("/", {
    query: `{ venue(id: ${id}) { ${graphqlTypes.venue} } }`,
  });

  return response.data.data.venue as Venue;
};

const getEvent = async (id: number) => {
  const response = await client.post("/", {
    query: `{ event(id: ${id}) { ${graphqlTypes.event} } }`,
  });

  return response.data.data.event as Event;
};

const findManyEvents = async (ids: number[]) => {
  const response = await client.post("/", {
    query: `{
      events(ids: ${ids}) {
        id
        label
      }
    }`
  });

  return response.data.data.events as EventPreview[];
};

export default {
  getGeojson,
  getCountries,
  getCountry,
  getRegion,
  getArea,
  getVenue,
  getEvent,
  findManyEvents
};