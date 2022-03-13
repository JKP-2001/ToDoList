import React,{useContext} from 'react'
import NoteContext from "../context/notecontext/NoteContext"
import Noteitem from './noteitem';
const Note = () => {
    const {notes,setnotes} = useContext(NoteContext);
    return (
        <div className="row my-3">
            {notes.map((note) => {
                return (<Noteitem note={note}/>);
            })}
        </div>
    )
}

export default Note
