import { createContext, useEffect, useState } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({children}){
    const [workoutName, setWorkoutName] = useState("");
    const [workout, setWorkout] = useState([])


    let workoutJson = {
        workoutName,
        workout,
    }

    return <WorkoutContext.Provider value = {{setWorkout, setWorkoutName, workoutJson}}>{children}</WorkoutContext.Provider>
}

export default WorkoutContext;