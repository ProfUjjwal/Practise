import { BadRequestError, Context } from "@zopsmart/zode";
const { v4: uuidv4 } = require("uuid");
export interface IApplication {
	id: string;
	accountId: string;
	name: string;
	createdBy: string;
	apiKey: string;
	createdOn?: string;
	updatedOn?: string
}

export const createApplication = async (ctx: Context) => {
	const applicationName = ctx.state.body?.applicationName;
	if (!applicationName) throw new BadRequestError('Please Provide Name For The Application');
	const applicationObject: IApplication = {
		id: uuidv4(),
		accountId: ctx.state.params?.accountId,
		name: applicationName,
		createdBy: ctx.state.loggedInUserId,
		apiKey: uuidv4(),
	};
	await ctx.database?.rawQuery(
		"INSERT INTO applications (id,accountId,name,createdBy,apiKey) VALUES (?,?,?,?,?)", [applicationObject.id, applicationObject.accountId, applicationObject.name, applicationObject.createdBy, applicationObject.apiKey]);
	return {
		id: applicationObject.id,
		apiKey: applicationObject.apiKey
	};
};
export const updateApplication = async (ctx: Context) => {
	const applicationId = ctx.state.params?.applicationId;
	const applicationName = ctx.state.body?.applicationName;
	if (!applicationName) throw new BadRequestError('Please Provide Name To Update Application');
	const response = await ctx.database?.rawQuery("UPDATE applications SET name='" + applicationName + "',updatedOn=CURRENT_TIMESTAMP WHERE id='" + applicationId + "'",);
	return response;
};
export const getAllApplications = async (ctx: Context) => {
	const accountId = ctx.state.params?.accountId;
	const result = await ctx.database?.rawQuery("SELECT applications.*,users.name AS createdByName FROM applications JOIN users where applications.accountId='"+accountId+"'and applications.createdBy=users.id");
	return result;
};
export const getApplicationById = async (ctx: Context) => {
	const applicationId = ctx.state.params?.applicationId;
	const result = await ctx.database?.rawQuery("SELECT * FROM applications where id='" + applicationId + "'");
	return result;
};
export const deleteApplication = async (ctx: Context) => {
	const applicationId = ctx.state.params?.applicationId;
	const response = await ctx.database?.rawQuery("DELETE FROM applications WHERE id='" + applicationId + "'",);
	return response;
};
