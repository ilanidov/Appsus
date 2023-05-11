



export function MailList({ emails, onDeleteEmail }) {

    



    return (
        <div className="mails-container">
            {emails.map(email => {
                return (
                    <div key={email.id} className="email-container flex">
                        <span className="star"></span>
                        <h1>{email.from}</h1>
                        <h4>{email.body}</h4>
                        <span>{email.sentAt}</span>
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
