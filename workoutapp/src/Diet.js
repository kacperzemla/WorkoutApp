import { useEffect, useState } from "react";
import Title from "./Reusable/Title";
import "./Styles/functional.css";
import Progressbar from "react-js-progressbar";
import Button from "./Reusable/Button";
import Input from "./Reusable/Input";
import { useNavigate, Link } from "react-router-dom";
import * as FoodApi from "./EdamamApi";
import { useContext } from "react";
import MealContext from "./Contexts/MealContext";
import EdamamLogo from "./Edamam_Badge_Transparent.svg";

export default function Diet() {
  const { setMeal, setTime, time } = useContext(MealContext);
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [radio, setRadio] = useState("");
  const [active, setActive] = useState(false);
  const [mealName, setMealName] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [meals, setMeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [apiMeals, setApiMeals] = useState([]);
  const [consumed, setConsumed] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const res = await fetch(
        `http://localhost:1337/api/userSettings/${userID}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setWeight(data.userSettings.weight);
      setRadio(data.userSettings.goal);
    };

    const fetchMeals = async () => {
      const res = await fetch(`http://localhost:1337/api/meals/${userID}`, {
        method: "GET",
      });
      const data = await res.json();
      setMeals(data.meals);
    };

    const fetchProducts = async () => {
      const res = await fetch("http://localhost:1337/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
    fetchUserSettings();
    fetchMeals();
  }, []);

  useEffect(() => {
    calculateIntake();
  }, [weight, radio]);

  useEffect(() => {
    setConsumed(calculateConsumedCalories(meals));
  }, [meals]);

  function calculateIntake() {
    if (weight) {
      switch (radio) {
        case "normal":
          setCalories(weight * 33);
          break;
        case "mass":
          setCalories(weight * 33 + 300);
          break;
        case "reduction":
          setCalories(weight * 33 - 300);
      }
    }
  }

  function calculateConsumedMealCalories(meal) {
    let kcal = meal.proteins * 4 + meal.carbs * 4 + meal.fats * 9;
    return Math.round(kcal);
  }

  function calculateConsumedCalories(meals) {
    const kcal = meals
      .map((meal) => calculateConsumedMealCalories(meal))
      .reduce((a, b) => a + b, 0);
    return kcal;
  }



  function addMeal(meal) {
    setMeal(meal);
    navigate(`/addMeal`);
  }

  const searchForMeal = async () => {
    const res = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${FoodApi.APP_ID}&app_key=${FoodApi.APP_KEY}&ingr=${mealName}&nutrition-type=cooking`,
      {
        method: "GET",
      }
    );
    const data = await res.json();

    setApiMeals(data.hints);
  };

  // async function addMeal(event) {
  //   event.preventDefault();
  //   const req = await fetch("http://localhost:1337/api/createMeal", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userID,
  //       mealName,
  //       proteins,
  //       carbs,
  //       fats,
  //       time,
  //     }),
  //   });

  //   const data = req.json();
  //   setActive(false);
  //   window.location.reload(false);
  // }

  return (
    <div className="container-vertical">
      <Title title="Food summary" />
      <div className="intake-container">
        <p>Consumed {meals && consumed}</p>
        <div className="progress-bar-container">
          {calories !== 0 ? (
            <Progressbar
              input={(consumed / calories) * 100}
              pathWidth={16}
              pathColor={["#3EADCF", "#ABE9CD"]} // use an array for gradient color.
              trailWidth={20}
              trailColor="#2b2b2b" // use a string for solid color.
              textStyle={{ fill: "#2b2b2b" }} // middle text style
              customText={calories ? calories.toString() : "You have to elo "}
            >
              {/* children goes here, an image for example. (optional) */}
            </Progressbar>
          ) : (
            <p>You have to set your weight and goal in profile settings</p>
          )}
        </div>
        <p>
          Remaining{" "}
          {calories && meals && consumed > calories ? 0 : calories - consumed}
        </p>
      </div>
      <Button
        text="Add meal "
        className="button-default"
        onClick={() => setActive(true)}
      />
      <div className="meals-container container-vertical">
        <Title title="Breakfast" />
        <div className="container-vertical">
          {meals &&
            meals
              .filter((meal) => meal.time === "Breakfast")
              .map((meal, index) => {
                return (
                  <div className="meals-container__meal" key={index}>
                    <span>{meal.mealName}</span>
                    <div className="meal-nutritions">
                      <span>{Math.round(meal.proteins)} P</span>
                      <span>{Math.round(meal.carbs)} C</span>
                      <span>{Math.round(meal.fats)} F</span>
                      <span>{calculateConsumedMealCalories(meal)} kcal</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="meals-container container-vertical">
        <Title title="Lunch" />
        <div className="container-vertical">
          {meals &&
            meals
              .filter((meal) => meal.time === "Lunch")
              .map((meal, index) => {
                return (
                  <div className="meals-container__meal" key={index}>
                    <span>{meal.mealName}</span>
                    <div className="meal-nutritions">
                      <span>{Math.round(meal.proteins)} P</span>
                      <span>{Math.round(meal.carbs)} C</span>
                      <span>{Math.round(meal.fats)} F</span>
                      <span>{calculateConsumedMealCalories(meal)} kcal</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="meals-container container-vertical">
        <div className="container-vertical">
          <Title title="Dinner" />
          {meals &&
            meals
              .filter((meal) => meal.time === "Dinner")
              .map((meal, index) => {
                return (
                  <div className="meals-container__meal" key={index}>
                    <span>{meal.mealName}</span>
                    <div className="meal-nutritions">
                      <span>{Math.round(meal.proteins)} P</span>
                      <span>{Math.round(meal.carbs)} C</span>
                      <span>{Math.round(meal.fats)} F</span>
                      <span>{calculateConsumedMealCalories(meal)} kcal</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      {active && (
        <div className="bg-modal">
          <div className="modal-content">
            <a href="https://www.edamam.com/" target="_blank"><img src={EdamamLogo} alt="Edamam" /></a>

            <Title title="Add meal" />
            <button
              className="cancel"
              id="cancel-btn"
              onClick={() => setActive(false)}
            >
              X
            </button>
            <form>
              <select
                name="type"
                id="type"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <input
                placeholder="Search"
                className="modal-content-name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
              <Button
                type="button"
                text="Search"
                className="button-default"
                onClick={searchForMeal}
              />
              {apiMeals &&
                apiMeals.map((meal, index) => (
                  <div className="container" key={index}>
                    <p>{meal.food.label}</p>
                    <Button
                      className="button-default"
                      text="Add"
                      onClick={() => addMeal(meal)}
                      type="button"
                    />
                  </div>
                ))}
              {/* {products &&
                products.map((product, index) => (
                  <div className="container" key={index}>
                    <p>{product.productName}</p>
                    <Button
                      className="button-default"
                      text="Add"
                      onClick={() => addMeal(product._id)}
                      type="button"
                    />
                  </div>
                ))} */}
              {/* <input
                placeholder="Proteins"
                type="number"
                value={proteins}
                onChange={(e) => setProteins(e.target.value)}
              />
              <input
                placeholder="Carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
              <input
                placeholder="Fats"
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              /> */}

              {/* <Button className="button-default" text="Add" onClick={addMeal} /> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
