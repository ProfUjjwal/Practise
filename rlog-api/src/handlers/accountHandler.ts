import { Context, NotFoundError } from "@zopsmart/zode";
import { verifyUser } from "../middleware";
import {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
    IAccount,
    createNewAccountUser
} from '../services/accountservice'
export const createAccountHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const invitedBy = ctx.state.loggedInUserId;
    const accountId = await createAccount(ctx);
    await createNewAccountUser(ctx, invitedBy, accountId)
    return {
        id: accountId
    }
}
export const getAccountHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const foundAccount = await getAccount(ctx);
    if (!foundAccount[0]?.[0]) throw new NotFoundError
    else {
        return foundAccount[0]?.[0];
    }
}
export const deleteAccountHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const result = await deleteAccount(ctx);
    if (result[0]?.affectedRows > 0) {
        return {
            status: 200,
            message: "deleted succesfully"
        }
    }
    else {
        throw new NotFoundError
    }
}
export const updateAccountHandler = async (ctx: Context) => {
    await verifyUser(ctx);
    const response = await updateAccount(ctx);
    if (response[0]?.affectedRows > 0) {
        return {
            id: ctx.state.params?.id
        }
    } else throw new NotFoundError
}
