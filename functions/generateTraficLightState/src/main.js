import { Client, Databases } from "node-appwrite";

// ==== 1️⃣ Inițializare Appwrite ====
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// ==== 2️⃣ Variabile environment ====
const DB_ID = process.env.DB_ID;
const COUNT_COLLECTION_ID = process.env.COUNT_COLLECTION_ID;
const TRAFFIC_LIGHT_COLLECTION_ID = process.env.TRAFFIC_LIGHT_COLLECTION_ID;

// ==== 3️⃣ Enum semafoare (simplificat) ====
const TraficLightColorState = {
  GREEN: "green",
  YELLOW: "yellow",
  RED: "red",
};

// ==== 4️⃣ Funcția principală ====
async function updateTrafficLights() {
  try {
    const ONE_MINUTE_AGO = new Date(Date.now() - 60_000).toISOString();

    // 4a. Preluăm count-urile din ultimele 60 sec
    const countDocs = await databases.listDocuments(DB_ID, COUNT_COLLECTION_ID, [
      { attribute: "timestamp", operator: ">=", value: ONE_MINUTE_AGO }
    ]);

    // 4b. Agregăm count-uri pe trafficLightId
    const trafficSums = {};

    countDocs.documents.forEach(c => {
      if (!trafficSums[c.trafficLightId]) {
        trafficSums[c.trafficLightId] = { cars: 0, pedestrians: 0 };
      }
      trafficSums[c.trafficLightId].cars += c.cars;
      trafficSums[c.trafficLightId].pedestrians += c.pedestrians;
    });

    // 4c. Decizie pentru fiecare semafor
    for (const trafficLightId in trafficSums) {
      const total = trafficSums[trafficLightId].cars + trafficSums[trafficLightId].pedestrians;

      const status = total > 0 ? TraficLightColorState.GREEN : TraficLightColorState.RED;

      await databases.updateDocument(
        DB_ID,
        TRAFFIC_LIGHT_COLLECTION_ID,
        trafficLightId,
        { trafficLightStatus: status }
      );

      console.log(`TrafficLight ${trafficLightId} set to ${status}`);
    }

  } catch (err) {
    console.error("Error updating traffic lights:", err);
  }
}

// ==== 5️⃣ Export pentru Appwrite Function ====
export default async function main() {
  await updateTrafficLights();
}
