import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import * as FoodApi from "./EdamamApi";
import MealContext from "./Contexts/MealContext";

export default function AddMeal() {
  const {meal} = useContext(MealContext);
  const id = useParams().id;
  const mealName = useParams().product;
  const [product, setProduct] = useState({});


  useEffect(() => {
    // const fetchDetails = async () => {
    //   const res = await fetch(`http://localhost:1337/api/product/${id}`, {
    //     method: "GET",
    //   });
    //   const data = await res.json();
    //   setProduct(data.product)
    // };

    // fetchDetails();

  }, []);



  return <div>add meal {JSON.stringify(meal)}</div>;
}
