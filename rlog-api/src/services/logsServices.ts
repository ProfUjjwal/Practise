import { Context, NotFoundError } from "@zopsmart/zode"
export interface ILogdata {
    applicationId: string,
    accountId: string
    logLevel: number,
    source: string,
    message: string,
    createdOn?: string
}
export const saveLogs = async (ctx: Context, applicationId: any,accountId:string) => {
    const logs = ctx.state.body?.logs;
    for (let log of logs) {
        const logData: ILogdata = {
            source: log?.source,
            logLevel: log?.logLevel,
            message: log?.message,
            applicationId,
            accountId
        }
        ctx.database?.rawQuery("INSERT INTO logs (applicationId,accountId,logLevel,source,message) values ('" + logData.applicationId + "','" + logData.accountId + "','" + logData.logLevel + "','" + logData.source + "','" + logData.message + "');");
    }
}
export const getLogs = async (ctx: Context, accountId: string) => {
    if (!ctx.database?.getQueryBuilder) return "Query Builder not loaded";
    const queryBuilder = ctx.database?.getQueryBuilder()
    const { startDate, endDate, logLevel, source, page = 1, limit = 200, applicationId }: any = ctx.state.query;
    let dbQuery = {
        ...logLevel && { logLevel },
        ...source && { source },
        ...applicationId && { applicationId },
        accountId
    }
    const offset = (page - 1) * limit;
    let dbQueryBuilder = queryBuilder('logs').limit(limit).offset(offset).where(dbQuery);
    if (startDate && endDate) {
        dbQueryBuilder = dbQueryBuilder.whereBetween('createdOn', [startDate, endDate])
    } else if (startDate) {
        dbQueryBuilder = dbQueryBuilder.where('createdOn', '>', startDate)
    }
    const res = await dbQueryBuilder;
    return res
}
export const doesUserBelongToAccount = async (ctx: Context, accountId: string, userId: string) => {
    const response = await ctx.database?.rawQuery("SELECT * FROM accountUsers where accountId='" + accountId + "' AND userId='" + userId + "'");
    if (!response[0].length) throw new NotFoundError();
    return response[0];
}
export const getApplicationByApiKey = async (ctx: Context) => {
    const apiKey = ctx.state.headers?.['x-api-key'];
    const applicationDetails = await ctx.database?.rawQuery("SELECT * FROM applications where apiKey='" + apiKey + "'");
    return applicationDetails[0];
}
