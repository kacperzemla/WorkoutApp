import { useEffect, useState } from "react";
import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import Title from "./Reusable/Title";

export default function Diet(){
    const [calories, setCalories] = useState(0);
    const [height, setHeight ] = useState(0);
    const [weight, setWeight ] = useState(0);
    const [radio, setRadio ] = useState("");

    function calculateIntake(){

    }

    return <div className="container-vertical">
        <Title title="Enter data to calculate your intake" />
        <Input placeholder="Weight" onChange={(e) => setWeight(e.target.value)}/>
        <Input placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
        <Button className="button-default" text="Calculate" />
        <p>Your intake: </p>
    </div>
}