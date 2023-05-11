const { Link } = ReactRouterDOM
const { useEffect, useState } = React



export function MailList({ emails, onDeleteEmail, onOpenMail }) {
    const [isRead, setIsRead] = useState(false)
    // const [isShownx, setIsShownx] = useState(false)

    function handleOpenMail(email) {
        setIsRead(true)
        onOpenMail(email)
    }

    const dynReadClass = isRead ? '' : "is-read"




    return (
        <div className="mails-container">
            {emails.map(email => {
                return (
                    <div>
                        <div onClick={() => handleOpenMail(email)} key={email.id} className={`email-container flex ${dynReadClass}`}>
                            <section className="markings">
                                <span className="star">⭐</span>
                                <span className="star">☑</span>
                            </section>
                            <h3>{email.from}</h3>
                            <h3>{email.subject}</h3>
                            <h4>{email.body}</h4>
                            <span>{email.sentAt}</span>
                            <div className="email-btns">
                                <button onClick={() => onDeleteEmail(email.id)}>X</button>
                                <button>RE</button>
                                {/* <button onClick={() => handleOpenMail(email)}>Open</button> */}
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )


}
