import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notecontext/NoteContext"
import Noteitem from './noteitem';
import { useNavigate } from "react-router-dom";

const Note = (props) => {
    const { notes, getNotes, editNote,authUser } = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const Navigate = useNavigate();
    useEffect(() => {
        
        if(!localStorage.getItem('token')){
            Navigate("/login");
        }
        else{
            getNotes();
        }
        
    })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
        props.showAlert("success","Note Updated Successfully");

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }


    const ref = useRef(null);
    const closeRef = useRef(null);


    return (
        <>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-toggle="modal" ref={ref} data-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="titleHelp" placeholder="Enter Title" onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter Description" onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter Tag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="container mx-2">
                    {notes.length===0 && "No Notes To Display"}
                </div>
                {notes.map((note) => {
                    return (<Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />);
                })}
            </div>
        </>
    )
}

export default Note
