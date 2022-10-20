import { useEffect, useState } from "react";
import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import Title from "./Reusable/Title";

export default function Diet() {
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [radio, setRadio] = useState("");

  useEffect(() => {
    calculateIntake();
  }, [weight, radio]);

  function calculateIntake() {
    if(weight){
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
      <Title title="Enter weight to calculate your intake" />
      <Input
        placeholder="Weight"
        onChange={(e) => setWeight(parseInt(e.target.value))}
      />
      <div className="container">
        <div className="container-vertical">
            <label>Normal</label>
                    <input
                      type="radio"
                      checked={radio === "normal"}
                      value="normal"
                      onChange={(e) => setRadio(e.target.value)}
                    />
        </div>
      <div className="container-vertical">
            <label>Mass</label>
                  <input
                    type="radio"
                    checked={radio === "mass"}
                    value="mass"
                    onChange={(e) => setRadio(e.target.value)}
                  />
      </div>
       <div className="container-vertical">
            <label>Normal</label>
                   <input
                     type="radio"
                     checked={radio === "reduction"}
                     value="reduction"
                     onChange={(e) => setRadio(e.target.value)}
                   />
       </div>
      </div>
      <Button className="button-default" text="Calculate" />
      <p>Your intake:{calories} </p>
    </div>
  );
}
