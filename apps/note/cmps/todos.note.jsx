const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTodoNote({ }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('todo'))
    const inputRef = useRef()

    console.log(noteToAdd)
    // // useEffect(() => {
    // //     onSetNewNote(noteToEdit)
    // // }, [noteToEdit])

    // // setbookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value }, }))


    // setNoteToAdd(prevNote => ({ ...prevNote, info: {...prevNote.info , title: target.value} }))


    function handleChange({ target }) {
        const field = target.name
        // console.log(field)
        // const value = target.type === 'number' ? (+target.value || '') : target.value
        if (field === 'title') {
            setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, title: target.value } }))
            console.log(noteToAdd)
            } else if (field === 'todo1') {
            setNoteToAdd(prevNote => ({ ...prevNote, info: {...prevNote.info , todos:{...prevNote.info.todos , }   } }))
        }
    }  




    function onSaveNote(ev) {
        // console.log(noteToEdit)
        ev.preventDefault()
        // onSetNewNote(noteToAdd)
    }

    return (
        <section className="todo-note-add-container">

            <form className="todo-note-add" onSubmit={onSaveNote} >
                <label className="" htmlFor="title">TO DO:</label>
                <input className="" ref={inputRef} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" />
                <br />
                <label className="" htmlFor="todo1"></label>
                <input className="" ref={inputRef} onChange={handleChange} type="text" name="todo1" id="todo1" placeholder="todo1" />

                <label className="" htmlFor="todo2"></label>
                <input className="" ref={inputRef} onChange={handleChange} type="text" name="todo2" id="todo2" placeholder="todo2" />

                {/* <label className="" htmlFor="todo3"></label> */}
                {/* <input className="" ref={inputRef} onChange={handleChange} type="text" name="todo3" id="todo3" placeholder="todo3" /> */}

                <button>add</button>
            </form>

        </section>
    )

}