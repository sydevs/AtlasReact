import axios from "axios";
import { Area, Country, Region, Venue, Event, CountrySlim, EventSlim } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

const getCountries = async () => {
  const response = await client.get("/countries.json");
  return response.data as CountrySlim[];
};

const getEvents = async (latitude: number, longitude: number) => {
  const response = await client.get("/events.json", {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  });

  return response.data as EventSlim[];
};

const getCountry = async (code: string) => {
  const response = await client.get(`/countries/${code}.json`);
  return response.data as Country;
};

const getRegion = async (id: number) => {
  const response = await client.get(`/regions/${id}.json`);
  return response.data as Region;
};

const getArea = async (id: number) => {
  const response = await client.get(`/areas/${id}.json`);
  return response.data as Area;
};

const getVenue = async (id: number) => {
  const response = await client.get(`/venues/${id}.json`);
  return response.data as Venue;
};

const getEvent = async (id: number) => {
  const response = await client.get(`/events/${id}.json`);
  return response.data as Event;
};

export default {
  getCountries,
  getEvents,
  getCountry,
  getRegion,
  getArea,
  getVenue,
  getEvent,
};
