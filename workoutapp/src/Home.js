import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutContainer from "./Reusable/WorkoutContainer";
import "./Styles/functional.css";
import jwtDecode from "jwt-decode";
import Title from "./Reusable/Title";
import Button from "./Reusable/Button";

export default function Home() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [workouts, setWorkouts] = useState();
  const [user, setUser] = useState("");
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
    getUsername();
  }, []);

  const handleClick = (id) => {
    navigate(`/workouts/${id}`);
  };

  const handleActiveWorkoutClick = () => {
    navigate("/createWorkout");
  };

  const getUsername = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      setUser(user.username);
    }
  };

  return (
    <div className="container-vertical">
      <div className="container home-title-container">
        <h1>
          <span>Hello,</span><br /> {user}!
        </h1>
        <Button className="button-secondary" text="Logout" />
      </div>
      {activeWorkout && activeWorkout.workoutName && (
        <div className="container-vertical">
          <div className="container home-title-container">
            <h2>Active workout</h2>
          </div>
          <WorkoutContainer
            name={activeWorkout.workoutName}
            onClick={() => handleActiveWorkoutClick()}
            className="activeWorkout"
          />
        </div>
      )}
      <div className="container home-title-container">
        <h2>Workout history</h2>
      </div>
      {workouts &&
        workouts.map((workout, index) => {
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
