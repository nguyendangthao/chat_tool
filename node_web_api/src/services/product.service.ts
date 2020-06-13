import * as mongoose from 'mongoose';
import * as express from 'express';
import ProductModel from '../models/product.model';
import ProductInterface from 'interfaces/product.interface';


class ProductService {
    public product = ProductModel;

    public async create(req: ProductInterface) {
        let result = await this.product.create(
            {
                name: req.name,
                category_id: mongoose.Types.ObjectId(),
                price: req.price,
                color: req.color
            }
        );
        if (!result._id) {
            return false;
        }
        return true;
    }

    public async getAll() {
        return await this.product.find();
    }
}
export default ProductService;