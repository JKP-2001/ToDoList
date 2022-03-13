import React, { useContext } from 'react'
import Note from './note'

const Home = () => {

  return (
    <>
      <div className="container my-3">
        <h1>Add Notes</h1>
      </div>
      <div class="container my-4">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container">
        <h1>Your Notes</h1>
        <Note />
      </div>
    </>
  )
}

export default Home
