
const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddImageNote({ onSetNewNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('image'))
    console.log(noteToEdit)


    // useEffect(() => {
    //     onSetNewNote(noteToEdit)
    // }, [noteToEdit])

    function loadImageFromInput(ev) {
        const reader = new FileReader()
        // After we read the file
        reader.onload = function (event) {
            let img = new Image() // Create a new html img element
            img.src = event.target.result // Set the img src to the img file we read
            // Run the callBack func, To render the img on the canvas
            // img.onload = onImageReady.bind(null, img)
            // Can also do it this way:
            // img.onload = () => onImageReady(img)
            console.log(img.src)
            updateState(img.src)
        }
        reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

    }

    function updateState(src) {

        const noteTitle = { url: src }
        console.log(noteTitle)
        setNoteToEdit(prevBook => ({ ...prevBook, info: noteTitle }))
        console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToEdit)
    }

    return (
        <section className="image-note-add">
            <form className="note-txt-box-container" onSubmit={onSaveNote} >

            <input type="file" className="file-input btn" name="image" onChange={loadImageFromInput} />

            {/* <label className="" htmlFor="title"></label> */}
            {/* <input className="note-txt-box"  onChange={handleChange} type="text" name="title" id="title" /> */}

            <button>add</button>
            </form>
        </section>
    )



}
