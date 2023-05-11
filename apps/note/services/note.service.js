// note service


import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const NOTES_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getNextCarId,
    addNewNote
}

function addNewNote(userNote) {
    console.log(userNote)
    const note = {
        createdAt: 2023,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: userNote }
    }
    // console.log(note)
    return storageService.post(NOTES_KEY, note)

}


function getEmptyNote(type) {

    switch (type ) {
        case 'txt':
        return {
            createdAt:2023,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                title: ''
            }
    }

    case 'image':
        return {
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: {
                    backgroundColor: '#00d'
                }
        }

    }

}



function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(NOTES_KEY)
    .then(notes => {
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            notes = notes.filter(car => regExp.test(book.info.title))
        }

        // if (filterBy.type) {
        //     notes = notes.filter(car => car.maxSpeed >= filterBy.minSpeed)
        // }
        return notes
    })
}

function get(carId) {
    return storageService.get(NOTES_KEY, carId)
    // return axios.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(NOTES_KEY, carId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getNextCarId(carId) {
    return storageService.query(NOTES_KEY)
        .then((cars) => {
            let carIdx = cars.findIndex(car => car.id === carId)
            if (carIdx === cars.length - 1) carIdx = -1
            return cars[carIdx + 1].id
        })
}



function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        title: searchParams.get('title') || '',
        type: searchParams.get('type') || ''
    }
}

function _createNotes() {
    let notes = localStorageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        const notes = _createDemoNote()
        localStorageService.saveToStorage(NOTES_KEY, notes)
    }
}

function _createDemoNote() {

    const demoNotes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                title: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        } ,
        {
            id: 'n104',
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Pet details',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        } ,
        {
            id: 'n105',
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Monday',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        } ,
        {
            id: 'n106',
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Sunday',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        } ,

    ]
    return demoNotes
}