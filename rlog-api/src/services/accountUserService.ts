import { Context, NotFoundError, BadRequestError, ForbiddenError } from "@zopsmart/zode"
export enum Status {
    pending = 'PENDING',
    rejected = 'REJECTED',
    accepted = 'ACCEPTED'
}
export interface IAccountInvite {
    emailId: string,
    accountId: string,
    invitedBy: string,
    invitationStatus: string,
    createdOn?: string,
    updatedOn?: string
}
export interface IAccountUser {
    userId: string,
    accountId: string,
    invitedBy: string,
    createdOn?: string,
    updatedOn?: string
}
export const insertIntoAccoutInvites = async (ctx: Context): Promise<string> => {
    const userId: string = ctx.state.loggedInUserId;
    const accountId: string = ctx.state.params?.accountId;
    const emails: string[] = ctx.state.body?.emails;
    if (!emails.length) throw new BadRequestError('No email Provided');
    emails.forEach(async (email: string) => {
        const accountInvitesData: IAccountInvite = {
            emailId: email,
            accountId: accountId,
            invitedBy: userId,
            invitationStatus: Status.pending,
        }
        const response = await ctx.database?.rawQuery(
            "INSERT INTO accountInvites (emailId,accountId,invitedBy,invitationStatus) VALUES (?,?,?,?)",
            [accountInvitesData.emailId, accountInvitesData.accountId, accountInvitesData.invitedBy, accountInvitesData.invitationStatus]
        );
    })
    return "OK";
}
export const insertIntoAccountUsers = async (ctx: Context, invitedBy: string): Promise<string> => {
    const userId: string = ctx.state.loggedInUserId;
    const accountId: string = ctx.state.params?.accountId;
    const inviteAcceptData: IAccountUser = {
        userId: userId,
        accountId: accountId,
        invitedBy: invitedBy,
    }
    const response = await ctx.database?.rawQuery(
        "INSERT INTO accountUsers (userId,accountId,invitedBy) VALUES (?,?,?)",
        [inviteAcceptData.userId, inviteAcceptData.accountId, inviteAcceptData.invitedBy]
    );
    return `OK`;
}
export const setInviteStatus = async (ctx: Context, status: string): Promise<string> => {
    const emailId = ctx.state.userDetails.emailId;
    const response = await ctx.database?.rawQuery(
        "UPDATE accountInvites SET invitationStatus = '" + status + "' , updatedOn = CURRENT_TIMESTAMP where emailId='" + emailId + "';"
    );
    return "OK";
}
export const findUserInvitee = async (ctx: Context): Promise<IAccountInvite> => {
    const emailId = ctx.state.userDetails.emailId;
    const accountId: string = ctx.state.params?.accountId;
    const result = await ctx.database?.rawQuery("SELECT * FROM accountInvites WHERE emailId='" + emailId + "' AND accountId='" + accountId + "'");
    if (!result[0]?.length) throw new NotFoundError();
    const invitedUserDetails: IAccountInvite = result[0]?.[0];
    return invitedUserDetails;
}
export const isAccountBelongToUser = async (ctx: Context, accountId: string, userId: string) => {
    const response = await ctx.database?.rawQuery("SELECT * FROM accountUsers where accountId='" + accountId + "' AND userId='" + userId + "'");
    if (!response[0].length) throw new ForbiddenError();
    return response[0];
}
export const getUsersOfAccount = async (ctx: Context, accountId: string) => {
    const response = await ctx.database?.rawQuery("select users.*,accounts.name as accountName from accountUsers JOIN accounts ON accountUsers.accountId = '" + accountId + "' AND accounts.id=accountUsers.accountId JOIN users ON accountUsers.userId=users.id;");
    if (!response[0].length) throw new NotFoundError();
    return response[0];
}