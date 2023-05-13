const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { noteService } from "../services/note.service.js"


export function AddTodoNote({ onSetNewNote, noteStyle }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote('todo'))
    const [todo, setTodo] = useState({txt:'', doneAt:''})
    const [isTodosShown, setIsTodosShown] = useState(false)



    const inputRefTitle = useRef()
    const inputRefContent = useRef()
    console.log(noteToAdd)



    function handleChange({ target }) {
        setNoteToAdd(prevNote => ({ ...prevNote, style: noteStyle }))

        const field = target.name
        const value = target.value
        // console.log(value)
        // console.log(field)
        if (field === 'title')
            setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))

        if (field === 'todo-content') {
            let currValue = ''
            currValue += value
            console.log(currValue)
            setTodo({ txt: currValue, doneAt: new Date().getTime() })
            console.log(todo)
        }
    }

    function onAddTodo() {
        if (!todo.txt || todo.txt === '') return
        setIsTodosShown(true)
        setNoteToAdd(prevNote => ({
            ...prevNote, info:
                { ...prevNote.info, todos: [...prevNote.info.todos, todo] }
        }))
        inputRefContent.current.value = ''
    }

    function onCancelTodo(){
        setIsTodosShown(false)
        clearInput()
        setTodo('')
        setNoteToAdd(noteService.getEmptyNote('todo'))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        onSetNewNote(noteToAdd)
        setTimeout(() => {
            clearInput()
            setIsTodosShown(false)
        }, 3500);
    }


    // setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))


    // doneAt: new Date().getTime()


    function clearInput() {
        inputRefTitle.current.value = ''
        inputRefContent.current.value = ''

    }


    return (
        <section className="todo-note-add-container">

            <form className="todo-note-add" style={noteStyle} onSubmit={onSaveNote}>
                <label className="" htmlFor="title" >TO DO:</label>
                <input className="todo-input txt-input" onChange={handleChange} ref={inputRefTitle} type="text" name="title" id="title" placeholder="Title" />

                <label className="" htmlFor="todo-content"> </label>
                <input className="txt-input todo-input-content" onChange={handleChange} ref={inputRefContent} type="text" name="todo-content" id="todo-content" placeholder="Todo" />


                {isTodosShown && <section>
                <ul> 
                    {noteToAdd.info.todos.map(todo => <li key={todo.txt}>{todo.txt}</li>)}
                </ul>
                    <button className="cancel-todo-btn" onClick={onCancelTodo} >Close</button>

                

                </section>
                }

                <button className="add-btn-todo">add</button>
            </form>

            <button className="plus-btn" onClick={onAddTodo} >+</button>

        </section>
    )
}