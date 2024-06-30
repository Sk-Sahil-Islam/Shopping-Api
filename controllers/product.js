const Product = require('../models/Product');


async function handleGetFashion(req, res, next) {
    try {
        let products = await Product.find({ category: req.params.category });
        if(!products) {
            return res.status(400).json({
                success: false,
                msg: "Some error occured"
            });
        }
        res.status(200).json({
            success: true,
            count: products.length,
            products: products
        });
        
    } catch (error) {
        next(error);
    }
}

async function handleGetMyProducts(req, res, next) {
    try {
        let products = await Product.find({ user: req.user.id });
        if(!products) {
            res.status(400).json({
                success: false,
                msg: "Some error occured"
            });
        }
        res.status(200).json({
            success: true,
            count: products.length,
            products: products
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

async function handleUploadProduct(req, res, next) {
    try {
        const product = await Product.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            mrp: req.body.mrp,
            currentPrice: req.body.currnetPrice,
            images: req.body.images,
            brand: req.body.brand,
            soldBy: req.user.userName,
            size: req.body.size,
            fabric: req.body.fabric,
            stock: req.body.stock,
            rating: req.body.rating
        });
        if(!product) {
            res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }

        res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        next(error);
    }
}

async function handleEditProduct(req, res, next) {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                msg: "Product doesn't exist"
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product: product // no need to return you can just give a "Product updated successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

async function handleDeleteProduct(req, res, next) {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                msg: "Product doesn't exist"
            });
        }

        product = await Product.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            msg: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}



module.exports = {
    handleGetFashion,
    handleGetMyProducts,
    handleUploadProduct,
    handleEditProduct,
    handleDeleteProduct
}