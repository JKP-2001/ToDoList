import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "622caecf09a1b1f2d061269b",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Wow",
            "description": "No One",
            "tag": "General",
            "date": "1647095503425",
            "__v": 0
        },
        {
            "_id": "622caee109a1b1f2d061269d",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095521454",
            "__v": 0
        },
        {
            "_id": "622caee209a1b1f2d061269f",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095522444",
            "__v": 0
        },
        {
            "_id": "622caee209a1b1f2d06126a1",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095522616",
            "__v": 0
        },
        {
            "_id": "622caee209a1b1f2d06126a3",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095522761",
            "__v": 0
        },
        {
            "_id": "622caee209a1b1f2d06126a5",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095522901",
            "__v": 0
        },
        {
            "_id": "622caee309a1b1f2d06126a7",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095523053",
            "__v": 0
        },
        {
            "_id": "622caee309a1b1f2d06126a9",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095523197",
            "__v": 0
        },
        {
            "_id": "622caee309a1b1f2d06126ab",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095523344",
            "__v": 0
        },
        {
            "_id": "622caee309a1b1f2d06126af",
            "user": "622cae09511bca3cc5d9f734",
            "title": "Hello Google",
            "description": "Voice Assistant Google",
            "tag": "General",
            "date": "1647095523678",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesInitial);

    

    return (<NoteContext.Provider value={{ notes, setnotes }}>
        {props.children}
    </NoteContext.Provider>)
}

export default NoteState;