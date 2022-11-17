import "../Styles/functional.css";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ExerciseWorkoutContainer({ onChange, id, exercise }) {
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

  useEffect(() => {
    const sets = exercise.sets;
    setInputFields(sets ? sets : [{ reps: "", weights: "" }]);
    setExerciseName(exercise.exerciseName);
  }, [exercise]);

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

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
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
        required
      />
      
        <ul className="container-vertical set-list">
          {inputFields.map((input, index) => {
            return (
              <div className="container set-list-container" key={index}>
                <li className="set-list-item" >
                  <span>{index + 1}.</span>
                  <span>Reps: </span>
                  <input
                    type="number"
                    className="container-exercise__input"
                    value={input.reps}
                    onChange={(event) => handleChange(index, event)}
                    name="reps"
                    required
                  />
                  <span>kg: </span>
                  <input
                    type="number"
                    className="container-exercise__input"
                    value={input.weights}
                    onChange={(event) => handleChange(index, event)}
                    name="weights"
                    required
                  />
                </li>
                {index > 0 && (
                  <FontAwesomeIcon icon={faTrash} onClick = { removeFields }/>
                )}
              </div>
            );
          })}
        </ul>
        <Button
          text="+"
          className="button-default set-list-button"
          onClick={() => addFields()}
          type="button"
        />
      </div>

  );
}

export default ExerciseWorkoutContainer;
