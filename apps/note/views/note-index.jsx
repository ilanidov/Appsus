const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM



import { NotesList } from "../cmps/notes.list.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { AddNote } from "./add.note.jsx"
import { NotesFilter } from "../cmps/note.filter.jsx"

export function NoteIndex() {


    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [notes, setNotes] = useState([])
    // const [newNote , setNewNote ] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()


    // useEffect(() => {
    //     console.log('hi')
    //     showSuccessMsg('Welcome to notes!')
    // }, [])


    useEffect(() => {
        loadNotes()
        setSearchParams(filterBy)

    }, [filterBy])


    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note removed!`)
        })

    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <section className="note-index">
            <NotesFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <AddNote loadNotes={loadNotes} />
            <NotesList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}






















// export function NoteIndex() {

//     const [notes, setNotes] = useState([])

//     useEffect(() => {
//         loadNotes()
//         showSuccessMsg('Welcome to book index!')
//     }, [])



//     function loadNotes() {
//         noteService.query().then(notes => {
//             setNotes(notes)
//             console.log(notes)
//         })

//         // carService.query().then(setCars)    <---   SHORT WAY
//     }

//     console.log(notes)
//     if (!notes || !notes.length) return <div>Loading...</div>

//     return (
//     <div>
//         note app
//         <br />
//         <NoteBox />
//         <NotesList notes={notes}/>

//     </div>
//     )
// }
