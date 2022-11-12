import { createContext, useEffect } from "react";
import { useState } from "react";


const MealContext = createContext();

export function MealProvider({children}) {
    const [meal, setMeal] = useState({});

    return <MealContext.Provider value={{meal, setMeal}}>{children}</MealContext.Provider>
}

export default MealContext;