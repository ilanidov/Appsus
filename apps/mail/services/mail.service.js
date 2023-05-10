// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { localStorageService } from "../../../services/storage.service.js" 

const EMAIL_KEY = 'emailDB'

export const emailService = {
    getEmptyEmail,
    _createEmails,
    query
}

_createEmails()


function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     cars = cars.filter(car => regExp.test(car.vendor))
            // }

            // if (filterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            // }
            return emails
        })
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

function _createEmails() {
    const emails = [
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
        _createEmail(),
    ]
    
    localStorageService.saveToStorage(EMAIL_KEY, emails)
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
