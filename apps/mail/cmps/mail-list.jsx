

export function MailList({ emails, onDeleteEmail, onOpenMail }) {

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

    return (
        <div className="mails-container">
            {emails.map(email => {
                const dynReadClass = email.isRead ? '' : "is-read"
                const timePass = addTimeAgo(email)
                console.log(timePass)
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
                            <span>{timePass}</span>
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
