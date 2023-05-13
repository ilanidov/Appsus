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
    addTimeAgo,
    showTxt
}

_createEmails()

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY).then(emails => {

        switch (true) {

            case filterBy.isSent: {
                emails = emails.filter((mail) => mail.isSent)
                break
            }

            case filterBy.isRead: {
                emails = emails.filter((mail) => mail.isRead)
                break
            }

            case filterBy.isStarred: {
                emails = emails.filter((mail) => mail.isStarred)
                console.log('hi')
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
            default: {
                emails = emails.filter((mail) => (!mail.isSent))
                break
            }
        }

        return emails
    })
}


function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
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
        sentAt: Date.now(),
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


        const emails = [



            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Youtube',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'ChatGPT',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Amazon',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Github',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Amazon',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Youtube',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Book Depository',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Bank Yahav',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Bank',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Post Service',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Credit Score',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'JP-Morgan',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
            {
                id: utilService.makeId(),
                subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 3)),
                body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 30)),
                sentAt: Date.now() - (1000 * 60 * 60 * utilService.getRandomIntInclusive(10, 25)),
                removedAt: null,
                from: 'Google',
                sendersEmail: (Math.random() > 0.5) ? 'shira@gmail.com' : 'ilan@walla.com',
                to: 'shira@gmail.com',
                isRead: (Math.random() > 0.8),
                isSent: (Math.random() > 0.8),
                isStarred: (Math.random() > 0.8),
                isDeleted: false
            },
        ]
        localStorageService.saveToStorage(EMAIL_KEY, emails)

    }
    return emails
}

// function _createEmail() {
//     const email = getEmptyEmail()
//     email.id = utilService.makeId()
//     email.subject = utilService.makeLorem(2)
//     email.body = utilService.makeLorem(15)
//     email.sentAt = Date.now()
//     return email
// }

function showTxt(text, wordCount) {
     return text.substr(0, text.lastIndexOf(' ', wordCount))
  }

function getDefaultFilter(filterBy) {
    const defaultFilter = {
        txt: '',
        sentAt: null,
        removedAt: null,
        isRead: false,
        isSent: false,
        isStarred: false,
        isDeleted: false,
        sentAt: Date.now()
    }
    return { ...defaultFilter, ...filterBy }
}

function addTimeAgo(email) {
    const now = new Date().getTime()
    const timestamp = email.sentAt
    const diff = now - timestamp
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    let timeAgo

    if (diff < minute) {
        timeAgo = Math.floor(diff / 1000) + " seconds ago"
    } else if (diff < hour) {
        timeAgo = Math.floor(diff / minute) + " minutes ago"
    } else if (diff < day) {
        timeAgo = Math.floor(diff / hour) + " hours ago"
    } else {
        timeAgo = Math.floor(diff / day) + " days ago"
    }
    return timeAgo
}

