import { v4 as uuidv4 } from "uuid";
import { BadRequestError, Context } from "@zopsmart/zode";
import { IAccountUser } from "./accountUserService";
export interface IAccount {
    id: string;
    name: string;
    createdBy: string;
    createdOn?: string;
    updatedOn?: string
}
export const createAccount = async (ctx: Context) => {
    const name: string = ctx.state.body?.name;
    const userId = ctx.state.loggedInUserId;
    if (!name) throw new BadRequestError("Please provide name for account");
    const accountObject: IAccount = {
        id: uuidv4(),
        name: name,
        createdBy: userId
    }
    await ctx.database?.rawQuery(
        "INSERT INTO accounts (id,name,createdBy) VALUES ('" + accountObject.id + "', '" + accountObject.name + "','" + accountObject.createdBy + "');"
    );
    return accountObject.id
}
export const getAccount = async (ctx: Context) => {
    const id: string = ctx.state.params?.id;
    const result = await ctx.database?.rawQuery(
        "SELECT * FROM accounts where id='" + id + "'"
    )
    return result;
}
export const deleteAccount = async (ctx: Context) => {
    const id: string = ctx.state.params?.id
    const response = await ctx.database?.rawQuery(
        "DELETE FROM accounts WHERE id='" + id + "'"
    );
    return response;
}
export const updateAccount = async (ctx: Context) => {
    const id: string = ctx.state.params?.id;
    const name: string = ctx.state.body?.name;
    if (!name) throw new BadRequestError("Please provide name for account");
    const response = await ctx.database?.rawQuery(
        "UPDATE accounts SET name='" + name + "',updatedOn= CURRENT_TIMESTAMP WHERE id='" + id + "'"
    )
    return response;
}
export const createNewAccountUser = async (ctx: Context, invitedBy: string, accountId: string) => {
    const inviteAcceptData: IAccountUser = {
        userId: ctx.state.loggedInUserId,
        accountId: accountId,
        invitedBy: invitedBy,
    }
    await ctx.database?.rawQuery(
        "INSERT INTO accountUsers (userId,accountId,invitedBy) VALUES (?,?,?)",
        [inviteAcceptData.userId, inviteAcceptData.accountId, inviteAcceptData.invitedBy]
    );
}