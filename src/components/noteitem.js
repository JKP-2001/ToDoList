import React,{useContext,useState} from 'react'
import NoteContext from "../context/notecontext/NoteContext"

const Noteitem = (props) => {
    const note = props.note;
    const updateNote = props.updateNote;
    
    const {deleteNote} = useContext(NoteContext);
    const handleClick = ()=>{
        deleteNote(note._id)
        props.showAlert("success","Note Deleted Successfully");
    }

    const handleUpdate = ()=>{
        updateNote(note);
    }
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-2" onClick={handleClick}></i>
                    <i className="far fa-edit mx-2" onClick={handleUpdate}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
