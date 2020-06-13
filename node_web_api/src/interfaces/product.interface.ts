interface ProductInterface {
    _id: string;
    name: string;
    description: string;
    category_id: string;
    quality: number;
    price: number;
    discount: number;
    vote: number;
    size: string[];
    color: string[];
    created_at: Date;
    updated_at: Date;
}

export default ProductInterface;
