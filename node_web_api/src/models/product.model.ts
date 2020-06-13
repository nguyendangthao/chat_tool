import * as mongoose from 'mongoose';
import ProductInterface from '../interfaces/product.interface';

const ProductSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    description: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quality: { type: Number },
    price: { type: Number, required: true },
    discount: { type: Number },
    vote: { type: Number },
    size: [{ type: String }],
    color: [{ type: String }],
    image: { type: String },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: null }
}, { versionKey: false });

ProductSchema.set('collection', 'Product');

const productModel = mongoose.model<ProductInterface & mongoose.Document>('Product', ProductSchema);

export default productModel;