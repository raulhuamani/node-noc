import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    //todo: Enviar email
    // new SendEmailLogs(emailService, fsLogRepository).execute([
    //   "yhua@gmail.com",
    //   "rhua@gmail.com ",
    // ]);
    // emailService.sendEmailWithFileSystemLogs([
    //   "yhua@gmail.com",
    //   "rhua@gmail.com ",
    // ]);

    // Se comento clase 161
    // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    //  console.log(envs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://archlinux.org/";
      // const url = "http://localhost:3000";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
