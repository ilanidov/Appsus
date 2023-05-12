const { useState, useEffect } = React

import { emailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByEdit, setFilterByEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByEdit)
    }, [filterByEdit])

    return (
        
        <section className="">
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: false })) }}>Inbox</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isRead: true })) }}>read</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isSent: true })) }}>sent</button>
            <button onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: true })) }}>deleted</button>
        </section>
    )
}