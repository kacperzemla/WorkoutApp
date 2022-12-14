const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Plan = require("./models/plan.model");
const Workout = require("./models/workout.model");
const UserSettings = require(`./models/userSettings.model`);
const Meal = require(`./models/meal.model`);
const PreparedPlan = require("./models/preparedPlan.model");
const Product = require("./models/product.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/workout-db");

app.get("/", async (req, res) => {
  res.send("Hello world");
});

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
    console.log(err);
    res.status(200).json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token, userID: user._id });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/createPlan",verifyToken, async (req, res) => {
  const userID = req.body.userID;

  let existingUser = await User.findById(userID);

  const plan = new Plan({
    planName: req.body.planJson.planName,
    plan: req.body.planJson.plan,
    user: existingUser,
  });

  plan.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.status(200).json({ status: "ok" });
});

app.get("/api/getAllPlans/:id", async (req, res) => {
  const userID = req.params.id;

  let plans = await Plan.find({ user: userID }).exec();

  if (!plans) {
    return res.status(404).json({ message: "No plan found" });
  }

  return res.status(200).json({ plans: plans });
});

app.get("/api/plan/:id", async (req, res) => {
  const planID = req.params.id;

  let plan = await Plan.findById(planID);

  if (!plan) {
    return res.status(404).json({ message: "No plan found" });
  }

  return res.status(200).json({ plan: plan });
});

app.post("/api/saveWorkout",verifyToken, async (req, res) => {
  const userID = req.body.userID;

  let existingUser = await User.findById(userID);

  const workout = new Workout({
    workoutName: req.body.workoutJson.workoutName,
    workout: req.body.workoutJson.workout,
    user: existingUser,
  });

  workout.save((err) => {
    if (err) {
      return console.log(err);
    }
  });

  return res.json({ status: "ok" });
});

app.get("/api/getAllWorkouts/:id", async (req, res) => {
  const userID = req.params.id;

  let workouts = await Workout.find({ user: userID })
    .sort({ createdAt: "desc" })
    .exec();

  if (!workouts) {
    return res.status(404).json({ message: "No workouts found" });
  }

  return res.status(200).json({ workouts: workouts });
});

app.get("/api/workout/:id", async (req, res) => {
  const workoutID = req.params.id;

  let workout = await Workout.findById(workoutID);

  if (!workout) {
    return res.status(404).json({ message: "No plan found" });
  }

  return res.status(200).json({ workout: workout });
});

app.delete("/api/deletePlan/:id", async (req, res) => {
  const workoutID = req.params.id;

  const workout = await Plan.findOneAndDelete({ _id: workoutID });

  if (!workout) {
    return res.status(400).json({ error: "No such plan" });
  }

  res.status(200).json(workout);
});

app.post("/api/saveSettings/:id", async (req, res) => {
  const userID = req.body.userID;
  const weight = req.body.weight;
  const goal = req.body.goal;

  const user = await User.findById(userID);

  const respons = await UserSettings.updateOne(
    { user: user },
    { $set: { weight: weight.toString(), goal: goal } },
    { upsert: true }
  );

  if (respons) {
    return res.status(200).json({ message: "working" });
  }

  return res.status(400).json({ error: "Something went wrong" });
});

app.get("/api/userSettings/:id",verifyToken, async (req, res) => {
  const userID = req.params.id;

  const userSettings = await UserSettings.findOne({ user: userID });

  if (!userSettings) {
    return res.status(404).json({ error: "no user settings found" });
  }

  return res.status(200).json({ userSettings: userSettings });
});

app.post("/api/createMeal", verifyToken, async (req, res) => {
  const userID = req.body.userID;

  const user = await User.findById(userID);

  const meal = new Meal({
    mealName: req.body.mealName,
    proteins: req.body.proteins,
    carbs: req.body.carbs,
    fats: req.body.fats,
    time: req.body.time,
    user: user,
  });

  meal.save((err) => {
    if (err) {
      return console.log(err);
    }
  });

  return res.json({ status: "ok" });
});

app.get("/api/meals/:id", async (req, res) => {
  const userID = req.params.id;
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const user = await User.findById(userID);

  const meals = await Meal.find({
    user: user,
    createdAt: { $gte: startOfDay, $lt: endOfDay },
  });

  if (!meals) {
    res.status(404).json({ message: "Couldnt find any meals" });
  }

  res.status(200).json({ meals: meals });
});

app.get("/api/preparedPlans", async (req, res) => {
  const plans = await PreparedPlan.find();

  if (!plans) {
    res.status(404).json({ message: "Couldnt find any prepared plans" });
  }

  res.status(200).json({ preparedPlans: plans });
});

app.get("/api/preparedPlan/:id", async (req, res) => {
  const planID = req.params.id;

  let plan = await PreparedPlan.findById(planID);

  if (!plan) {
    return res.status(404).json({ message: "No plan found" });
  }

  return res.status(200).json({ plan: plan });
});

app.get("/api/products", async (req, res) => {
  let products = await Product.find();

  if (!products) {
    res.status(404).json({ message: "Couldnt find any prodcut" });
  }

  return res.status(200).json({ products: products });
});

app.get("/api/product/:id", async (req, res) => {
  const productID = req.params.id;

  let product = await Product.findById(productID);

  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }

  return res.status(200).json({ product: product });
});

app.listen(1337, () => {
  console.timeLog("Started server");
});

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  console.log(token)

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = User.findOne({ email: email });
    if (user) {
      next();
    }
  } catch (error) {
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
}
