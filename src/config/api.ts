import axios from "axios";
import { Country, Region, Area, Event } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
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
    locationId
    locationType
    label
    areaId
  `,
  venue: `
    id
    name
    eventIds
  `,
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

  return response.data.data.events as Event[];
};

const AtlasService = {
  getCountries,
  getCountry,
  getRegion,
  getArea,
  getEvent,
  findManyEvents
}

export default AtlasService;