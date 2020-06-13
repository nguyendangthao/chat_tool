import Controller from "interfaces/controller.interface";
import * as express from 'express';
import RoleService from "../services/role.service";
import authMiddleware from "../middlewares/auth.middleware";
import * as mongoose from 'mongoose';


class RoleController implements Controller {

    public router = express.Router();
    public path = '/role';
    public roleService = new RoleService();
    public objectId = mongoose.Types.ObjectId;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .post(this.path + '/create', authMiddleware, this.create)
            .post(this.path + '/update', authMiddleware, this.update)
    }

    private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.roleService.create(request.body);
            response.send({
                status: result,
            });
        } catch (error) {
            next(error);
        }

    }
    private update = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            let result = await this.roleService.update(request.body);
            response.send({
                status: result,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default RoleController;