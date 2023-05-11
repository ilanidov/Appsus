const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { UserMsg } from "./cmps/user-msg.jsx";

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
// import { NoteEdit } from "./apps/note/views/note-edit.jsx";
import { AddNote } from "./apps/note/views/add.note.jsx";



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />


                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/add" element={<AddNote/>}/>
                    {/* <Route path="/note/edit/:noteId" element={<NoteEdit/>}/> */}
            </Route>
                </Routes>


            <UserMsg />

        </section>
    </Router>
}
