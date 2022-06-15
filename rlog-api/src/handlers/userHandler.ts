import { verifyUser } from "../middleware";
import { verifyGoogleToken } from '../middleware'
import { IUser, IUserAccountDetails } from "../services/userService";
import { Context, NotFoundError, ForbiddenError } from "@zopsmart/zode";

import {
  createUser,
  getAccountInvites,
  getLinkedAccountOfUsers,
  getUserByEmailId,

} from "../services/userService";

export const userLoginHandler = async (ctx: Context) => {
  const userToken = ctx.state.headers["x-authenticated-token"];
  const payLoad: any = await verifyGoogleToken(ctx, userToken);
  const userDetails: IUser = await getUserByEmailId(payLoad.email, ctx).catch(async (err) => {
    if (err instanceof NotFoundError) {
      const userData = await createUser(payLoad, ctx);
      return userData;
    }
    throw err;
  });
  const userAccountDetails: IUserAccountDetails = await getLinkedAccountOfUsers(userDetails.id, ctx);
  userDetails.userAccountDetails = userAccountDetails;
  return userDetails;
}
export const accountInvitesHandler = async (ctx: Context) => {
  await verifyUser(ctx);
  const userDetails = ctx.state.userDetails;
  const invitedUserDeatils = await getAccountInvites(userDetails.emailId, ctx);
  return invitedUserDeatils?.[0]
};
export const userDetailsHandler = async (ctx: Context) => {
  const userToken = ctx.state.headers["x-authenticated-token"];
  const payLoad: any = await verifyGoogleToken(ctx, userToken);
  const userDetails: IUser = await getUserByEmailId(payLoad.email, ctx).catch(async (err) => {
    if (err instanceof NotFoundError) {
      throw ForbiddenError
    }
    throw err;
  });
  return userDetails;
}

