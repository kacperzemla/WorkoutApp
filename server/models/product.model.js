const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Product = new mongoose.Schema({
    productName: {type: String, required: true},
    proteins: {type: Number, required: true},
    carbs: {type: Number, required: true},
    fats: {type: Number, required: true},
    kcal: {type: Number, required: true}
},
{
    collection: 'product'
},
)

const model = mongoose.model('Product', Product);

module.exports = model;