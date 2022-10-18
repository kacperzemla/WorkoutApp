import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PlanDetails(){
    const id = useParams().id;
    const [planDetails, setPlanDetails ] = useState();


    const fetchDetails = async () => {
        const res = await fetch(`http://localhost:1337/api/plan/${id}`,{
            method: 'GET'
        })
        const data = await res.json();
        setPlanDetails(data);
    }

    useEffect(() => {
        fetchDetails();
    }, [id])

    return <div>
        {JSON.stringify(planDetails)}
    </div>
}