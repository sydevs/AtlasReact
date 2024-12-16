import axios from "axios";
import { Area, Country, Region, Venue, CountrySlim, EventSlim, EventSchema } from "@/types";
import i18n from "@/config/i18n";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  }
});

client.interceptors.request.use((config) => {
  // use config.params if it has been set
  config.params = config.params || {};

  // add any client instance specific params to config
  config.params['locale'] = i18n.resolvedLanguage;

  //const params = new URLSearchParams();
  //config.params['api-key'] = process.env.VUE_APP_API_KEY;

  return config;
});

const getGeojson = async () => {
  const response = await client.get("/geojson.json");
  return response.data;
};

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
  return EventSchema.parse(response.data);
};

export default {
  getGeojson,
  getCountries,
  getEvents,
  getCountry,
  getRegion,
  getArea,
  getVenue,
  getEvent,
};