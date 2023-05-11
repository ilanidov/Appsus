const { useEffect, useState } = React


export function EmailDetails({ onCloseMail, email }) {
    const [mail, setMail] = useState(email)





    if (!mail) return <div>Loading.....</div>

    return (
        <div>
            <div>{mail.from}</div>
            <div>{mail.subject}</div>
            <div>{mail.body}</div>

            <button onClick={() => onCloseMail()}>Back</button>
        </div>
    )
}