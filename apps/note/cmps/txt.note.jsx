const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTxtNote({onSetNewNote}) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('txt'))
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    // useEffect(() => {
    //     onSetNewNote(noteToEdit)
    // }, [noteToEdit])

    // setbookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value }, }))


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
        <section className="note-add">

            <form className="note-txt-box-container" onSubmit={onSaveNote} >
                <label className="" htmlFor="title"></label>
                <input className="note-txt-box" ref={inputRef} onChange={handleChange} type="text" name="title" id="title" />

                <button>add</button>
            </form>

      




        </section>
    )

}