import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutContainer from "./Reusable/WorkoutContainer";

export default function Home(){
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const [workouts, setWorkouts] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:1337/api/getAllWorkouts/${userID}`, {
                method: 'GET'
            });
            const data = await res.json();
            setWorkouts(data.workouts)
        }

        fetchData();
    }, []);

    const handleClick = (id) => {
        navigate(`/workouts/${id}`)
    }

    return <div className="container-vertical">
        <h1>Hello, user</h1>
        <h2>Active workout</h2>
        <h2>Workout history</h2>
        {workouts && workouts.map((workout, index) => {
            return <WorkoutContainer name={workout.workoutName} text={"xd"} key={index} onClick ={() => handleClick(workout._id)} />
        })}
    </div>
}