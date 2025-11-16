import { CITY_COLLECTION_ID, DB_ID, ID, tables, TRAFFIC_LIGHTS_COLLECTION_ID } from "@/app/appwrite";
import { City, HookResponse, TrafficLight } from "@/app/models/types";
import { Query } from "appwrite";
import { useCallback } from "react";
import { toCity, toTrafficLight } from "../helpers/dbHelpers";
import { useAppDispatch } from "../store/hooks";
import { setCity, setTrafficLights } from "../store/slices/citySlice";

const useCity = () => {
  const dispatch = useAppDispatch();
  const cityId = "6919a15b0038e678b09b";

  const createCity = useCallback(async (data: City): Promise<HookResponse> => {
    try {
      const response = await tables.createRow({
        databaseId: DB_ID,
        tableId: CITY_COLLECTION_ID,
        rowId: ID.unique(),
        data,
      });

      return { success: true, message: "City created", data: response };
    } catch (error) {
      return { success: false, message: "Error creating city", data: null };
    }
  }, []);

  const getCity = useCallback(async (): Promise<HookResponse> => {
    try {
      const response = await tables.getRow({
        databaseId: DB_ID,
        tableId: CITY_COLLECTION_ID,
        rowId: cityId,
      });

      const city = toCity(response);
      dispatch(setCity(city));

      // ---------- 2. Fetch traffic lights ----------
      const trafficLightsRes = await tables.listRows({
        databaseId: DB_ID,
        tableId: TRAFFIC_LIGHTS_COLLECTION_ID,
        queries: [Query.equal("cityId", cityId), Query.limit(5000)],
      });

      const trafficLights: TrafficLight[] = trafficLightsRes.rows.map((t) => toTrafficLight(t));

      // ---------- 3. Save in Redux ----------
      dispatch(setTrafficLights(trafficLights));

      return { success: true, message: "Success", data: city };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error fetching city", data: null };
    }
  }, [dispatch]);

  const updateCityData = useCallback(async (data: City): Promise<HookResponse> => {
    try {
      const response = await tables.updateRow({
        databaseId: DB_ID,
        tableId: CITY_COLLECTION_ID,
        rowId: cityId,
        data,
      });

      return { success: true, message: "City updated", data: response };
    } catch (error) {
      return { success: false, message: "Error updating city", data: null };
    }
  }, []);

  return { createCity, getCity, updateCityData };
};

export default useCity;
