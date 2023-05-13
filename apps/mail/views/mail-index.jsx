const { useEffect, useState } = React

import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { emailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { EmailDetails } from "../cmps/mail-details.jsx"
import { EmailCompose } from "../cmps/mail-compose.jsx"

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

    const [isShown, setIsShown] = useState(false)
    const [email, setEmail] = useState({})

    const [isComposeShown, setIsComposeShown] = useState(false)
    const [newCompose, setNewCompose] = useState(emailService.getEmptyEmail())


    useEffect(() => {
        loadEmails()
        showSuccessMsg('')
        // }, [email, filterBy])
    }, [filterBy])

    function onSetNewCompose(mail) {
        emailService.save(mail).then(() => {
            console.log(mail)
            setNewCompose(mail)
            showSuccessMsg('Mail sent!')
        })
            .catch(err => {
                console.log('Had issued in mail edit:', err);
                showErrorMsg('Can not save mail!')
            })

    }


    function loadEmails() {
        emailService.query(filterBy).then(setEmails)
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }

    function onDeleteEmail(emailId) {
        emailService.remove(emailId)
            .then(() => {
                const updatedEmails = emails.filter(email => email.id !== emailId)
                setEmails(updatedEmails)
            })
    }

    function onOpenMail(currMail) {
        setIsShown(prevState => !prevState)
        emailService.save(currMail)
            .then(() => {
                setEmail(currMail)
            })
            .catch(err => {
                console.log('Had issued in mail edit:', err);
                showErrorMsg('Can not save mail!')
            })
    }


    function onCloseMail() {
        setIsShown(prevState => !prevState)
    }

    function onComposeNewMail() {
        setIsComposeShown(isCompose => !isCompose)
    }



    if (!emails || !emails.length) return <div> Loading ...</div>

    return (

        <div className='mail-layout'>
            <MailHeader onSetFilter={onSetFilter} filterBy={filterBy} />

            <div className="mail-main-content flex">
                <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                {!isShown && <MailList onOpenMail={onOpenMail} onDeleteEmail={onDeleteEmail} emails={emails} />}
                {isShown && <EmailDetails onCloseMail={onCloseMail} email={email} />}
            </div>
            {isComposeShown && <EmailCompose onSetNewCompose={onSetNewCompose} setIsComposeShown={setIsComposeShown} />}
            <button onClick={onComposeNewMail} className='mail-compse-btn'></button>
        </div>
    )
}

