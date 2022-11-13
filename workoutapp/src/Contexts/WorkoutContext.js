import { createContext, useEffect, useState } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workoutName, setWorkoutName] = useState(() => {
    const saved = localStorage.getItem("activeWorkout");
    return saved ? JSON.parse(saved).workoutName : "";
  });

  const [workout, setWorkout] = useState(() => {
    const saved = localStorage.getItem("activeWorkout");
    return saved ? JSON.parse(saved).workout : [];
  });


  const [exerciseBlock, setExerciseBlock] = useState(() => {
    const saved = localStorage.getItem("activeWorkout");
    console.log(saved);
    return saved
      ? formatWorkoutFromJsonToArray(JSON.parse(saved).workout)
      : [{ exerciseName: "" }];
  });

  function formatWorkoutFromJsonToArray(workout) {
    let array = [];
    for (const key in workout) {
      array.push(workout[key]);
    }
    return array;
  }

  let workoutJson = {
    workoutName,
    workout,
  };

  useEffect(() => {
    localStorage.setItem("activeWorkout", JSON.stringify(workoutJson));
  }, [workoutJson]);

  return (
    <WorkoutContext.Provider
      value={{ setWorkout, setWorkoutName, workoutJson, exerciseBlock, setExerciseBlock, workout }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutContext;
