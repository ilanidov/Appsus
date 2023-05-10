
const { useEffect, useState, useRef } = React


export function NoteBox() {
    const [note , setNote] = useState()
    const inputRef = useRef()





    function onSaveNote(ev) {
        ev.preventDefault()
        // console.log(inputRef.current.value)
        const noteContent = inputRef.current.value
        setNote(noteContent)
        console.log(noteContent)


    }



    return (
        <section className="note-box-container">
            <section className="note-box">
                <form className="note-box-input" onSubmit={onSaveNote}  >
                    {/* <label htmlFor="noteTxtInput"></label> */}
                    <input  ref={inputRef} type="text" name="noteTxtInput" id="noteTxtInput" />
                <button >Add</button>
                </form>




                <section className="note-box-icons">


                </section>


            </section>

        </section>





    )
}