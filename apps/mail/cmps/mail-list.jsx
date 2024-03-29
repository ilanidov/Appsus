const { useEffect, useState } = React

import { emailService } from "../services/mail.service.js"


export function MailList({ emails, onDeleteEmail, onOpenMail }) {
    const [currEmails, setCurrEmails] = useState(emails)


    function handleOpenMail(email) {
        email.isRead = true
        onOpenMail(email)
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
                const timePass = emailService.addTimeAgo(email)
                const bodyAdjust = emailService.showTxt(email.body,90)
                const subjectAdjust = emailService.showTxt(email.subject,20)
                return (
                    <div key={email.id} className={`email-container ${dynReadClass}`}>

                        <section className="markings">
                            <input type="checkbox" />
                            <i className={`fa-regular fa-star`} style={dynStarStyle} onClick={() => onHandleStarred(email)}></i>
                        </section>

                        <section onClick={() => handleOpenMail(email)} className="email-content">
                            <h3 className="mail-from-header" title={email.from}>{email.from}</h3>
                            <h3 className="mail-from-subject" title={email.subject}>{subjectAdjust}</h3>
                            <h4 className="mail-from-body" title={email.body}>{bodyAdjust}</h4>
                            <span>{timePass}</span>
                        </section>

                        <div className="email-btns">
                            <button className='trash-mail-btn' onClick={() => onDeleteEmail(email.id)}></button>
                            {/* <button>RE</button> */}
                        </div>

                    </div>

                )
            })}
        </div>
    )
}
