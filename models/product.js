import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { 
        type: String, 
        required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true
    },
    altNames: {
        type: [String],
        default: [],
        required: true
    },
    description: { 
        type: String, 
        required: true  
    },
    price: { 
        type: Number,
        required: true
    },
    labelledPrice: {
        type: Number,
        required: true
    },  
    image: {
        type: [String],
        default: ["/default-product-1.jpg", "/default-product-2.jpg"],
        required: true  
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    }
    
});

const Product = mongoose.model("Product", productSchema);

export default Product; 