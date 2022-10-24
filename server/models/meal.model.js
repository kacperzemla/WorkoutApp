const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Meal = new mongoose.Schema({
    mealName: {type: String, required: true},
    proteins: {type: Number, required: true},
    carbs: {type: Number, required: true},
    fats: {type: Number, required: true},
    time: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "UserData"}
},
{
    collection: 'user-meals',
    timestamps: true
},
)

const model = mongoose.model('UserMeal', Meal);

module.exports = model;