import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/loginuser", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            console.log(json);
            localStorage.setItem("token", json.authToken);
            Navigate("/");
            props.showAlert("success","Logged In Successfully");
        }
        else{
            props.showAlert("danger","Invalid Credentials");
        }
    }

    const onChange = (e)=>{
        e.preventDefault();
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} required minLength={8}/>
                </div>
                <button type="submit" disabled={credentials.password.length<8} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
