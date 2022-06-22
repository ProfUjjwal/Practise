import Zode from '@zopsmart/zode'
import { accountRoutes } from './routes/accountroutes';
import addUserRoutes from './routes/userRoutes'
import addAccountUser from './routes/accountUserRouter'
import { addApplicationRoutes } from './routes/applicationRoutes';
import addLogRoutes from './routes/logsRouter'
const app = new Zode();
addAccountUser(app);
addUserRoutes(app);
accountRoutes(app);
addApplicationRoutes(app);
addLogRoutes(app)
export default app.start();
