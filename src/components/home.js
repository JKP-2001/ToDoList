// import React, { useContext } from 'react'
import AddNote from './AddNote'
import Note from './note'


const Home = (props) => {

  return (
    <>
      <div className="container my-3">
        <h1>Add Notes</h1>
      </div>
      <AddNote showAlert={props.showAlert}/>
      <div className="container">
        <h1>Your Notes</h1>
        <Note showAlert={props.showAlert}/>
      </div>
    </>
  )
}

export default Home
