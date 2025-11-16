import { auth, DB_ID, tables, USERS_COLLECTION_ID } from "@/app/appwrite";
import { HookResponse, User } from "@/app/models/types";
import { useCallback } from "react";
import { toUser } from "../helpers/dbHelpers";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

const useUser = () => {
  const dispatch = useAppDispatch();

  const createUser = useCallback(async (newUser: User): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      const response = await tables.createRow({
        databaseId: DB_ID,
        tableId: USERS_COLLECTION_ID,
        rowId: currentUser.$id,
        data: newUser,
      });

      return {
        success: true,
        message: "Success!",
        data: response,
      };
    } catch (error) {
      console.log("Error creating the user: ", error);
      return {
        success: false,
        message: "",
        data: null,
      };
    }
  }, []);

  const getUserData = useCallback(async (): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      const response = await tables.getRow({ databaseId: DB_ID, tableId: USERS_COLLECTION_ID, rowId: currentUser.$id });

      const user = toUser(response);

      dispatch(setUser(user));

      return {
        success: true,
        message: "Success",
        data: user,
      };
    } catch (error) {
      console.log("Error getting user Data: ", error);
      return {
        success: false,
        message: "Erorr getting user data.",
        data: null,
      };
    }
  }, [dispatch]);

  const updateUserData = useCallback(
    async (updatedUserPart: Partial<User>): Promise<HookResponse> => {
      try {
        const currentUser = await auth.get();

        const response = await tables.updateRow({
          databaseId: DB_ID,
          tableId: USERS_COLLECTION_ID,
          rowId: currentUser.$id,
        });

        await getUserData();

        return {
          success: true,
          message: "Success!",
          data: response,
        };
      } catch (error) {
        console.log("Error updateing user Data: ", error);
        return {
          success: false,
          message: "Error",
          data: null,
        };
      }
    },
    [dispatch, getUserData]
  );

  return {
    createUser,
    getUserData,
    updateUserData,
  };
};

export default useUser;
