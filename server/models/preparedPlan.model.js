const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const PreparedPlan = new mongoose.Schema({
    planName: {type: String, required: true},
    plan: Schema.Types.Mixed,
},
{collection: 'prepared-plans'}
)

const model = mongoose.model('PreparedPlans', PreparedPlan);

module.exports = model;