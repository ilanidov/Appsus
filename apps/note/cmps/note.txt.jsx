
const { useEffect, useState, useRef } = React

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"




export function NoteTxt() {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const inputRef = useRef()


    useEffect(() => {
        showSuccessMsg('Welcome to notes-app!')
    }, [])


//  function handleChange({ target }) {
//         const field = target.name
//         // console.log(field)
//         const value = target.type === 'number' ? (+target.value || '') : target.value
//         if (field === 'title') {
//             setNote(prevBook => ({ ...prevBook, info:{...prevBook.info , title:value} , }))

//         } else {
//             setNote(prevBook => ({ ...prevBook, [field]: value }))
//         }
//     }
    

    function onSaveNote(ev) {
        ev.preventDefault()
        const noteContent = inputRef.current.value
        // console.log(note)
        // console.log(noteContent)

            setNote(prevBook => ({ ...prevBook, info:{...prevBook.info , title:noteContent} , }))

        noteService.addNewNote(note)
        .then(() => {
            showSuccessMsg('Note saved')
            // setNote(noteContent)

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
                    <input  ref={inputRef}  type="text" name="title" id="title" />
                    <button >Add</button>
                </form>




                <section className="note-box-icons">


                </section>


            </section>

        </section>





    )
}