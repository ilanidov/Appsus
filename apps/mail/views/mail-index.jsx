const { useEffect, useState } = React

import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { emailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { EmailDetails } from "../cmps/mail-details.jsx"

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [email, setEmail] = useState({})
    const [isShown, setIsShown] = useState(false)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());


    useEffect(() => {
        loadEmails()
        showSuccessMsg('')
    }, [email, filterBy])

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



    if (!emails || !emails.length) return <div> Loading ...</div>

    return (

        <div className='mail-layout'>
            <MailHeader onSetFilter={onSetFilter} filterBy={filterBy} />

            <div className="main-content flex">
                <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                {!isShown && <MailList onOpenMail={onOpenMail} onDeleteEmail={onDeleteEmail} emails={emails} />}
                {isShown && <EmailDetails onCloseMail={onCloseMail} email={email} />}
            </div>

        </div>
    )
}

