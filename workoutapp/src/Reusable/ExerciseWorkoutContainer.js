import "../Styles/functional.css";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import WorkoutContext from "../Contexts/WorkoutContext";

function ExerciseWorkoutContainer({ onChange, id, exercise }) {
  const { workout, setWorkout } = useContext(WorkoutContext);
  const [inputFields, setInputFields] = useState(() => {
    const sets = exercise.sets;
    return sets ? sets : [{ reps: "", weights: "" }];
  });

  const [exerciseName, setExerciseName] = useState(() => {
    let saved;
    if (exercise) {
      saved = exercise.exerciseName;
    }
    return saved || "";
  });

  const handleChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    onChange(id, createJson());
  };

  const handleChangeName = (event) => {
    setExerciseName(event.target.value);
    onChange(id, createJson());
  };

  useEffect(() => {
    onChange(id, createJson());
  }, [exerciseName]);

  const addFields = () => {
    let newfield = { reps: "", weights: "" };
    setInputFields([...inputFields, newfield]);
  };

  function createJson() {
    let json = {
      exerciseName,
      sets: inputFields,
    };
    return json;
  }

  return (
    <div className="container-vertical container-exercise">
      <input
        type="text"
        className="container-exercise__input"
        onChange={(e) => handleChangeName(e)}
        value={exerciseName}
      />
      <ul className="container-vertical set-list">
        {inputFields.map((input, index) => {
          return (
            <li className="set-list-item" key={index}>
              <span>{index + 1}.</span>
              <span>Reps: </span>
              <input
                type="text"
                className="container-exercise__input"
                value={input.reps}
                onChange={(event) => handleChange(index, event)}
                name="reps"
              />
              <span>Weight: </span>
              <input
                type="text"
                className="container-exercise__input"
                value={input.weights}
                onChange={(event) => handleChange(index, event)}
                name="weights"
              />
            </li>
          );
        })}
        <Button
          text="+"
          className="button-default set-list-button"
          onClick={() => addFields()}
          type="button"
        />
      </ul>
    </div>
  );
}

export default ExerciseWorkoutContainer;
