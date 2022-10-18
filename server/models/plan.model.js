const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Plan = new mongoose.Schema({
    planName: {type: String, required: true},
    plan: Schema.Types.Mixed,
    user: {type: Schema.Types.ObjectId, ref: "UserData"}
},
{collection: 'user-plans'}
)

const model = mongoose.model('UserPlans', Plan);

module.exports = model;