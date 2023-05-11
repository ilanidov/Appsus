const { useEffect, useState } = React


export function EmailDetails({ onCloseMail, email }) {
    // const [mail, setMail] = useState(email)


    if (!email) return <div>Loading.....</div>

    return (
        <div className="email-display">
            <div className="flex">
                <h1>{email.from} </h1>
                <button onClick={() => onCloseMail()}>Back</button>
            </div>

            <div>
                <h2> {email.subject}</h2>
                <h2>{email.sentAt}</h2>
            </div>

            <div>{email.body}</div>


        </div>
    )
}