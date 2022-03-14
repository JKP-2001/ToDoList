import { useState } from 'react';
import NoteContext from './NoteContext';


const NoteState = (props) => {
  const url = "http://localhost:5000";
  const notesInitial = [];  
  

  const [notes, setNotes] = useState(notesInitial);


  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }


  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/createnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${url}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  const authUser = ()=>{
    const x = localStorage.getItem('token');
    return x;
  }
  
  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes,editNote, authUser }}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState;