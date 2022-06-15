import { Context } from "@zopsmart/zode";
import { verifyUser } from "../middleware";
import { insertIntoAccoutInvites, insertIntoAccountUsers, findUserInvitee, IAccountInvite, setInviteStatus, Status, isAccountBelongToUser, getUsersOfAccount } from "../services/accountUserService";

const sendInvitationHandler = async (ctx: Context): Promise<string> => {
    await verifyUser(ctx);
    const response = await insertIntoAccoutInvites(ctx);
    return response;
}
const acceptInvitationHandler = async (ctx: Context): Promise<string> => {
    await verifyUser(ctx);
    const invitedUserData: IAccountInvite = await findUserInvitee(ctx);
    const response = await insertIntoAccountUsers(ctx, invitedUserData.invitedBy);
    await setInviteStatus(ctx, Status.accepted);
    return response;
}
const declineInvitationHandler = async (ctx: Context): Promise<string> => {
    await verifyUser(ctx);
    const invitedUserData: IAccountInvite = await findUserInvitee(ctx);
    const response = await setInviteStatus(ctx, Status.rejected);
    return response;
}
const getUsersOfAccountHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const accountId = ctx.state.params?.accountId;
    const userId = ctx.state.loggedInUserId;
    await isAccountBelongToUser(ctx, accountId, userId);
    const usersOfAccount = getUsersOfAccount(ctx, accountId);
    return usersOfAccount;
}
export { sendInvitationHandler, acceptInvitationHandler, declineInvitationHandler, getUsersOfAccountHandler }
