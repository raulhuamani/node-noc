import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const LogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    //todo: Enviar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "yuri.huaman.a@gmail.com",
    //   "raul.huamani.hilario@gmail.com ",
    // ]);
    // emailService.sendEmailWithFileSystemLogs([
    //   "yuri.huaman.a@gmail.com",
    //   "raul.huamani.hilario@gmail.com ",
    // ]);

    const logs = await LogRepository.getLogs(LogSeverityLevel.high);
    console.log(logs);

    //  console.log(envs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://archlinux.org/";
    //   // const url = "http://localhost:3000";
    //   new CheckService(
    //     LogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });
  }
}
