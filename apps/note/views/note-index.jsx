const { useEffect, useState } = React



import { NotesList } from "../../../cmps/notes.list.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteBox } from "../cmps/note.box.jsx"
import { noteService } from "../services/note.service.js"






export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
        showSuccessMsg('Welcome to book index!')
        console.log(notes)
    }, [])




    function loadNotes() {
        noteService.query().then(notes => setNotes(notes))
        // carService.query().then(setCars)    <---   SHORT WAY
    }


    return <div>
        note app
        <br />
        <NoteBox />
        {/* <NotesList /> */}

    </div>
}
