const { useEffect, useState } = React


export function EmailDetails({ onCloseMail, email }) {
    // const [mail, setMail] = useState(email)


    if (!email) return <div>Loading.....</div>

    return (
        <div>
            <div>{email.from}</div>
            <div>{email.subject}</div>
            <div>{email.body}</div>

            <button onClick={() => onCloseMail()}>Back</button>
        </div>
    )
}