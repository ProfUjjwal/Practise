import IZode, { Context } from "@zopsmart/zode";
import { createLogHandler, getLogsHandler } from "../handlers/logsHandler";
export default (app: IZode) => {
    app.post("/logs", createLogHandler);
    app.get("/logs/:accountId", getLogsHandler);
}