



export function NotesList(notes){



   return (
   <section className="notes-container">
        {notes.map(note => 
             <article className="single-note">
                 {note}
                 {/* note preview */}
             </article>
            )}

    </section>
        )
}