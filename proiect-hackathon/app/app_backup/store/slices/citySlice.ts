import { City, Location, TrafficLight } from "@/app/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: City = {
  id: "",
  createdAt: "",
  name: "",
  trafficLights: [] as TrafficLight[],
  locations: [] as Location[],
};

const citySlice = createSlice({
  name: "cityState",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      return action.payload;
    },

    updateCity: (state, action: PayloadAction<Partial<City>>) => {
      Object.assign(state, action.payload);
    },

    setTrafficLights: (state, action: PayloadAction<TrafficLight[]>) => {
      state.trafficLights = action.payload;
    },
    createTrafficLightRedux: (state, action: PayloadAction<TrafficLight>) => {
      state.trafficLights.push(action.payload);
    },
    updateTrafficLights: (state, action: PayloadAction<TrafficLight>) => {
      const index = state.trafficLights.findIndex((trafficLight) => trafficLight.id === action.payload.id);
      if (index !== -1) {
        state.trafficLights[index] = action.payload;
      }
    },

    clearCity: () => initialState,
  },
});

export const { setCity, updateCity, clearCity, setTrafficLights, updateTrafficLights, createTrafficLightRedux } = citySlice.actions;

export default citySlice.reducer;
