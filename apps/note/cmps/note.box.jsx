
const { useEffect, useState, useRef } = React

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"




export function NoteBox() {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const inputRef = useRef()


    useEffect(() => {
        showSuccessMsg('Welcome to notes-app!')
    }, [])

    // function handleChange({ target }) {
    //     const field = target.name
    //     // const value = target.type === 'number' ? (+target.value || '') : target.value
    //     setNote(prevNote => ({ ...prevNote, [field]: target.value }))
    //     console.log(note)
    // }
    

    function onSaveNote(ev) {
        ev.preventDefault()
        const noteContent = inputRef.current.value
        setNote(noteContent)
        noteService.addNewNote(note)
        .then((res) => {
            showSuccessMsg('Note saved')
            console.log(res)
        })
        .catch(err => {
            console.log('Had issued in car edit:', err);
            showErrorMsg('Can not save car!')
        })
    }



    return (
        <section className="note-box-container">
            <section className="note-box">
                <form className="note-box-input" onSubmit={onSaveNote}  >
                    {/* <label htmlFor="noteTxtInput"></label> */}
                    <input  ref={inputRef} type="text" name="noteTxtInput" id="noteTxtInput" />
                    <button >Add</button>
                </form>




                <section className="note-box-icons">


                </section>


            </section>

        </section>





    )
}