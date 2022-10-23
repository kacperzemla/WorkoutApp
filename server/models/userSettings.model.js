const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSettings = new mongoose.Schema({
    weight: {type: String, required: true},
    goal: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "UserData"}
},
{
    collection: 'user-settings',
},
)

const model = mongoose.model('UserSettings', UserSettings);

module.exports = model;