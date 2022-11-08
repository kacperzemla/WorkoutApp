import Title from "./Reusable/Title";
import WorkoutContainer from "./Reusable/WorkoutContainer";
import { useEffect, useState } from "react";
import { useNavigate, usePrompt } from "react-router-dom";
import { useContext } from "react";
import WorkoutContext from "./Contexts/WorkoutContext";

export default function ChooseWorkoutFromPlan() {
  const { setWorkout, setWorkoutName, workoutJson, workoutName } =
    useContext(WorkoutContext);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [plans, setPlans] = useState([]);
  const [preparedPlans, setPreparedPlans] = useState([]);
  const [isActive, setIsActive] = useState(true);
  // const [isActiveWorkout, setIsActiveWorkout] = useState(() => {
  //   return workoutName.length > 0 ? true : false;
  // });

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
    const getPlan = async () => {
      const res = await fetch(`http://localhost:1337/api/plan/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      setWorkoutName(data.plan.planName);
      setWorkout(data.plan.plan);
    };

    getPlan();
    navigate("/createWorkout");
  };

  const handlePreparedPlanClick = (id) => {
    const getPlan = async () => {
      const res = await fetch(`http://localhost:1337/api/preparedPlan/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      setWorkoutName(data.plan.planName);
      setWorkout(data.plan.plan);
    };


    getPlan();
    navigate("/createWorkout");
  };

  const countNumberOfExercises = (plan) => {
    return Object.keys(plan).length;
  };

  return (
    <div className="container-vertical">
      <div className="container container-plans">
        <p
          onClick={() => setIsActive(true)}
          className={isActive ? "activePlans title" : "title"}
        >
          Choose your plan
        </p>
        <p
          onClick={() => setIsActive(false)}
          className={isActive ? "title" : "activePlans title"}
        >
          Choose prepared plan
        </p>
      </div>
      {plans && isActive &&
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
