import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
  };

  const calculateNutritions = (meal) => {
    let base = 100;
    let proteins = meal.food.nutrients.PROCNT;
    let carbs = meal.food.nutrients.CHOCDF;
    let fats = meal.food.nutrients.FAT;
    setProteins(((proteins / base) * grams).toFixed(2));
    setCarbs(((carbs / base) * grams).toFixed(2));
    setFats(((fats / base) * grams).toFixed(2));
  };

  return (
    <div className="container-vertical">
      <Title title={time} />
      <p>{meal.food.label}</p>
      <p>Kcal {meal.food.nutrients.ENERC_KCAL}</p>
      <p>Proteins {meal.food.nutrients.PROCNT}</p>
      <p>Fats {meal.food.nutrients.FAT}</p>
      <p>Carbs {meal.food.nutrients.CHOCDF}</p>
      <p>{proteins}</p>
      <p>{carbs}</p>
      <p>{fats}</p>
      <Input
        type="number"
        placeholder="weight"
        onChange={(e) => {
          setGrams(e.target.value);
        }}
      />
      <Button text="Save meal" className="button-default" onClick={saveMeal} />
    </div>
  );
}
