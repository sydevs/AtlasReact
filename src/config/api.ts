import axios from "axios";
import { Country, Region, Area, Event } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

const getCountry = async (id: number) => {
  const response = await client.post("/", {
    query: `{
      country(id: ${id}) {
        id
        label
        eventIds
        areas {
          id
          name
          eventIds
        }
        regions {
          id
          name
          eventIds
        }
      }
    }`
  });

  console.log(response)
  return response.data.data.country as Country;
};

const getRegion = async (id: number) => {
  const response = await client.post("/", {
    query: `{
      region(id: ${id}) {
        id
        name
        eventIds
        areas {
          id
          name
          eventIds
        }
      }
    }`
  });

  return response.data.data.area as Region;
};

const getArea = async (id: number) => {
  const response = await client.post("/", {
    query: `{
      area(id: ${id}) {
        id
        name
        eventIds
      }
    }`
  });

  return response.data.data.area as Area;
};

const getEvent = async (id: number) => {
  const response = await client.post("/", {
    query: `{
      event(id: ${id}) {
        id
        label
      }
    }`
  });

  return response.data.data.area as Event;
};

const getRegions = async (country_id: number) => {
  return getCountry(country_id).then(country => country.regions);
};

const getAreas = async (country_id: number) => {
  return getCountry(country_id).then(country => country.areas);
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
  getCountry,
  getRegion,
  getArea,
  getEvent,
  getRegions,
  getAreas,
  findManyEvents
}

export default AtlasService;