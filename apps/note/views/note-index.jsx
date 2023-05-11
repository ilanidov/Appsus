const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM



import { NotesList } from "../cmps/notes.list.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { showSuccessMsg , showErrorMsg} from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { AddNote } from "./add.note.jsx"

export function NoteIndex(){


    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [notes, setNotes] = useState([])
    // const [newNote , setNewNote ] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect( ()=> {
        loadNotes()
        showSuccessMsg('Welcome to notes!')
        setSearchParams(filterBy)

    }, [] )

    // useEffect(() => {
    //     loadNotes()
    // }, [newNote])

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
        // carService.query().then(setCars)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note (${noteId}) removed!`)
        })

    }


    // function onSetNewNote(noteToEdit) {
    //         noteService.save(noteToEdit)
    //             .then(() => {
    //                 setNewNote(noteToEdit)
    //                 showSuccessMsg('saved')
    //                 navigate('/note')
    //                 // onSetNewNote(noteToEdit)
    //             })
    //             .catch(err => {
    //                 console.log('Had issued in note edit:', err);
    //                 showErrorMsg('Can not save note!')
    //             })
    //     console.log(newNote)
    // }

    // console.log('render');
    return (
        <section className="note-index ">
            {/* <NotesFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
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
