
const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddImageNote({ onSetNewNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('image'))
    // console.log(noteToEdit)

    function loadImageFromInput(ev) {
        const reader = new FileReader()
        reader.onload = function (event) {
            let img = new Image() 
            img.src = event.target.result 
            updateState(img.src)
        }
        reader.readAsDataURL(ev.target.files[0]) 
    }

    function updateState(src) {
        const noteTitle = { url: src }
        setNoteToEdit(prevBook => ({ ...prevBook, info: noteTitle }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        onSetNewNote(noteToEdit)
    }

    return (
        <section className="image-note-add">
            <form className="note-txt-box-container" onSubmit={onSaveNote} >
            <input type="file" className="file-input-btn" name="image" onChange={loadImageFromInput} />
            <button className="add-image-btn">Add</button>
            </form>
        </section>
    )



}
