import { BadRequestError, Context } from "@zopsmart/zode";
import { verifyUser } from "../middleware";
import { saveLogs, getLogs, getApplicationByApikey, doesUserBelongToAccount } from "../services/logsServices";
const createLogHandler = async (ctx: Context) => {
    const applicationDetails = await getApplicationByApikey(ctx)
    if (!applicationDetails[0]) return new BadRequestError('No matching Apikey')
    const applicationId = applicationDetails[0].id;
    const accountId = applicationDetails[0].accountId;
    saveLogs(ctx, applicationId,accountId);
    return 'OK';
}
const getLogsHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const accountId = ctx.state.params?.accountId;
    const userId = ctx.state?.loggedInUserId;
    await doesUserBelongToAccount(ctx, accountId, userId);
    const result = await getLogs(ctx, accountId);
    return result;
}
export { createLogHandler, getLogsHandler }
