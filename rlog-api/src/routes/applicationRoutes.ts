import { IZode } from "@zopsmart/zode";
import { createApplicationHandler, updateApplicationHandler, getAllApplicationsHandler, deleteApplicationHandler, getApplicationByIdHandler, } from "../handlers/applicationHandler";
const addApplicationRoutes = (app: IZode) => {
	app.post("/account/:accountId/application", createApplicationHandler);
	app.put("/account/:accountId/application/:applicationId", updateApplicationHandler);
	app.get("/account/:accountId/application", getAllApplicationsHandler);
	app.get("/account/:accountId/application/:applicationId", getApplicationByIdHandler);
	app.delete("/account/:accountId/application/:applicationId", deleteApplicationHandler);
};

export { addApplicationRoutes }
