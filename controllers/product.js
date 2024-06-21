const Product = require('../models/Product');


async function handleGetManFashion(req, res, next) {
    try {
        let products = await Product.find({ category: 'man' });
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
        
    } catch (err) {
        next(err);
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
        next(error)
    }
}

module.exports = {
    handleGetManFashion,
    handleUploadProduct
}