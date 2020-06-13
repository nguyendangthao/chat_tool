require('dotenv').config();
import App from './app';
import validateEnv from './utils/validateEnv';
import ProductController from './controllers/product.controller';
import AccountController from './controllers/account.controller';
import AuthenController from './controllers/authen.controller';
import RoleController from './controllers/role.controller';

validateEnv();
const app = new App(
  [
    new ProductController(),
    new AccountController(),
    new AuthenController(),
    new RoleController()
  ],
);
app.listen();
