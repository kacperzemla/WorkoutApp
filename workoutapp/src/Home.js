import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutContainer from "./Reusable/WorkoutContainer";
import "./Styles/functional.css";

export default function Home() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [workouts, setWorkouts] = useState();
  const activeWorkoutObject = localStorage.getItem("activeWorkout");
  const activeWorkout = activeWorkoutObject
    ? JSON.parse(activeWorkoutObject)
    : null;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:1337/api/getAllWorkouts/${userID}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setWorkouts(data.workouts);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/workouts/${id}`);
  };

  const handleActiveWorkoutClick = () => {
    navigate("/createWorkout");
  };

  return (
    <div className="container-vertical">
      <h1>Hello, user</h1>
      {activeWorkout.workoutName && (
        <div className="container-vertical">
          <h2>Active workout</h2>
          <WorkoutContainer
            name={activeWorkout.workoutName}
            onClick={() => handleActiveWorkoutClick()}
            className="activeWorkout"
          />
        </div>
      )}
      <h2>Workout history</h2>
      {workouts &&
        workouts.map((workout, index) => {
          console.log(workout);
          return (
            <WorkoutContainer
              name={workout.workoutName}
              text={new Date(workout.createdAt).toLocaleDateString()}
              key={index}
              onClick={() => handleClick(workout._id)}
            />
          );
        })}
    </div>
  );
}
