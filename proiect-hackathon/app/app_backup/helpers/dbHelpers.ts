import { Models } from "appwrite";
import { Camera, City, Count, Detection, DetectionObject, Intersection, Location, TrafficLight, TrafficStats, User } from "../models/types";

export const toUser = (doc: Models.DefaultRow): User => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  email: doc.email,
  county: doc.county,
  sirutaCode: doc.sirutaCode,
  uatName: doc.uatName,
});

export const toCity = (doc: Models.DefaultRow): City => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  name: doc.name,
  trafficLights: doc.intersections,
  locations: doc.locations,
});

export const toIntersection = (doc: Models.DefaultRow): Intersection => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  name: doc.name,
  trafficLightIds: doc.trafficLightIds,
});

export const toTrafficLight = (doc: Models.DefaultRow): TrafficLight => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  intersectionId: doc.intersectionId,
  cityId: doc.cityId,
  hasCrosswalk: doc.hasCrosswalk,
  location: doc.location,
  status: doc.status,
  trafficLightStatus: doc.trafficLightStatus,
});

export const toCamera = (doc: Models.DefaultRow): Camera => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  trafficLightId: doc.trafficLightId,
  model: doc.model,
  streamUrl: doc.streamUrl,
  location: doc.location,
});

export const toLocation = (doc: Models.DefaultRow): Location => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  lat: doc.lat,
  lng: doc.lng,
});

export const toDetection = (doc: Models.DefaultRow): Detection => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  timestamp: doc.timestamp,
  cameraId: doc.cameraId,
  trafficLightId: doc.trafficLightId,
  objects: doc.objects,
});

export const toDetectionObject = (doc: Models.DefaultRow): DetectionObject => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  type: doc.type,
  confidence: doc.confidence,
});

export const toCount = (doc: Models.DefaultRow): Count => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  trafficLightId: doc.trafficLightId,
  cityId: doc.cityId,
  timestamp: doc.timestamp,
  cars: doc.cars,
  pedestrians: doc.pedestrians,
  bikes: doc.bikes,
});

export const toTrafficStats = (doc: Models.DefaultRow): TrafficStats => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  trafficLightId: doc.trafficLightId,
  cityId: doc.cityId,
  date: doc.date,
  carsPerHour: doc.carsPerHour,
  pedestriansPerHour: doc.pedestriansPerHour,
  bikesPerHour: doc.bikesPerHour,
});
