
const { Link } = ReactRouterDOM


// import { CarPreview } from "./car-preview.jsx";

export function NotesList({ notes, onRemoveNote }) {
    return (
        <ul className="notes-list">
            {notes.map(note =>
                <li key={note.id}>
                    {console.log(note)}
                    {(note.type === 'NoteTxt') && note.info.title}
                    {(note.type === 'NoteImg') && <img src={note.info.url} alt=" cover" /> }
                    {(note.type === 'NoteImg')}

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