import Title from "./Reusable/Title";
import WorkoutContainer from "./Reusable/WorkoutContainer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [plans, setPlans] = useState([]);
  const [preparedPlans, setPreparedPlans] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:1337/api/getAllPlans/${userID}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setPlans(data.plans);
    };

    const fetchPreparedPlans = async () => {
      const res = await fetch(`http://localhost:1337/api/preparedPlans`, {
        method: "GET",
      });
      const data = await res.json();
      setPreparedPlans(data.preparedPlans);
    };

    fetchPreparedPlans();
    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/plans/${id}`);
  };

  const handlePreparedPlanClick = (id) => {
    navigate(`/preparedPlan/${id}`)
  }

  const countNumberOfExercises = (plan) => {
    return Object.keys(plan).length;
  };

  return (
    <div className="container-vertical">
      <Title title={"Your plans"} />
      <Title title={"Prepared plans"} />
      <p
        onClick={() => setIsActive(true)}
        className={isActive ? "activePlans" : ""}
      >
        Yours Plans
      </p>
      <p
        onClick={() => setIsActive(false)}
        className={isActive ? "" : "activePlans"}
      >
        Prepared plans
      </p>
      {plans &&
        isActive &&
        plans.map((plan, index) => {
          return (
            <WorkoutContainer
              name={plan.planName}
              text={`${countNumberOfExercises(plan.plan)} ${
                countNumberOfExercises(plan.plan) > 1 ? "exercises" : "exercise"
              }`}
              key={index}
              onClick={() => handleClick(plan._id)}
            />
          );
        })}
      {preparedPlans &&
        !isActive &&
        preparedPlans.map((plan, index) => {
          return (
            <WorkoutContainer
              name={plan.planName}
              text={`${countNumberOfExercises(plan.plan)} ${
                countNumberOfExercises(plan.plan) > 1 ? "exercises" : "exercise"
              }`}
              key={index}
              onClick={() => handlePreparedPlanClick(plan._id)}
            />
          );
        })}
    </div>
  );
}
