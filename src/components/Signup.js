import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const Navigate = useNavigate();
  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      Navigate("/");
      props.showAlert("success","Account Created Successfully");
    }
    else {
      props.showAlert("danger","Email Already Existed or Invalid Input Type");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} placeholder="Enter email" onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} placeholder="Enter email" onChange={onChange} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="Password" onChange={onChange} required minLength={8} />
        </div>
        <button type="submit" disabled={credentials.password.length < 8} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
