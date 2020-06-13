import Controller from "interfaces/controller.interface";
import * as express from 'express';
import ProductService from '../services/product.service';
import validationMiddleware from "../middlewares/validation.middleware";
import { ProdcutCreateVal } from "../validates/product.validate";
import HttpException from "../exceptions/httpException";

class ProductController implements Controller {

    public router = express.Router();
    public path = '/product';
    public productService = new ProductService();
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get(this.path + '/getAll', this.getAll)
            .post(this.path + '/create', validationMiddleware(ProdcutCreateVal), this.create)
    }
    private getAll = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        let data = await this.productService.getAll();
        if (!data) {
            // next(new UserDataIsNotExist());
            return false;
        }
        response.send({
            size: data.length,
            status: true,
            data: data,
        });
    }
    private create = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let result = await this.productService.create(request.body);
        response.send({
            status: result,
        });
    }
}
export default ProductController;