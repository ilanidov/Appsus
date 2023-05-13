const { useState, useEffect } = React

import { emailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByEdit, setFilterByEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByEdit)
    }, [filterByEdit])

    return (

        <section className="side-filters">
            {/* <button className="fa-regular fa-inbox" onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: false })) }}></button> */}
            {/* <button onClick={() => {}}>Compose</button> */}
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: false })) }}>Inbox</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isStarred: true })) }}>Starred</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isRead: true })) }}>read</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isSent: true })) }}>sent</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: true })) }}>deleted</button>
        </section>
    )
}