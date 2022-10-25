const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/user.model');
const Plan = require('./models/plan.model');
const Workout = require('./models/workout.model');
const UserSettings = require(`./models/userSettings.model`);
const Meal = require(`./models/meal.model`);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/workout-db");

app.get("/", async (req, res) => {
  res.send("Hello world")
})

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err)
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if(!user){
    return {status: 'error', error: 'Invalid login'};
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if (isPasswordValid) {

    const token = jwt.sign({
      username: user.username,
    }, 'secret123')

    return res.json({ status: "ok", user: token, userID: user._id });
  } else {
    return res.json({ status: "error", user: false });
  }

});

app.post("/api/createPlan", async (req, res) => {
  const  userID  = req.body.userID;

  let existingUser = await User.findById(userID);

  const plan = new Plan({
    planName: req.body.planJson.planName,
    plan: req.body.planJson.plan,
    user: existingUser,
  })

  plan.save((err) => {
    if(err){
      console.log(err)
    }
  });

  return res.json({ status: "ok"})

})

app.get("/api/getAllPlans/:id", async (req, res)=> {
  const userID = req.params.id;


  let plans = await Plan.find({user: userID}).exec();

    if(!plans){
      return res.status(404).json({message: "No plan found"});
    }

    return res.status(200).json({plans: plans})

});

app.get("/api/plan/:id", async (req, res) => {
  const planID = req.params.id;

  let plan = await Plan.findById(planID);

  if(!plan){
    return res.status(404).json({message: "No plan found"});
  }

  return res.status(200).json({plan: plan})
})

app.post("/api/saveWorkout", async (req,res) => {
  const userID = req.body.userID;

  let existingUser = await User.findById(userID);

  const workout = new Workout({
    workoutName: req.body.workoutJson.workoutName,
    workout: req.body.workoutJson.workout,
    user: existingUser,
  })

  workout.save((err) => {
    if(err){
      return console.log(err);
    }
  });

  return res.json({ status: "ok"})
})



app.get("/api/getAllWorkouts/:id", async (req, res ) => {
  const userID = req.params.id;

  let workouts = await Workout.find({user: userID}).sort({createdAt: 'desc'}).exec();

  if(!workouts){
    return res.status(404).json({message: "No workouts found"})
  }

  return res.status(200).json({workouts: workouts})
})

app.get("/api/workout/:id", async (req, res) => {
  const workoutID = req.params.id;

  let workout = await Workout.findById(workoutID);

  if(!workout){
    return res.status(404).json({message: "No plan found"});
  }

  return res.status(200).json({workout: workout})
})

app.delete("/api/deletePlan/:id", async (req, res) => {
  const workoutID = req.params.id;

  const workout = await Plan.findOneAndDelete({_id: workoutID});

  if(!workout) {
    return res.status(400).json({error: 'No such plan'})
  }

  res.status(200).json(workout);
})

app.post("/api/saveSettings/:id", async (req, res) => {
  const userID = req.body.userID;
  const weight = req.body.weight;
  const goal = req.body.goal;

  const user = await User.findById(userID);

  const respons = await UserSettings.updateOne(
    { user: user},
    { $set: {weight: weight.toString(), goal: goal}},
    {upsert: true}
    );

  if(respons){
    return res.status(200).json({message: 'working'})
  }

  return res.status(400).json({error: 'Something went wrong'})
})

app.get("/api/userSettings/:id", async (req, res) => {
  const userID = req.params.id;

  const userSettings = await UserSettings.findOne({user: userID});


  if(!userSettings){
    return res.status(404).json({error: "no user settings found"});
  }

  return res.status(200).json({userSettings: userSettings});
})

app.post("/api/createMeal", async (req, res) => {
  const userID = req.body.userID;

  const user = await User.findById(userID);

  const meal = new Meal({
    mealName: req.body.mealName,
    proteins: req.body.proteins,
    carbs: req.body.carbs,
    fats: req.body.fats,
    time: req.body.time,
    user: user,
  })

  meal.save((err) => {
    if(err){
      return console.log(err);
    }
  });

  return res.json({ status: "ok"})
})

app.get("/api/meals/:id", async (req, res) => {
  const userID = req.params.id;

  const user = await User.findById(userID);

  const meals = await Meal.find({user: user});

  if(!meals){
    res.status(404).json({message: "Couldnt find any meals"});
  }

  res.status(200).json({meals: meals});
})





app.listen(1337, () => {
  console.timeLog("Started server");
});
