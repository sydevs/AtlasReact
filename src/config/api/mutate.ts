import axios from "axios";
import { Registration, RegistrationSchema } from "@/types";
import i18n from "@/config/i18n";
import atlasAuth from "./auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  }
});

const convertToSnakeCase = (obj: any) => {
  const snakeCasedObj: any = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
    snakeCasedObj[newKey] = obj[key];
  });

  return snakeCasedObj;
};

client.interceptors.request.use((request) => {
  const data = convertToSnakeCase(request.data);
  request.headers['Authorization'] = `Bearer ${atlasAuth.apiKey}`

  return {
    ...request,
    data,
    key: import.meta.env.VITE_ATLAS_API_KEY,
  };
});

const createRegistration = async (eventId: number, data: Registration) => {
  const response = await client.post(`/events/${eventId}/registrations.json`, {
    ...data,
    locale: i18n.resolvedLanguage,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  return RegistrationSchema.parse(response.data);
};

export default {
  createRegistration,
};
