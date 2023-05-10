// mail service
import { utilService } from "../../../services/util.service.js"

const EMAIL_KEY = 'emailDB'


export const emailService = {
    getEmptyEmail,
    _createEmails
}



// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }



function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'ilan@gmail.com',
        to: 'shira@gmail.com'
    }
}

function _createEmails(){
    const emails =[
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
    ]
    return emails
}

function _createEmail() {
    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.subject = utilService.makeLorem(5)
    email.body = utilService.makeLorem(15)
    email.sentAt = Date.now()

    return email
}
