const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTxtNote({ onSetNewNote, noteStyle }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('txt'))
    const [isContentShown, setIsContentShown] = useState(false)
    const inputRefTitle = useRef()
    const inputRefContent = useRef()

    const dynClass = isContentShown ? 'show-content' : 'hide-content'

    function handleChange({ target }) {
        setNoteToAdd(prevNote => ({ ...prevNote, style: noteStyle }))
        const field = target.name
        const value = target.value
        setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }
    
    function onSaveNote(ev) {
        ev.target.value = ''
        // console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToAdd)
        setTimeout(clearInput, 3500)
    }
    
    function clearInput() {
        inputRefTitle.current.value=''
        inputRefContent.current.value=''      
    }
  
    function showContentBox() {
        setIsContentShown(true)
    }


    return (
        <section className="note-add">

            <form className="note-txt-box-container" style={noteStyle} onSubmit={onSaveNote} >
                <label className="" htmlFor="title"></label>
                <input className="note-txt-title txt-input" onClick={showContentBox} ref={inputRefTitle} onChange={handleChange} type="text" name="title" id="title" placeholder="title" />

                <label className="" htmlFor="content"></label>
                <input className={`note-txt-content txt-input ${dynClass}`} ref={inputRefContent} onChange={handleChange} type="text" name="content" id="content" placeholder="content" />

                <button className="txt-note-btn">Add</button>
            </form>

        </section>
    )

}

