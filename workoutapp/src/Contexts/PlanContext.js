import { createContext, useEffect } from "react";
import { useState } from "react";

const PlanContext = createContext({});

export function PlanProvider({ children }) {
  const [planName, setPlanName] = useState("");
  const [setsNumber, setSetsNumber] = useState(0);
  const [plan, setPlan] = useState([]);

  let planJson = {
    planName,
    plan,
  };

  // useEffect(() => {
  //   console.log(JSON.stringify(planJson))
  // }, [plan])

  return <PlanContext.Provider value={{setPlanName, setPlan, plan, planJson}}>{children}</PlanContext.Provider>;
}

export default PlanContext;