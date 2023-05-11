const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { emailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"


export function MailIndex() {

    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [emails, setEmails] = useState([])

    useEffect(() => {
        loadEmails()
        showSuccessMsg('helooooo')
        // showSuccessMsg('Welcome to car index!')
        // setSearchParams(filterBy)
        // }, [filterBy])
    }, [])

    function loadEmails() {
        emailService.query().then(setEmails)
        // emailService.query(filterBy).then(cars => setCars(cars))
        // carService.query().then(setCars)
        console.log(emails)
    }

    function onDeleteEmail(emailId) {
        emailService.remove(emailId)
            .then(()=>{
                const updatedEmails= emails.filter(email=> email.id !== emailId)
                setEmails(updatedEmails)
            })
    }

    if (!emails || !emails.length) return <div> Loading ...</div>

    return (

        <div className='mail-layout'>
            <MailHeader />

            <div className="main-content flex">
                <MailFilter />
                <MailList onDeleteEmail={onDeleteEmail} emails={emails} />
            </div>

        </div>
    )
}

