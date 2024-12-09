import axios from "axios";
import { Event } from "@/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

const getEvents = async (latitude: number, longitude: number) => {
  const response = await client.get("/events.json", {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  });

  return response.data as Event[];
};

export default {
  getEvents
};
