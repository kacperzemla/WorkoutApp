import { useEffect, useState } from "react";
import Title from "./Reusable/Title";
import "./Styles/functional.css";
import Progressbar from "react-js-progressbar";
import Button from "./Reusable/Button";

export default function Diet() {
  const userID = localStorage.getItem("userID");
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [radio, setRadio] = useState("");

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

    fetchUserSettings();
  }, []);

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

  return (
    <div className="container-vertical">
      <Title title="Food summary" />
      <div className="intake-container">
        <p>Consumed</p>
        <div className="progress-bar-container">
        {calories && <Progressbar
          input={30}
          pathWidth={16}
          pathColor={['#3EADCF', '#ABE9CD']} // use an array for gradient color.
          trailWidth={20}
          trailColor='#2b2b2b' // use a string for solid color.
          textStyle={{ fill: '#2b2b2b' }} // middle text style
          customText={calories ? calories.toString() : "0"}
        >
           {/* children goes here, an image for example. (optional) */}
        </Progressbar>}
        </div>
        <p>Remaining</p>
      </div>
      <Button text="Add meal " className="button-default"/>
      <div className="intake-container">
        <p>Breakfast</p>
      </div>
      <div className="intake-container">
        <p>Lunch</p>
      </div>
      <div className="intake-container">
        <p>Dinner</p>
      </div>
    </div>
  );
}
