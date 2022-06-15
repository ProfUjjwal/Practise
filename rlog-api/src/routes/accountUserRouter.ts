import IZode from "@zopsmart/zode";
import { sendInvitationHandler, acceptInvitationHandler, declineInvitationHandler, getUsersOfAccountHandler } from "../handlers/accountUserHandler";

export default (app: IZode) => {
  app.post("/account/:accountId/invite", sendInvitationHandler);
  app.post("/account/:accountId/accept", acceptInvitationHandler);
  app.put("/account/:accountId/decline", declineInvitationHandler);
  app.get('/account/:accountId/users', getUsersOfAccountHandler);
}
