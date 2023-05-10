



export function MailList({emails}) {





    return (
        <div className="mails-container">
            {emails.map(email=>{
                return(
                    <div className="email-container flex">
                        <span className="star"></span>
                        <h1>{email.from}</h1>
                        <h4>{email.body}</h4>
                        <span>{email.sentAt}</span>

                    </div>
                )
            })}
        </div>
    )


}
