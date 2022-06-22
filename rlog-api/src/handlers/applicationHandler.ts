import { Context, NotFoundError } from "@zopsmart/zode";
import { createApplication, updateApplication, getAllApplications, deleteApplication, getApplicationById, } from "../services/applicationService";
import { verifyUser } from "../middleware"

export const createApplicationHandler = async (ctx: Context) => {
	await verifyUser(ctx);
	const application = await createApplication(ctx);
	return {
		id: application.id,
		apikey: application.apikey
	};
};
export const updateApplicationHandler = async (ctx: Context) => {
	await verifyUser(ctx);
	const updatedApplication = await updateApplication(ctx);
	if (updatedApplication[0]?.affectedRows > 0) {
		return {
			id: ctx.state.params?.applicationId
		}
	} else throw new NotFoundError
};
export const getAllApplicationsHandler = async (ctx: Context) => {
	await verifyUser(ctx);
	const allApplications = await getAllApplications(ctx);
	if (!allApplications?.[0]) throw new NotFoundError;
	else {
		return allApplications?.[0];
	}
};
export const getApplicationByIdHandler = async (ctx: Context) => {
	await verifyUser(ctx);
	const applicationById = await getApplicationById(ctx);
	if (!applicationById[0]?.[0]) throw new NotFoundError;
	else {
		return applicationById[0]?.[0];
	}
};
export const deleteApplicationHandler = async (ctx: Context) => {
	await verifyUser(ctx);
	const result = await deleteApplication(ctx);
	if (result[0]?.affectedRows > 0) {
		return {
			status: 200,
			messege: "deleted succesfully"
		}
	}
	else {
		throw new NotFoundError
	}
};
