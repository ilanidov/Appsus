const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM



import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { noteService } from "../services/note.service.js"


export function AddNote({onSetNewNote}) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    // useEffect(() => {
    //     onSetNewNote(noteToEdit)
    // }, [noteToEdit])



    function handleChange({ target }) {
        // const inputVal = target.value
        const fa = { title: target.value }
        // const field = target.name
        // const value = target.type === 'number' ? (+target.value || '') : target.value
        // setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
        // setNoteToEdit(prevBook => ({ ...prevBook, info:{...prevBook.info , title:target.value} }))
        setNoteToEdit(prevBook => ({ ...prevBook, info: fa }))
        // console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        console.log(noteToEdit)
        ev.preventDefault()
        onSetNewNote(noteToEdit)


    //     noteService.save(noteToEdit)
    //         .then(() => {
    //             showSuccessMsg('saved')
    //             navigate('/note')
    //             onSetNewNote(noteToEdit)
    //         })
    //         .catch(err => {
    //             console.log('Had issued in note edit:', err);
    //             showErrorMsg('Can not save note!')
    //         })
    }

    // const { type, title } = noteToEdit
    return (
        <section className="note-add">

            <form onSubmit={onSaveNote} >
                <label htmlFor="title">Title:</label>
                <input ref={inputRef} onChange={handleChange} type="text" name="title" id="title" />


                <button>add</button>
                {/* <button>{noteToEdit.id ? 'Save' : 'Add'}</button> */}
            </form>

        </section>
    )

}