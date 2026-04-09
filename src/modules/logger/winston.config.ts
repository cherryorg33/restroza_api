import * as winston from "winston";
import chalk from "chalk";

export const winstonConfig = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      let coloredMessage = "";

      if (level === "error") {
        coloredMessage = chalk.red(message);
      } else if (level === "warn") {
        coloredMessage = chalk.yellow(message);
      } else {
        coloredMessage = chalk.green(message);
      }

      return `[${timestamp}] ${level.toUpperCase()}: ${coloredMessage}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
