import Title from "./Reusable/Title";
import Input from "./Reusable/Input";
import ExerciseContainer from "./Reusable/ExerciseContainer";
import "./Styles/functional.css";
import { useState, useContext, useEffect } from "react";
import PlanContext from "./Contexts/PlanContext";
import Button from "./Reusable/Button";

export default function CreatePlan() {
  const [json, setJson] = useState({});
  const { plan, setPlan, planName, setPlanName, planJson } =
    useContext(PlanContext);
  const [exerciseBlock, setExerciseBlock] = useState([{ exerciseName: "" }]);
  const userID = localStorage.getItem("userID");

  function handleFieldsChange(fieldId, value) {
    setJson({ ...json, [fieldId]: value });
  }

  useEffect(() => {
    setPlan(json);
  }, [json]);

  function addExercise() {
    let newExercise = { exerciseName: "" };
    setExerciseBlock([...exerciseBlock, newExercise]);
  }

  async function createPlan(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/createPlan", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userID,
        planJson,
      }),
    });

    const data = await response.json();
    setPlanName("");
    setExerciseBlock([{ exerciseName: "" }]);
    setPlan([]);
    window.location.reload(false);
  }

  return (
    <form className="container-vertical" onSubmit={createPlan}>
      <Title title="Create new plan" />

      <Input
        placeholder="Name"
        onChange={(e) => setPlanName(e.target.value)}
        value={planName}
        required={true}
      />
      {exerciseBlock.map((exercise, index) => {
        return (
          <ExerciseContainer
            key={index}
            onChange={handleFieldsChange}
            id={index}
          />
        );
      })}
      <Button
        className="button-default"
        text="New exercise"
        onClick={addExercise}
        type="button"
      />
      <Button className="button-secondary" text="Create plan" />
    </form>
  );
}
