import Title from "./Reusable/Title";
import Input from "./Reusable/Input";
import ExerciseWorkoutContainer from "./Reusable/ExerciseWorkoutContainer";
import "./Styles/functional.css";
import { useEffect, useState } from "react";
import WorkoutContext from "./Contexts/WorkoutContext";
import { useContext } from "react";
import Button from "./Reusable/Button";

export default function CreateWorkout() {
  const { setWorkout, setWorkoutName, workoutJson } =
    useContext(WorkoutContext);
  const [jsonWorkout, setJsonWorkout] = useState(() => {
    const saved = localStorage.getItem("activeWorkout");
    return saved ? JSON.parse(saved).workout : {};
  });
  const [time, setTime] = useState(0);

  const [exerciseBlock, setExerciseBlock] = useState(() => {
    const saved = localStorage.getItem("activeWorkout");
    return saved
      ? formatWorkoutFromJsonToArray(JSON.parse(saved).workout)
      : [{ exerciseName: "" }];
  });

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    timer();
    console.log();
  }, []);

  useEffect(() => {
    setWorkout(jsonWorkout);
  }, [jsonWorkout]);

  function handleFieldsChange(fieldId, value) {
    setJsonWorkout({ ...jsonWorkout, [fieldId]: value });
  }

  function addExercise() {
    let newExercise = { exerciseName: "" };
    setExerciseBlock([...exerciseBlock, newExercise]);
  }

  function formatWorkoutFromJsonToArray(workout) {
    let array = [];
    for (const key in workout) {
      array.push(workout[key]);
    }
    return array;
  }

  async function saveWorkout(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/saveWorkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userID,
        workoutJson,
      }),
    });

    // const data = await response.json();

    setWorkout({
      0: {
        exerciseName: "",
        sets: [
          {
            reps: "",

            weights: "",
          },
        ],
      },
    });
    setWorkoutName("");
    window.location.reload(false);
  }

  const timer = () => {
    let time;
    let start = Date.now();
    setInterval(function () {
      let delta = Date.now() - start;
      time = Math.floor(delta / 1000);
      setTime(time);
    }, 1000);
  };

  return (
    <form className="container-vertical" onSubmit={saveWorkout}>
      <p>{time}</p>
      <Title title="Create new workout" />
      <Input
        placeholder="Name"
        onChange={(event) => setWorkoutName(event.target.value)}
        value={workoutJson.workoutName || ""}
      />
      {exerciseBlock.map((exercise, index) => {
        return (
          <ExerciseWorkoutContainer
            key={index}
            id={index}
            onChange={handleFieldsChange}
            exercise={exercise}
          />
        );
      })}
      <Button
        className="button-default"
        text="Add new exercise"
        onClick={addExercise}
        type="button"
      />
      <Button className="button-secondary" text="Save workout" />
    </form>
  );
}