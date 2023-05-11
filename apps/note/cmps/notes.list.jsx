
const { Link } = ReactRouterDOM

// import { CarPreview } from "./car-preview.jsx";

export function NotesList({ notes, onRemoveNote }) {
    return (
        <ul className="notes-list">
            {notes.map(note =>
                <li key={note.id}  style={note.style}>
                    {/* {console.log(note)} */}
                    {note.type === 'NoteTxt' && <h2>{note.info.title}</h2>}

                    {note.type === 'NoteImg' && <img src={note.info.url} alt=" cover" /> }

                    {note.type === 'NoteTodos' && 
                     <section>
                     <h2>{note.info.title}</h2> 
                    <ul className="note-todos">
                        {note.info.todos.map(todo =>
                    <section key={todo.txt+todo.doneAt}>
                        <li> {todo.txt} </li>
                  { todo.doneAt &&  <small>Done at: {todo.doneAt} </small> }      {/* CHECK BOX */}
                         </section>
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