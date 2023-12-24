// import { envs } from "./config/plugins/envs.plugin";
import { Prisma, PrismaClient } from "@prisma/client";
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

  const prisma = new PrismaClient();

  Server.start();
}

// Probar Mongo
// import { LogModel, MongoDatabase } from "./data/mongo";

// Crear una coleccion = tables, documento = registro
// const newLog = await LogModel.create({
//   message: "Test message desde mongo",
//   origin: "App.ts",
//   level: "low",
// });

// await newLog.save();
// console.log(newLog);

// Consultar:
// const logs = await LogModel.find();
// console.log(logs);

// Probar Postgres

// const newLog = await prisma.logModel.create({
//   data: {
//     level: "HIGH",
//     message: "Test message",
//     origin: "App.ts",
//   },
// });
// console.log(newLog);

// Consultar:
// const logs = await prisma.logModel.findMany({
//   where: {
//     level: "MEDIUM",
//   },
// });
// console.log(logs);
