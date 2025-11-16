import { auth, DB_ID, id, tables, USERS_COLLECTION_ID } from "@/app/appwrite";
import { useCallback } from "react";
import { HookResponse } from "../models/types";
import { useAppDispatch } from "../store/hooks";
import { setAuthState } from "../store/slices/authSlice";
import useUser from "./useUser";

const useAuth = () => {
  const { getUserData } = useUser();
  const dispatch = useAppDispatch();

  const signUserUp = useCallback(async (email: string, password: string): Promise<HookResponse> => {
    try {
      const response = await auth.create({
        userId: id.unique(),
        email,
        password,
      });

      return {
        success: true,
        message: "User signed up successfully",
        data: response,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log("Failed to sign up", error);
      return { success: false, message, data: null };
    }
  }, []);

  const signUserOut = useCallback(async (): Promise<HookResponse> => {
    try {
      await auth.deleteSession({ sessionId: "current" });
      dispatch(setAuthState(false));

      return { success: true, message: "User signed out successfully", data: null };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log("Failed to sign user out: ", error);

      return { success: false, message, data: null };
    }
  }, [dispatch]);

  const signUserIn = useCallback(
    async (email: string, password: string): Promise<HookResponse> => {
      try {
        const response = await auth.createEmailPasswordSession({ email, password });

        dispatch(setAuthState(true));
        return { success: true, message: "User signed in successfully", data: response };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.log("Failed to sign in: ", error);

        await signUserOut();
        return { success: false, message, data: null };
      }
    },
    [dispatch, signUserOut]
  );

  const deleteUser = useCallback(async (): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      await tables.deleteRow({
        databaseId: DB_ID,
        tableId: USERS_COLLECTION_ID,
        rowId: currentUser.$id,
      });

      await signUserOut();

      return { success: true, message: "Success", data: null };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log("Error deleting account", error);

      return { success: false, message, data: null };
    }
  }, [dispatch, signUserOut]);

  const checkUserPresence = useCallback(async (): Promise<HookResponse> => {
    try {
      const response = await auth.get();

      await getUserData();
      dispatch(setAuthState(true));

      return { success: true, message: "User is signed in", data: response.$id };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.log("Failed to check user presence: ", error);

      return { success: false, message, data: null };
    }
  }, [dispatch, getUserData]);

  return { signUserIn, signUserOut, signUserUp, deleteUser, checkUserPresence };
};

export default useAuth;
