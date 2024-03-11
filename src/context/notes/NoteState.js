import noteContext from "./noteContext";

const NoteState = (props)=>{
    const state ={
        "name":"Mukesh",
        "class":"ce"
    }
    return(
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;