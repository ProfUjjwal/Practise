import IZode from "@zopsmart/zode";
import { createAccountHandler, deleteAccountHandler, updateAccountHandler, getAccountHandler } from '../handlers/accountHandler'
export const accountRoutes = (app: IZode) => {
    app.post('/account', createAccountHandler);
    app.get('/account/:id', getAccountHandler);
    app.put('/account/:id', updateAccountHandler);
    app.delete('/account/:id', deleteAccountHandler);
}
