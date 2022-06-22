import IZode from "@zopsmart/zode";
import {
  accountInvitesHandler,
  userLoginHandler,
  userDetailsHandler,
} from "../handlers/userHandler";
export default async (app: IZode) => {
  app.get("/user", userDetailsHandler)
  app.post("/user/login", userLoginHandler);
  app.get("/user/invites", accountInvitesHandler);
};
