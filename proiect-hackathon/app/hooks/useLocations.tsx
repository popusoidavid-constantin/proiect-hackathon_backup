import { CITY_COLLECTION_ID, DB_ID, ID, LOCATIONS_COLLECTION_ID, tables } from "@/app/appwrite";
import { City, HookResponse, Location, TrafficLight } from "@/app/models/types";
import { Query } from "appwrite";
import { useCallback } from "react";
import { toLocation, toTrafficLight } from "../helpers/dbHelpers";
import { useAppDispatch } from "../store/hooks";

const useLocations = () => {
  const dispatch = useAppDispatch();
  const cityId = "6919a15b0038e678b09b";

  const createLocation = useCallback(async (data: City): Promise<HookResponse> => {
    try {
      const response = await tables.createRow({
        databaseId: DB_ID,
        tableId: LOCATIONS_COLLECTION_ID,
        rowId: ID.unique(),
        data,
      });

      return { success: true, message: "Location created", data: response };
    } catch (error) {
      return { success: false, message: "Error creating city", data: null };
    }
  }, []);

  const getLocation = useCallback(
    async (locationId: string): Promise<HookResponse> => {
      try {
        // ---------- 1. Fetch city ----------
        const response = await tables.getRow({
          databaseId: DB_ID,
          tableId: locationId,
          rowId: locationId,
        });

        const trLight = toTrafficLight(response);
        return { success: true, message: "Success", data: trLight };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Error fetching city", data: null };
      }
    },
    [dispatch]
  );

  const getAllLocations = useCallback(async (): Promise<HookResponse> => {
    try {
      const locationsRes = await tables.listRows({
        databaseId: DB_ID,
        tableId: LOCATIONS_COLLECTION_ID,
        queries: [Query.limit(5000)],
      });

      const locations: Location[] = locationsRes.rows.map((t) => toLocation(t));

      return { success: true, message: "Success", data: locations };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error fetching city", data: null };
    }
  }, [dispatch]);

  const updateLocation = useCallback(async (trafficLightId: string, data: TrafficLight): Promise<HookResponse> => {
    try {
      const response = await tables.updateRow({
        databaseId: DB_ID,
        tableId: CITY_COLLECTION_ID,
        rowId: trafficLightId,
        data,
      });

      return { success: true, message: "TRAFFIC LIGHT updated", data: response };
    } catch (error) {
      return { success: false, message: "Error updating city", data: null };
    }
  }, []);

  return { createLocation, getLocation, getAllLocations, updateLocation };
};

export default useLocations;
