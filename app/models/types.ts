import * as MyEnums from "./enums";

export interface HookResponse {
  success: boolean;
  message: string;
  data: unknown;
}

export interface User {
  id?: string;
  createdAt?: string;
  email: string;
  county: string;
  sirutaCode: number;
  uatName: string;
}
export interface User_DB {
  email: string;
  county: string;
  sirutaCode: number;
  uatName: string;
}

export interface City {
  id: string;
  createdAt: string;
  name: string;
  trafficLights: TrafficLight[];
  locations: Location[];
}
export interface City_DB {
  name: string;
  intersections: string[];
}

export interface Intersection {
  id: string;
  createdAt: string;
  name: string;
  trafficLightIds: string[];
}
export interface Intersection_DB {
  name: string;
  trafficLightIds: string[];
}

export interface TrafficLight {
  id: string;
  createdAt: string;
  intersectionId: string;
  cityId: string;
  hasCrosswalk: boolean;
  location: Location;
  status?: MyEnums.TraficLightStatus;
  trafficLightStatus: MyEnums.TraficLightColorState;
}
export interface TrafficLight_DB {
  intersectionId: string;
  cityId: string;
  hasCrosswalk: boolean;
  location: Location;
  status?: MyEnums.TraficLightStatus;
}

export interface Camera {
  id: string;
  createdAt: string;
  trafficLightId: string;
  model?: string;
  streamUrl: string;
  location: string; // id de locatie
}
export interface Camera_DB {
  trafficLightId: string;
  model?: string;
  streamUrl: string;
  location: string; // id de locatie
}

export interface Location {
  id: string;
  createdAt: string;
  lat: number;
  lng: number;
}
export interface Location_DB {
  lat: number;
  lng: number;
}

export interface Detection {
  id: string;
  createdAt: string;
  timestamp: string;
  cameraId: string;
  trafficLightId: string;
  objects: string[]; // id s
}
export interface Detection_DB {
  timestamp: string;
  cameraId: string;
  trafficLightId: string;
  objects: string[]; // id s
}

export interface DetectionObject {
  id: string;
  createdAt: string;
  type: MyEnums.DetectionObjectType;
  confidence: number;
}
export interface DetectionObject_DB {
  type: MyEnums.DetectionObjectType;
  confidence: number;
}

export interface Count {
  id: string;
  createdAt: string;
  trafficLightId: string;
  cityId: string;
  timestamp: string;
  cars: number;
  pedestrians: number;
  bikes?: number;
}
export interface Count_DB {
  trafficLightId: string;
  cityId: string;
  timestamp: string;
  cars: number;
  pedestrians: number;
  bikes?: number;
}

export interface TrafficStats {
  id: string;
  createdAt: string;
  trafficLightId: string;
  cityId: string;
  date: string;
  carsPerHour: number[];
  pedestriansPerHour: number[];
  bikesPerHour?: number[];
}
export interface TrafficStats_DB {
  trafficLightId: string;
  cityId: string;
  date: string;
  carsPerHour: number[];
  pedestriansPerHour: number[];
  bikesPerHour?: number[];
}

// export interface Alert {
//   id: string;
//   createdAt: string;
//   trafficLightId: string;
//   cityId: string;
//   type: "car_ran_red_light" | "congestion" | "accident" | "pedestrian_blocked";
//   timestamp: string;
//   severity: "low" | "medium" | "high";
// }
