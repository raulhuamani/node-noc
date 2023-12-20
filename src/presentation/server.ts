import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
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

    //  console.log(envs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://localhost:3000";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });
  }
}
