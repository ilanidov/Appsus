
const { Link } = ReactRouterDOM

// import { CarPreview } from "./car-preview.jsx";

export function NotesList({ notes, onRemoveNote }) {


    function addTimeAgo(todo) {
        const now = new Date().getTime()
        const timestamp = todo.doneAt
        const diff = now - timestamp
        const minute = 60 * 1000
        const hour = 60 * minute
        const day = 24 * hour
        let timeAgo

        if (diff < minute) {
            timeAgo = Math.floor(diff / 1000) + " seconds ago"
        } else if (diff < hour) {
            timeAgo = Math.floor(diff / minute) + " minutes ago"
        } else if (diff < day) {
            timeAgo = Math.floor(diff / hour) + " hours ago"
        } else {
            timeAgo = Math.floor(diff / day) + " days ago"
        }
        return timeAgo
    }




    return (
        <ul className="notes-list">
            {notes.map(note =>
                <li key={note.id} style={note.style}>

                    {note.type === 'noteTxt' && 
                    <section>
                        <h2>{note.info.title}</h2>
                        <p>{note.info.content} </p>
                    </section>}

                    {note.type === 'noteImg' && <img src={note.info.url} alt="Note image" />}

                    {note.type === 'noteTodos' &&
                        <section>
                            <h2>{note.info.title}</h2>
                            <ul className="note-todos">
                                {note.info.todos.map((todo, idx) => {
                                    const timePass = addTimeAgo(todo)
                                    return (
                                        <section key={idx}>
                                            <li> {todo.txt} </li>
                                            {todo.doneAt && <small>Done at: {timePass} </small>}      {/* CHECK BOX */}
                                        </section>
                                    )
                                }
                                )}

                            </ul>
                        </section>
                    }
                    <section>
                        <button onClick={() => onRemoveNote(note.id)} >Remove</button>
                        <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}











// export function NotesList({ notes }) {
//     console.log(notes)


//     return (
//         <ul className="notes-list">
//             {notes.map(note =>
//                 <li key={note.id}>
//                     {note.info.title}
//                 </li>
//             )}

//         </ul>
//     )

// }