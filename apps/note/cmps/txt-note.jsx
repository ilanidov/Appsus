const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTxtNote({onSetNewNote}) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    // useEffect(() => {
    //     onSetNewNote(noteToEdit)
    // }, [noteToEdit])



    function handleChange({ target }) {
        const noteTitle = { title: target.value }
        setNoteToEdit(prevBook => ({ ...prevBook, info: noteTitle }))
        // console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToEdit)
    }

    return (
        <section className="note-add">

            <form className="note-txt-box-container" onSubmit={onSaveNote} >
                <label className="" htmlFor="title"></label>
                <input className="note-txt-box" ref={inputRef} onChange={handleChange} type="text" name="title" id="title" />

                <button>add</button>
            </form>

      




        </section>
    )

}