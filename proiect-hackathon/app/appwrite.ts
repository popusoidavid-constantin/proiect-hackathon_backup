import { Account, Client, Databases, Functions, ID, Query, Storage, TablesDB } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69199ba500361fa2447d")
  .setDevKey(
    "577994281625c77198a9623367419ef542ca19327f6f6c8ab572bcb9f93d6e55c8fb8cfcd990576bd49894eab49271fdcecf0979f0755833cc11a6cba66180ff06cf96ff4bf197631af45467864f9498de30ef806a90f8b149b07ec8718019f961d642547d9adb597685ab357b686ebeee2e18885bca4a60d7078d98d9f9e5b2"
  );

export const account = new Account(client);
export { ID } from "appwrite";

export const auth = new Account(client);
export const databases = new Databases(client);
export const tables = new TablesDB(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const id = ID;
export const query = Query;

export const VERIFY_INSTITIUTIONS_EMAIL_FUNCTION_ID = "691842da0037bbede318";

export const DB_ID = "69199bc800297ca0a705";

export const USERS_COLLECTION_ID = "6919968b003a8b4e0e18";
export const CAMERA_COLLECTION_ID = "69199cbb002eda11b766";
export const CITY_COLLECTION_ID = "69199bdc0032e9d1c9b5";
export const COUNT_COLLECTION_ID = "69199dba0011c8c6bb58";
export const DETECTION_COLLECTION_ID = "69199d1c0012cb8644e0";
export const DETECTION_OBJECT_COLLECTION_ID = "69199d81003d81bf6e8c";
export const INTERSECTION_COLLECTION_ID = "69199c1d0015d8ca3fff";
export const LOCATIONS_COLLECTION_ID = "69199cf4002ed9e5d651";
export const TRAFFIC_LIGHTS_COLLECTION_ID = "69199c4300360f8ec01e";
export const TRAFFIC_STATS_COLLECTION_ID = "69199e1b000daa1e7522";
