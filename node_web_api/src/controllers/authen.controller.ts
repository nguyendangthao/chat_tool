import Controller from "interfaces/controller.interface";
import * as express from 'express';
import validationMiddleware from "../middlewares/validation.middleware";
import AuthenService from "../services/authen.service";
import { LogInVal } from "../validates/authen.validate";
import AuthenHelper from "../helper/authenHelper";

class AuthenController implements Controller {

    public router = express.Router();
    public path = '/auth';
    public autheService = new AuthenService();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + '/login', validationMiddleware(LogInVal), this.login)
            .post(this.path + '/logout', validationMiddleware(LogInVal), this.logout)
    }
    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        try {
            let acc = await this.autheService.login(request.body);
            if (acc) {
                let tokenData = (new AuthenHelper()).createToken(acc);
                response.send({ "token": tokenData.token, "account": acc });
            }
        }
        catch (err) {
            next(err);
        }

    }
    private logout = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let data = await this.autheService.logout(request.body);
        response.send({
            status: data,
        });
    }
}
export default AuthenController;