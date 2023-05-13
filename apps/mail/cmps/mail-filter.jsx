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
                <button className='starred-btn'></button>
                <h4>Starred</h4>

            </article>

            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isRead: true })) }}>
                <button className='read-btn' ></button>
                <h4>Read</h4>

            </article>

            <article  onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isSent: true })) }}>
                <button className='sent-btn'></button>
                <h4>Sent</h4>

            </article>

            <article onClick={() => { setFilterByEdit(emailService.getDefaultFilter({ isDeleted: true })) }}>
                <button className='trash-btn' ></button>
                <h4>Deleted</h4>

            </article>

        </section>
    )
}