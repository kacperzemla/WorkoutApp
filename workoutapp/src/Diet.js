import { useEffect, useState } from "react";
import Title from "./Reusable/Title";
import "./Styles/functional.css";
import Progressbar from "react-js-progressbar";
import Button from "./Reusable/Button";
import Input from "./Reusable/Input";

export default function Diet() {
  const userID = localStorage.getItem("userID");
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [radio, setRadio] = useState("");
  const [active, setActive] = useState(false);
  const [mealName, setMealName] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [time, setTime] = useState("Breakfast");
  const [meals, setMeals] = useState([]);

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
      const res = await fetch(
        `http://localhost:1337/api/meals/${userID}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

    };

    fetchUserSettings();
  }, []);

  useEffect(() => {
    console.log(time)
  }, [time])

  useEffect(() => {
    calculateIntake();
  }, [weight, radio]);

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

  async function addMeal(event){
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
    })

    const data = req.json();
    setActive(false);
  }

  return (
    <div className="container-vertical">
      <Title title="Food summary" />
      <div className="intake-container">
        <p>Consumed</p>
        <div className="progress-bar-container">
          {calories && (
            <Progressbar
              input={30}
              pathWidth={16}
              pathColor={["#3EADCF", "#ABE9CD"]} // use an array for gradient color.
              trailWidth={20}
              trailColor="#2b2b2b" // use a string for solid color.
              textStyle={{ fill: "#2b2b2b" }} // middle text style
              customText={calories ? calories.toString() : "0"}
            >
              {/* children goes here, an image for example. (optional) */}
            </Progressbar>
          )}
        </div>
        <p>Remaining</p>
      </div>
      <Button
        text="Add meal "
        className="button-default"
        onClick={() => setActive(true)}
      />
      <div className="intake-container">
        <p>Breakfast</p>
      </div>
      <div className="intake-container">
        <p>Lunch</p>
      </div>
      <div className="intake-container">
        <p>Dinner</p>
      </div>
      {active && (
        <div className="bg-modal">
          <div className="modal-content">
            <Title title="Add meal" />
            <button
              className="cancel"
              id="cancel-btn"
              onClick={() => setActive(false)}
            >
              X
            </button>
            <form>
              <input placeholder="Name" className="modal-content-name" value={mealName} onChange={(e) => setMealName(e.target.value)}/>
              <input placeholder="Proteins" type="number"  value={proteins} onChange={(e) => setProteins(e.target.value)}/>
              <input placeholder="Carbs" type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)}/>
              <input placeholder="Fats" type="number" value={fats} onChange={(e) => setFats(e.target.value)}/>
              <select name="type" id="type" required value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <Button className="button-default" text="Add" onClick={addMeal}/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
