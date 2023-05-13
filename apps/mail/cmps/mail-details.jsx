
import { emailService } from "../services/mail.service.js"

export function EmailDetails({ onCloseMail, email }) {


    if (!email) return <div>Loading.....</div>

    return (
        <div className="email-display">

            <div className="flex mail-detail-header">
                <h1>{email.from} </h1>
                <button className='back-btn' onClick={() => onCloseMail()}></button>
            </div>

            <div className="mail-sub-header">
                <h2> {email.subject}</h2>
                <h2>{emailService.addTimeAgo(email)}</h2>
            </div>

            <div className="mail-detail-body">{email.body}</div>


        </div>
    )
}