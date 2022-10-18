import Button from "./Reusable/Button";
import Title from "./Reusable/Title";
import { Link } from "react-router-dom";
import './Styles/functional.css';

export default function StartTraining(){
    return <div className="container-vertical">
        <Title title={"Start your training"} />
        <Link to ="/createPlan" className="button-secondary">From plan</Link>
        <Link to ="/createWorkout" className="button-secondary">New workout</Link>
        <Link to ="/createPlan" className="button-default">Create new plan</Link>
    </div>
}