import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "./Reusable/Title";
import "./Styles/functional.css";

export default function PlanDetails() {
  const id = useParams().id;
  const [planDetails, setPlanDetails] = useState(null);

  const fetchDetails = async () => {
    const res = await fetch(`http://localhost:1337/api/plan/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    setPlanDetails(data.plan);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  function formatWorkoutFromJsonToArray(workout) {
    let array = [];
    for (const key in workout) {
      array.push(workout[key]);
    }
    return array;
  }

  return (
    <div className="container-vertical">
      {planDetails && <Title title={planDetails.planName} />}
      {/* {planDetails && JSON.stringify(planDetails)} */}
      {planDetails &&
        formatWorkoutFromJsonToArray(planDetails.plan).map((exercise) => {
          return (
            <div className="container-exercise container-vertical">
              <p className="container-exercise__paragraph">{exercise.exerciseName}</p>
              <ul className="container-vertical set-list">
                {exercise.sets.map((set, index) => {
                  return (
                    <li className="set-list-item" key={index}>
                      <span>{index + 1}.</span>
                      <span>Reps: </span>
                      <span>{set.reps}</span>
                      <span>Weight: </span>
                      <span>{set.weights}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}
