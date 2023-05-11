const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { ColorInput } from "./color-input.jsx"


export function AddTxtNote({onSetNewNote}) {
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: 'none',
        fontSize: '16px'
    })

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('txt'))
    const inputRef = useRef()
    // const navigate = useNavigate()
    // const params = useParams()

    function onSetNoteStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    function handleChange({ target }) {
        setNoteToAdd(prevNote => ({ ...prevNote, info: {...prevNote.info , title: target.value} }))
        // console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        // console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToAdd)
    }

    

    return (
        <section  className="note-add">

            <form className="note-txt-box-container"  onSubmit={onSaveNote} >
                <label className="" htmlFor="title"></label>
                <input className="note-txt-box" style={noteStyle} ref={inputRef} onChange={handleChange} type="text" name="title" id="title" />

                <button>add</button>


            <section>
        <ColorInput onSetNoteStyle={onSetNoteStyle} />
        </section>
            </form>
        </section>
    )

}

