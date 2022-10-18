const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Workout = new mongoose.Schema({
    workoutName: {type: String, required: true},
    workout: Schema.Types.Mixed,
    user: {type: Schema.Types.ObjectId, ref: "UserData"}
},
{collection: 'user-workouts'}
)

const model = mongoose.model('UserWorkout', Workout);

module.exports = model;