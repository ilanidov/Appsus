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
        backgroundColor: '#f7f7f7',
        fontSize: '16px'
    })

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const [cmpType, setCmpType] = useState('txt')

    useEffect(() => {
        loadNotes()
    }, [newNote])

    function onSetNoteStyle(newStyle) {
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
        setNewNote(prevNote => ({ ...prevNote, style: noteStyle }))
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
        <section className="add-note-container">
            <DynamicCmp cmpType={cmpType} noteStyle={noteStyle} onSetNewNote={onSetNewNote} />

            <section className="note-buttons">
                <ColorInput onSetNoteStyle={onSetNoteStyle} />

                <select className="choose-note-type" onChange={(ev) => { setCmpType(ev.target.value) }}>
                    <option value="txt">Choose note type</option>
                    <option value="txt">Txt</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="todos">Todos</option>
                </select>
            </section>

        </section>
    )
}




function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'txt':
            return <AddTxtNote {...props} />
        case 'image':
            return <AddImageNote {...props} />
        case 'todos':
            return < AddTodoNote {...props} />

    }
}













