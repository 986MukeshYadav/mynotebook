import noteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props)=>{
   const notesInitial =[
    {
        "_id": "65e9f6941cbf5731b11e8661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf5732b11e8661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf5373b11e8661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf5743b11e8661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf573b11e58661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf573b11e78661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },
      {
        "_id": "65e9f6941cbf573b116e8661a",
        "user": "65e8a2d187fb26cc3952e452",
        "title": "My Title one",
        "description": "Don't touch me",
        "tag": "Personal",
        "date": "2024-03-07T17:17:08.129Z",
        "__v": 0
      },

   ]

   const [notes,setNotes]=useState(notesInitial)
    return(
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;