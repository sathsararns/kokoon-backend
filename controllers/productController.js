import Product from "../models/product.js";
import productRouter from "../routers/productRouter.js";

//create product

export async function createProduct(req, res) {

    if(req.user ==null){
        res.status(401).json({message: "Unauthorized"})
        return
    }

    if(!req.user.isAdmin){
        res.status(403).json({message: "Only admin can create products"})
        return
    }

    try {
        
        const existingProduct = await Product.findOne({name: req.body.name})

        if(existingProduct != null){
            res.status(400).json({message: "Product with the same name already exists"})
            return
        }
        const product = new Product(req.body)

        await product.save()

        res.json({message: "Product created successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

//get all products
export async function getAllProducts(req, res) {
    try {
        if(req.user != null && req.user.isAdmin){
            const products = await Product.find()
            res.json(products)
        }else{
            const products = await Product.find({isAvailable: true})
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//delete product
export async function deleteProduct(req, res) {
    if(req.user != null && req.user.isAdmin){
        try {
            const product = await Product.findOne({productId: req.params.productId})
            if(product == null){
                res.status(404).json({message: "Product not found"})
                return

            }

            await Product.deleteOne({productId: req.params.productId})
            res.json({message: "Product deleted successfully"})

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }else{
        res.status(403).json({message: "Only admin can delete products"})
        return
    }
}


//update product

export async function updateProduct(req, res) {
    if(req.user != null && req.user.isAdmin){
        try {
            
            if(req.body.productId != null ){
                res.status(400).json({message: "Product ID cannot be updated"})
                return
            }

            await Product.updateOne({productId: req.params.productId}, req.body)
            res.json({message: "Product updated successfully"})    

        } catch (error) {
            res.status(500).json({message: error.message})
        }       

    }else{
        res.status(403).json({message: "Only admin can update products"})
        return
    }       
}       

export async function getProductById(req, res) {
    try {
        const product = await Product.findOne({productId: req.params.productId})
        if(product == null){
            res.status(404).json({message: "Product not found"})
            return
        }
        
        if(product.isAvailable ){
            res.json(product)
        }else{
            if(req.user != null && req.user.isAdmin){
                res.json(product)
            }else{
                res.status(403).json({message: "Only admin can view unavailable products"})
                return
            }
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
}