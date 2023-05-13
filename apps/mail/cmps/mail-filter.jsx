const { useState, useEffect } = React

import { emailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter, filterBy }) {
    const [filterByEdit, setFilterByEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByEdit)
    }, [filterByEdit])

    return (

        <section className="side-filters">
            
            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: false })) }}>
                <button className='inbox-btn'></button>
                <h4>Inbox</h4>
            </article>

            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isStarred: true })) }}>
                <button className='starred-btn'>Starred</button>
            </article>

            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isRead: true })) }}>
                <button className='read-btn' >read</button>
            </article>

            <article  onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isSent: true })) }}>
                <button className='sent-btn'>sent</button>
            </article>

            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: true })) }}>
                <button className='trash-btn' >deleted</button>
            </article>

        </section>
    )
}