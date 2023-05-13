const { useState } = React
import { emailService } from "../services/mail.service.js"



export function EmailCompose({onSetNewCompose,setIsComposeShown}) {
    const [newMail, setNewMail] = useState(emailService.getEmptyEmail())
    console.log(newMail)

    function onSubmit(ev) { 
        ev.preventDefault()
        onSetNewCompose(newMail)
        setIsComposeShown(prevVal=>!prevVal)
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNewMail(prevMail => ({ ...prevMail, [field]: value, isSent:true }))
        console.log(newMail)
    }

    function onCloseComposeBtn(){
        setIsComposeShown(prevVal=>!prevVal)
    } 


    return (
        <div className='email-compose-container'>

            <header className="compose-header">
                <h1>New mail</h1>
                <button onClick={onCloseComposeBtn}>X</button>
            </header>

            <form onSubmit={onSubmit} className="compose-form" action="">

                <input name='to' onChange={handleChange} placeholder='to:' type="email" className="compose-to" />
                <input name='subject' onChange={handleChange} placeholder='subject:' type="text" className="compose-subject" />
                <textarea name='body' onChange={handleChange} className='compose-body'></textarea>

                <footer className="compose-footer">
                    <button className='compose-send-btn'>Send</button>
                </footer>

            </form>

        </div>
    )




}