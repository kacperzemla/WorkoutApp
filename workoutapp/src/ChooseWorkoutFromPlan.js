import Title from "./Reusable/Title";
import WorkoutContainer from "./Reusable/WorkoutContainer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import WorkoutContext from "./Contexts/WorkoutContext";

export default function ChooseWorkoutFromPlan() {
  const { setWorkout, setWorkoutName, workoutJson } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [plans, setPlans ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:1337/api/getAllPlans/${userID}`,{
        method: "GET"
      });
      const data = await res.json();
      setPlans(data.plans);

    }

    fetchData();

  }, []);

  const handleClick = (id) => {
    const getPlan = async () => {
      const res = await fetch(`http://localhost:1337/api/plan/${id}`, {
        method: "GET"
      })

      const data = await res.json();
      setWorkoutName(data.plan.planName)
      setWorkout(data.plan.plan)
    }
    //tutaj sobie ustawiamy workout z planu :)
    
    getPlan();
  }


  return <div className="container-vertical">
    <Title title={"Choose a plan"} />
    {plans && plans.map((plan, index) => {
      return <WorkoutContainer name={plan.planName}  text={"elo"} key={index} onClick = {() => handleClick(plan._id)}/>
    }) }
  </div>;
}