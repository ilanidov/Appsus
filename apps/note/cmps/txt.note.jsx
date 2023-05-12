const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTxtNote({ onSetNewNote, noteStyle }) {


    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('txt'))
    const inputRef = useRef()


    function handleChange({ target }) {
        setNoteToAdd(prevNote => ({ ...prevNote, style: noteStyle }))
            const field = target.name
            const value = target.value
                setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]:value } }))
    }

    function onSaveNote(ev) {
        // console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToAdd)
    }


    return (
        <section className="note-add">

            <form className="note-txt-box-container" onSubmit={onSaveNote} >
                <label className="" htmlFor="title"></label>
                <input className="note-txt-box" style={noteStyle} ref={inputRef} onChange={handleChange} type="text" name="title" id="title" placeholder="title" />


                <label className="" htmlFor="content"></label>
                <input className="note-txt-box" style={noteStyle} ref={inputRef} onChange={handleChange} type="text" name="content" id="content" placeholder="content" />

                <button>add</button>



            </form>
        </section>
    )

}

