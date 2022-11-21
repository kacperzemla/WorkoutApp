import { useEffect, useState } from "react";
import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import Title from "./Reusable/Title";

export default function Profile() {
  const userID = localStorage.getItem("userID");
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState("");
  const [radio, setRadio] = useState("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      const res = await fetch(
        `http://localhost:1337/api/userSettings/${userID}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();

      setWeight(data.userSettings.weight);
      setRadio(data.userSettings.goal);
    };

    fetchUserSettings();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:1337/api/saveSettings/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userID,
          weight,
          goal: radio,
        }),
      }
    );
    const data = await response.json();
    if (data.message === "working") {
      alert("Saved");
    }
  }

  return (
    <form className="container-vertical" onSubmit={handleSubmit}>
      <Title title="Your settings" />
      <Input
        placeholder="Weight"
        onChange={(e) => setWeight(parseInt(e.target.value))}
        value={weight || ""}
      />
      <div className="container-vertical pick-goal">
        <h2 className="pick-goal-header">Pick your goal</h2>
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
            <label>Reduction</label>
            <input
              type="radio"
              checked={radio === "reduction"}
              value="reduction"
              onChange={(e) => setRadio(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="button-secondary" text="Save settings" />
    </form>
  );
}
