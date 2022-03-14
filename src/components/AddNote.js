import React,{useContext,useState} from 'react'
import NoteContext from "../context/notecontext/NoteContext"

const AddNote = (props) => {
    const {addNote} = useContext(NoteContext);

    const initial = ({title:"",description:"",tag:""});
    
    const [note, setNote] = useState(initial);

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("success","Note Added Successfully");
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }

    return (
        <div>
            <div className="container my-4">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" value={note.title} placeholder="Enter Title" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" value={note.description} onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Description" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.description.length<5 || note.title.length<1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
