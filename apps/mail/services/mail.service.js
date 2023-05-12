// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { localStorageService } from "../../../services/storage.service.js"

const EMAIL_KEY = 'emailDB'

export const emailService = {
    getEmptyEmail,
    _createEmails,
    query,
    getDefaultFilter,
    remove,
    get,
    save,
}

_createEmails()

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY).then(emails => {

        switch (true) {

           

            case filterBy.isRead: {
                emails = emails.filter((mail) => mail.isRead)
                break
            }

            case filterBy.isStared: {
                emails = emails.filter((mail) => mail.isStared)
                break
            }



            default: {
                emails = emails.filter((mail) => !mail.removedAt)
                break
            }

            case filterBy.txt !== undefined: {

                const filterText = filterBy.txt.toLowerCase()

                const checkedEmails = emails.filter(
                    (mail) =>
                        mail.body.toLowerCase().includes(filterText) ||
                        mail.subject.toLowerCase().includes(filterText) ||
                        mail.from.toLowerCase().includes(filterText)
                )

                if (!checkedEmails || !checkedEmails.length) return emails
                else return checkedEmails

            }
        }

        return emails
    })
}


function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
    // return axios.get(CAR_KEY, carId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(EMAIL_KEY, mail)
    } else {
        return storageService.post(EMAIL_KEY, mail)
    }
}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        sentAt: null,
        removedAt: null,
        from: 'google',
        sendersEmail: 'momo@momo.com',
        to: 'shira@gmail.com',
        isRead: false,
        isSent: false,
        isStarred: false,
        isDeleted: false
    }
}

function _createEmails() {
    let emails = localStorageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {

        emails = [
            _createEmail(),
            _createEmail(),
            _createEmail(),
            _createEmail(),
            _createEmail(),
            _createEmail(),
            _createEmail(),
        ]
        localStorageService.saveToStorage(EMAIL_KEY, emails)
    }

    return emails
}

function _createEmail() {

    const email = getEmptyEmail()
    email.id = utilService.makeId()
    email.subject = utilService.makeLorem(2)
    email.body = utilService.makeLorem(15)
    email.sentAt = Date.now()

    return email
}

function getDefaultFilter(filterBy) {
    const defaultFilter = {
        txt: '',
        sentAt: null,
        removedAt: null,
        isRead: false,
        isSent: false,
        isStarred: false,
        isDeleted: false
    }
    return { ...defaultFilter, ...filterBy }
}
