import { client, DB_ID, ID, tables, TRAFFIC_LIGHTS_COLLECTION_ID } from "@/app/appwrite";
import { City, HookResponse, TrafficLight } from "@/app/models/types";
import { Models, Query } from "appwrite";
import { useCallback } from "react";
import { toTrafficLight } from "../helpers/dbHelpers";
import { useAppDispatch } from "../store/hooks";
import { createTrafficLightRedux, setTrafficLights, updateTrafficLights } from "../store/slices/citySlice";

const useTrafficLights = () => {
  const dispatch = useAppDispatch();
  const cityId = "6919a15b0038e678b09b";

  const subscribeToTrafficLights = useCallback(async () => {
    const unsubscribe = client.subscribe(`databases.${DB_ID}.collections.${TRAFFIC_LIGHTS_COLLECTION_ID}.documents.*`, (res) => {
      console.log("EVENT RAW:", res);
      const event = res.events[0];
      const doc = res.payload as Models.DefaultRow;

      console.log(event);

      const trafficLight = toTrafficLight(doc);

      if (res.events.some((e) => e.endsWith(".create"))) {
        dispatch(createTrafficLightRedux(trafficLight));
      }
      if (res.events.some((e) => e.endsWith(".update"))) {
        dispatch(updateTrafficLights(trafficLight));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const createTrafficLight = useCallback(async (data: City): Promise<HookResponse> => {
    try {
      const response = await tables.createRow({
        databaseId: DB_ID,
        tableId: TRAFFIC_LIGHTS_COLLECTION_ID,
        rowId: ID.unique(),
        data,
      });

      return { success: true, message: "TRAFFIC LIGHT created", data: response };
    } catch (error) {
      return { success: false, message: "Error creating city", data: null };
    }
  }, []);

  const getTrafficLight = useCallback(
    async (tarfficLightId: string): Promise<HookResponse> => {
      try {
        // ---------- 1. Fetch city ----------
        const response = await tables.getRow({
          databaseId: DB_ID,
          tableId: tarfficLightId,
          rowId: tarfficLightId,
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

  const getAllTrafficLights = useCallback(async (): Promise<HookResponse> => {
    try {
      const trafficLightsRes = await tables.listRows({
        databaseId: DB_ID,
        tableId: TRAFFIC_LIGHTS_COLLECTION_ID,
        queries: [Query.equal("cityId", cityId), Query.limit(5000)],
      });

      const trafficLights: TrafficLight[] = trafficLightsRes.rows.map((t) => toTrafficLight(t));

      dispatch(setTrafficLights(trafficLights));

      return { success: true, message: "Success", data: trafficLights };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error fetching city", data: null };
    }
  }, [dispatch, setTrafficLights]);

  const updateTrafficLight = useCallback(async (trafficLightId: string, data: TrafficLight): Promise<HookResponse> => {
    try {
      const response = await tables.updateRow({
        databaseId: DB_ID,
        tableId: TRAFFIC_LIGHTS_COLLECTION_ID,
        rowId: trafficLightId,
        data,
      });

      return { success: true, message: "TRAFFIC LIGHT updated", data: response };
    } catch (error) {
      return { success: false, message: "Error updating city", data: null };
    }
  }, []);

  return { createTrafficLight, getTrafficLight, getAllTrafficLights, updateTrafficLight, subscribeToTrafficLights };
};

export default useTrafficLights;
