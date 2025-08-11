
const Product = require('../models/Product');
const multer = require("multer");
const Firm = require('../models/Firm');
const path = require("path"); 

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res)=>{
    try {
        const {productName, price, category, bestseller, description} = req.body;

        if (!productName || !price || !category) {
            return res.status(400).json({ message: "Product Name, Price, category are required to fill" });
        }

        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error : "No Firm Found"})
        }

        const product = new Product({
            productName, 
            price, 
            category, 
            bestseller, 
            description,
            firm : firm._id
        })

        const savedProduct = await product.save();

        firm.products.push(savedProduct);

        await firm.save();

        return res.status(200).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getProductByFirm = async(req, res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error: "No firm found"})
        }

        const restaurantName = firm.Name;
        const products = await Product.find({firm: firmId});
        res.status(200).json({ restaurantName,  products });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "No Product Found" });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct
        });       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { addProduct:[upload.single('image'),addProduct], getProductByFirm, deleteProductById};