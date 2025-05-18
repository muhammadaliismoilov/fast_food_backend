import { createLogger, format, transports, Logger } from "winston";
const logger: Logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(), 
        format.simple() 
    ),
    transports: [
        new transports.Console(), 
        new transports.File({ filename: "logs/server.log" }) 
    ],
});
export default logger;