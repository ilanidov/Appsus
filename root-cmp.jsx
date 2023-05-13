const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { UserMsg } from "./cmps/user-msg.jsx";

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { AddNote } from "./apps/note/views/add.note.jsx";
import { EmailDetails } from "./apps/mail/cmps/mail-details.jsx";

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                {/* <Route path="/mail/:emailId" element={<EmailDetails />} /> */}

                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/add" element={<AddNote />} />
                </Route>
            </Routes>

            <UserMsg />
        </section>
    </Router>
}
