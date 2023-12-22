// import { envs } from "./config/plugins/envs.plugin";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}

// import { LogModel, MongoDatabase } from "./data/mongo";

// Crear una coleccion = tables, documento = registro
// const newLog = await LogModel.create({
//   message: "Test message desde mongo",
//   origin: "App.ts",
//   level: "low",
// });

// await newLog.save();
// console.log(newLog);

// const logs = await LogModel.find();
// console.log(logs);
