import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as FoodApi from "./EdamamApi";
import MealContext from "./Contexts/MealContext";
import Button from "./Reusable/Button";
import Title from "./Reusable/Title";
import Input from "./Reusable/Input";

export default function AddMeal() {
  const { meal, time } = useContext(MealContext);
  const userID = localStorage.getItem("userID");
  const mealName = meal.food.label;
  const [proteins, setProteins] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [grams, setGrams] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isWeightValid, setIsWeightValid] = useState(true);

  useEffect(() => {
    // const fetchDetails = async () => {
    //   const res = await fetch(`http://localhost:1337/api/product/${id}`, {
    //     method: "GET",
    //   });
    //   const data = await res.json();
    //   setProduct(data.product)
    // };
    // fetchDetails();
    calculateNutritions(meal);
  }, [grams]);

  const saveMeal = async (event) => {
    event.preventDefault();
    const req = await fetch("http://localhost:1337/api/createMeal", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        userID,
        mealName,
        proteins,
        carbs,
        fats,
        time,
      }),
    });
    navigate("/diet");
  };

  const calculateNutritions = (meal) => {
    const base = 100;
    const proteins = meal.food.nutrients.PROCNT;
    const carbs = meal.food.nutrients.CHOCDF;
    const fats = meal.food.nutrients.FAT;
    const kcal = meal.food.nutrients.ENERC_KCAL;
    setProteins(((proteins / base) * grams).toFixed(2));
    setCarbs(((carbs / base) * grams).toFixed(2));
    setFats(((fats / base) * grams).toFixed(2));
    setKcal(((kcal / base) * grams).toFixed(2));
  };

  const validate = (e) => {
    if (e.target.value > 10000) {
      setError("Value must be less than 10000");
      setIsWeightValid(false);
    } else if (e.target.value === "") {
      setError("Enter the weight");
      setIsWeightValid(false);
    } else {
      setError("");
      setIsWeightValid(true);
    }
  };

  return (
    <form className="container-vertical" onSubmit={saveMeal}>
      <Title title={time} />
      <div className="container add-meal meals-container">
        <p>{meal.food.label} (100g)</p>
        <p>{meal.food.nutrients.ENERC_KCAL.toFixed(2)} Kcal</p>
        {/* <p>Proteins {meal.food.nutrients.PROCNT}</p>
        <p>Fats {meal.food.nutrients.FAT}</p>
        <p>Carbs {meal.food.nutrients.CHOCDF}</p> */}
        {/* <p>{proteins}</p>
        <p>{carbs}</p>
        <p>{fats}</p> */}
      </div>

      <div className="container weight-container">
        <Input
          type="number"
          placeholder="weight"
          onChange={(e) => {
            validate(e);
            setGrams(e.target.value);
          }}
          max={10000}
          maxlength="5"
          required={true}
        />
        <div className="meals-container">g</div>
        <div className="meals-container">{kcal} kcal</div>
      </div>
      {error && <p className="meals-container-error">{error}</p>}
      <Button
        text="Save meal"
        className="button-default"
        disabled={!isWeightValid}
      />
      <p>{isWeightValid}</p>
    </form>
  );
}
