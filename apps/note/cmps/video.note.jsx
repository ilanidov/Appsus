
const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"


export function AddVideoNote({ onSetNewNote, noteStyle }) {

    const [isVideoPLayed, setIsVideoPLayed] = useState(false)
    const [videoSearch, setVideoSearch] = useState('')
    const [videoNote, setVideoNote] = useState(noteService.getEmptyNote('video'))

    function handleChange({ target }) {
        const value = target.value
        setVideoSearch(value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log(videoSearch)
        noteService.getVideo(videoSearch) 
            .then(res => {
                const currUrl = res.items[0].id.videoId
                console.log(currUrl)
                setVideoNote(prevVideoNote => ({ ...prevVideoNote, info: currUrl }))
            }).then(() => {
                console.log(videoNote)
                onSetNewNote(videoNote)
                setIsVideoPLayed(true)
            })

    }


    return (
        <section className="video-note-container">

            <form className="video-note" style={noteStyle} onSubmit={onSubmit} >

                <label className="" htmlFor="url"></label>

                <input className="video-note-input" onChange={handleChange} type="text" name="url" id="url" placeholder="Search anything" />
                <button className="add-video-btn">Search</button>

            </form>

            {isVideoPLayed &&
                <iframe className="main-video" src={`https://www.youtube.com/embed/${videoNote.info.url}`}
                    frameBorder="0">
                </iframe>
            }


        </section>



    )
}

