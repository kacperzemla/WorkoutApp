import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "./Reusable/Title";
import "./Styles/functional.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function PlanDetails({prepared}) {
  const navigate = useNavigate();
  const id = useParams().id;
  const [planDetails, setPlanDetails] = useState(null);

  const fetchDetails = async () => {
    const res = await fetch(`http://localhost:1337/api/plan/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    setPlanDetails(data.plan);
  };

  const fetchPreparedPlanDetails = async () => {
    const res = await fetch(`http://localhost:1337/api/preparedPlan/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    setPlanDetails(data.plan);
  };

  useEffect(() => {
    prepared ? fetchPreparedPlanDetails() : fetchDetails();
  }, []);

  function formatWorkoutFromJsonToArray(workout) {
    let array = [];
    for (const key in workout) {
      array.push(workout[key]);
    }
    return array;
  }

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1337/api/deletePlan/${id}`, {
      method: 'DELETE'
    })

    const json = await response.json();

    if(response.ok){
      navigate('/plans');
    }
  }

  return (
    <div className="container-vertical">
      <div className="details-title-container">
        {planDetails && <Title title={planDetails.planName} />}
        {!prepared && <FontAwesomeIcon icon={faTrash} onClick = { handleDelete }/>}
      </div>

      {/* {planDetails && JSON.stringify(planDetails)} */}
      {planDetails &&
        formatWorkoutFromJsonToArray(planDetails.plan).map((exercise, index) => {
          return (
            <div className="container-exercise container-vertical" key = {index}>
              <p className="container-exercise__paragraph">
                {exercise.exerciseName}
              </p>
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
