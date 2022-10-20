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

  let workoutJson = {
    workoutName,
    workout,
  };

  useEffect(() => {
    console.log(workoutName);
  }, [workoutName]);

  useEffect(() => {
    localStorage.setItem("activeWorkout", JSON.stringify(workoutJson));
  }, [workoutJson]);

  return (
    <WorkoutContext.Provider
      value={{ setWorkout, setWorkoutName, workoutJson }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutContext;
