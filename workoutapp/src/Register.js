import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import "./Styles/global.css";
import Title from "./Reusable/Title";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function registerUser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })

        const data = await response.json()

        if(data.status === 'ok'){
          navigate('/login');
        }
    }

  return (
    <div className="container-vertical">
      <Title title={"Create your account"} />
      <form className="form" onSubmit={registerUser}>
        <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <Input placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password"/>
        <Button text="Register" className="button-default" />
      </form>
    </div>
  );
}
