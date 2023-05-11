const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { emailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { EmailDetails } from "../cmps/mail-details.jsx"

export function MailIndex() {
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [emails, setEmails] = useState([])
    const [email, setEmail] = useState({})
    const [isShown, setIsShown] = useState(false)
    console.log(isShown)

    useEffect(() => {
        loadEmails()
        showSuccessMsg('helooooo')
        // setSearchParams(filterBy)
        // }, [filterBy])
    }, [])

    useEffect(() => {
        loadEmails()
        showSuccessMsg('')
        // setSearchParams(filterBy)
        // }, [filterBy])
    }, [email])

    function loadEmails() {
        emailService.query().then(setEmails)
        // emailService.query(filterBy).then(cars => setCars(cars))
        // carService.query().then(setCars)
        console.log(emails)
    }

    function onDeleteEmail(emailId) {
        emailService.remove(emailId)
            .then(() => {
                const updatedEmails = emails.filter(email => email.id !== emailId)
                setEmails(updatedEmails)
            })
    }

    function onOpenMail(email) {
        console.log(email)
        // console.log(state)
        setIsShown(prevState => !prevState)
        setEmail(email)
    }

    function onCloseMail(){
        setIsShown(prevState => !prevState)
    }



    if (!emails || !emails.length) return <div> Loading ...</div>

    return (

        <div className='mail-layout'>
            <MailHeader />

            <div className="main-content flex">
                <MailFilter />
                {!isShown && <MailList onOpenMail={onOpenMail} onDeleteEmail={onDeleteEmail} emails={emails} />}
                {/* {!isShown && <MailList isShown={isShown} setIsShown={setIsShown} onDeleteEmail={onDeleteEmail} emails={emails} />} */}
                {isShown && <EmailDetails onCloseMail={onCloseMail} email={email} />}
            </div>

        </div>
    )
}

