
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category: [{
        type: String,
        enum: ['veg', 'non-veg']
    }], //if error - maybe it is here
    image:{
        type: String
    },
    bestseller:{
        type: String
    },
    description:{
        type: String
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product