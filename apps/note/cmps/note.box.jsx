
const { useEffect, useState, useRef } = React

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"




export function NoteBox() {
    const [note, setNote] = useState()
    const inputRef = useRef()


    useEffect(() => {
        showSuccessMsg('Welcome to book index!')
    }, [])


    function onSaveNote(ev) {
        ev.preventDefault()
        // console.log(inputRef.current.value)
        const noteContent = inputRef.current.value
        setNote(noteContent)
        // console.log(noteContent)
        noteService.addNewNote(noteContent)
        .then(() => {
            showSuccessMsg('Book saved')
            console.log('hi')
        })
    }



    return (
        <section className="note-box-container">
            <section className="note-box">
                <form className="note-box-input" onSubmit={onSaveNote}  >
                    {/* <label htmlFor="noteTxtInput"></label> */}
                    <input ref={inputRef} type="text" name="noteTxtInput" id="noteTxtInput" />
                    <button >Add</button>
                </form>




                <section className="note-box-icons">


                </section>


            </section>

        </section>





    )
}