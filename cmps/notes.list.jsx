



export function NotesList({ notes }) {
    console.log(notes)


    return (
        <ul className="notes-list">
            {notes.map(note =>
                <li key={note.id}>
                    {note.info.title}
                </li>
            )}

        </ul>
    )

}