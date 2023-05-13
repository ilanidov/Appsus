const { useEffect, useState } = React

import { emailService } from "../services/mail.service.js"


export function MailList({ emails, onDeleteEmail, onOpenMail }) {

    const [currEmails, setCurrEmails] = useState(emails)

    function handleOpenMail(email) {
        email.isRead = true
        onOpenMail(email)
    }

    function addTimeAgo(email) {
        const now = new Date().getTime()
        const timestamp = email.sentAt
        const diff = now - timestamp
        const minute = 60 * 1000
        const hour = 60 * minute
        const day = 24 * hour
        let timeAgo

        if (diff < minute) {
            timeAgo = Math.floor(diff / 1000) + " seconds ago"
        } else if (diff < hour) {
            timeAgo = Math.floor(diff / minute) + " minutes ago"
        } else if (diff < day) {
            timeAgo = Math.floor(diff / hour) + " hours ago"
        } else {
            timeAgo = Math.floor(diff / day) + " days ago"
        }
        return timeAgo
    }

    function onHandleStarred(email) {
        if (email.isStarred) email.isStarred = false
        else email.isStarred = true
        emailService.save(email)
        setCurrEmails((prevMails) => prevMails.map((currMail) => (currMail.id === email.id ? email : currMail)))
    }

    return (
        <div className="mails-container">
            {emails.map(email => {

                const dynReadClass = email.isRead ? '' : "is-read"
                const dynStarStyle = email.isStarred ? { color: 'yellow' } : {}
                const timePass = addTimeAgo(email)
                return (
                    <div key={email.id} className={`email-container ${dynReadClass}`}>

                        <section className="markings">
                            <input type="checkbox" />
                            <i className={`fa-regular fa-star`} style={dynStarStyle} onClick={() => onHandleStarred(email)}></i>
                        </section>

                        <section onClick={() => handleOpenMail(email)} className="email-content">
                            <h3 title={email.from}>{email.from}</h3>
                            <h3 title={email.subject}>{email.subject}</h3>
                            <h4 title={email.body}>{email.body}</h4>
                            <span>{timePass}</span>
                        </section>

                        <div className="email-btns">
                            <button onClick={() => onDeleteEmail(email.id)}>X</button>
                            <button>RE</button>
                        </div>

                    </div>

                )
            })}
        </div>
    )
}
