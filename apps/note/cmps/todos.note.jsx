const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddTodoNote({ onSetNewNote }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('todo'))
    const inputRef = useRef()



    function handleChange(ev) {
        ev.preventDefault()
        const titleValue= ev.target[0].value
        setNoteToAdd(prevNote => ({...prevNote, info: { ...prevNote.info, title: titleValue } } ))
        // console.log(noteToAdd)


        
        const updatedInfo = noteToAdd.info
        const todoValue = { txt: ev.target[1].value, doneAt: 'time' }
        
       updatedInfo.todos.push(todoValue)
        // console.log(updatedInfo.todos)
        setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, todos: updatedInfo.todos } }))
        onSaveNote()
    }



    function onSaveNote() {
        // console.log(noteToAdd)
        onSetNewNote(noteToAdd)
    }


    // console.log(noteToAdd)

    return (
        <section className="todo-note-add-container">

            <form className="todo-note-add" onSubmit={handleChange} >
                <label className="" htmlFor="title">TO DO:</label>
                <input className="" ref={inputRef} type="text" name="title" id="title" placeholder="Title" />
                <br />
                <label className="" htmlFor="todo1"></label>
                <input className="" ref={inputRef} type="text" name="todo1" id="todo1" placeholder="todo1" />

                <label className="" htmlFor="todo2"></label>
                <input className="" ref={inputRef} type="text" name="todo2" id="todo2" placeholder="todo2" />

                {/* <label className="" htmlFor="todo3"></label> */}
                {/* <input className="" ref={inputRef} onChange={handleChange} type="text" name="todo3" id="todo3" placeholder="todo3" /> */}

                <button>add</button>
            </form>

        </section>
    )

}