import { DB_ID, DETECTION_OBJECT_COLLECTION_ID, ID, tables } from "@/app/appwrite";
import { DetectionObject, DetectionObject_DB, HookResponse } from "@/app/models/types";
import { Query } from "appwrite";
import { useCallback } from "react";

const useDetectionObject = () => {
  const createDetectionObject = useCallback(async (data: DetectionObject_DB): Promise<HookResponse> => {
    try {
      const response = await tables.createRow({
        databaseId: DB_ID,
        tableId: DETECTION_OBJECT_COLLECTION_ID,
        rowId: ID.unique(),
        data: {
          type: data.type,
          confidence: data.confidence,
        },
      });

      return { success: true, message: "Detection object created", data: response };
    } catch (error) {
      console.error("Error creating detection object:", error);
      return { success: false, message: "Error creating detection object", data: null };
    }
  }, []);

  const getDetectionObject = useCallback(async (detectionId: string): Promise<HookResponse> => {
    try {
      const response = await tables.getRow({
        databaseId: DB_ID,
        tableId: DETECTION_OBJECT_COLLECTION_ID,
        rowId: detectionId,
      });

      return { success: true, message: "Detection object fetched", data: response };
    } catch (error) {
      console.error("Error fetching detection object:", error);
      return { success: false, message: "Error fetching detection object", data: null };
    }
  }, []);

  const getAllDetectionObjects = useCallback(async (): Promise<HookResponse> => {
    try {
      const response = await tables.listRows({
        databaseId: DB_ID,
        tableId: DETECTION_OBJECT_COLLECTION_ID,
        queries: [Query.limit(5000)],
      });

      const detectionArray: DetectionObject[] = response.rows.map((row) => ({
        id: row.$id,
        createdAt: row.$createdAt,
        type: row.type,
        confidence: row.confidence,
      }));

      return {
        success: true,
        message: "Detection objects fetched",
        data: detectionArray,
      };
    } catch (error) {
      console.error("Error fetching detection objects:", error);
      return { success: false, message: "Error fetching detection objects", data: [] };
    }
  }, []);

  const updateDetectionObject = useCallback(async (detectionId: string, data: DetectionObject): Promise<HookResponse> => {
    try {
      const response = await tables.updateRow({
        databaseId: DB_ID,
        tableId: DETECTION_OBJECT_COLLECTION_ID,
        rowId: detectionId,
        data: {
          type: data.type,
          confidence: data.confidence,
        },
      });

      return { success: true, message: "Detection object updated", data: response };
    } catch (error) {
      console.error("Error updating detection object:", error);
      return { success: false, message: "Error updating detection object", data: null };
    }
  }, []);

  return { createDetectionObject, getDetectionObject, updateDetectionObject, getAllDetectionObjects };
};

export default useDetectionObject;
