import { createContext, useEffect } from "react";
import { useState } from "react";


const MealContext = createContext();

export function MealProvider({children}) {
    const [meal, setMeal] = useState({});
    const [time, setTime] = useState("Breakfast");

    return <MealContext.Provider value={{meal, setMeal, time, setTime}}>{children}</MealContext.Provider>
}

export default MealContext;