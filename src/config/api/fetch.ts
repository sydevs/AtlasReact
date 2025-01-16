import axios from "axios";
import { AreaSchema, CountrySchema, RegionSchema, VenueSchema, CountrySlimSchema, EventSlimSchema, EventSchema } from "@/types";
import i18n from "@/config/i18n";
import atlasAuth from "./auth";
import { ClientSchema } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  }
});

client.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${atlasAuth.apiKey}`

  request.params = request.params || {}
  request.params['locale'] = i18n.resolvedLanguage

  return request;
});

const getGeojson = async () => {
  const response = await client.get("/geojson.json");
  return response.data;
};

const getCountries = async () => {
  const response = await client.get("/countries.json");
  return CountrySlimSchema.array().parse(response.data);
};

const getEvents = async (latitude: number, longitude: number, onlineOnly: boolean = false) => {
  const response = await client.get("/events.json", {
    params: {
      latitude: latitude,
      longitude: longitude,
      online: onlineOnly,
    },
  });

  return EventSlimSchema.array().parse(response.data);
};

const getCountry = async (code: string) => {
  const response = await client.get(`/countries/${code}.json`);
  return CountrySchema.parse(response.data);
};

const getRegion = async (id: number) => {
  const response = await client.get(`/regions/${id}.json`);
  return RegionSchema.parse(response.data);
};

const getArea = async (id: number) => {
  const response = await client.get(`/areas/${id}.json`);
  return AreaSchema.parse(response.data);
};

const getVenue = async (id: number) => {
  const response = await client.get(`/venues/${id}.json`);
  return VenueSchema.parse(response.data);
};

const getEvent = async (id: number) => {
  const response = await client.get(`/events/${id}.json`);
  return EventSchema.parse(response.data);
};

const getClient = async (uuid: string) => {
  const response = await client.get(`/clients/${uuid}.json`);
  return ClientSchema.parse(response.data);
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
  getClient,
};
