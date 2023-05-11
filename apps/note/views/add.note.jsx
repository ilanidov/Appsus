

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM


import { ColorInput } from "../cmps/color-input.jsx"

import { NotesList } from "../cmps/notes.list.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { AddTxtNote } from "../cmps/txt.note.jsx"
import { AddImageNote } from "../cmps/image.note.jsx"
import { AddTodoNote } from "../cmps/todos.note.jsx"


export function AddNote({ loadNotes }) {

    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: 'none',
        fontSize: '16px'
    })
    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const [cmpType, setCmpType] = useState('txt')

    useEffect(() => {
        loadNotes()
    }, [newNote])


    // function onSetFooterStyle(newStyle) {
    //     setFooterStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    // }

    function onSetNoteStyle(newStyle) {
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
        setNewNote(prevNote => ({ ...prevNote, style: noteStyle} ))
        // console.log(noteStyle)
    }
    
    function onSetNewNote(noteToEdit) {
        noteToEdit.style = noteStyle
        noteService.save(noteToEdit)
        .then(() => {
            setNewNote(noteToEdit)
                showSuccessMsg('saved')
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                showErrorMsg('Can not save note!')
            })
    }


    return (
        <section className="note-options">

            <select className="options" onChange={(ev) => { setCmpType(ev.target.value) }}>
                <option value="txt">txt</option>
                <option value="image">image</option>
                <option value="video">video</option>
                <option value="todos">todos</option>
            </select>
            <section>
        <ColorInput onSetNoteStyle={onSetNoteStyle} />
        </section>
            <DynamicCmp cmpType={cmpType} noteStyle={noteStyle} onSetNewNote={onSetNewNote} />

            {/* <AddTxtNote onSetNewNote={onSetNewNote} /> */}
        
        </section>
    )
}




function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'txt':
            return <AddTxtNote {...props} />
        case 'image':
            return <AddImageNote {...props} />
        case 'todos' :
            return < AddTodoNote {...props}  />

    }
}













