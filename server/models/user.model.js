const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const User = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    plans: [{type: Schema.Types.ObjectId, ref: "UserPlans"}]
},
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', User);

module.exports = model;