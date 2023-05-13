// note service


import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

// import {} from '../../../assets/img/mazda.jpg'

const NOTES_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    // getNextCarId,
    addNewNote
}

function addNewNote(userNote) {
    console.log(userNote)
    const note = {
        createdAt: 2023,
        type: 'noteTxt',
        isPinned: true,
        // style: { backgroundColor: '' },
        info: { title: userNote }
    }
    // console.log(note)
    return storageService.post(NOTES_KEY, note)

}


function getEmptyNote(type) {

    switch (type) {
        case 'txt':
            return {
                createdAt: 2023,
                type: 'noteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#f7f7f7'
                },
                info: {
                    title: '',
                    content: ''
                }
            }

        case 'image':
            return {
                type: 'noteImg',
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: {
                    backgroundColor: '#f7f7f7'
                }
            }

            case 'todo':
                return {
                    type: 'noteTodos',
                    isPinned: false,
                    style: {
                        backgroundColor: '#f7f7f7'
                    },
                    info: {
                        title: '',
                        todos: []
                    }}
    }
}


// add return for 'all' option
function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            // console.log(filterBy)
            
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            
            if (filterBy.type === 'all') return notes
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

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

// function getNextCarId(carId) {
//     return storageService.query(NOTES_KEY)
//         .then((cars) => {
//             let carIdx = cars.findIndex(car => car.id === carId)
//             if (carIdx === cars.length - 1) carIdx = -1
//             return cars[carIdx + 1].id
//         })
// }



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
            type: 'noteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#f7f7f7'
            },
            info: {
                title: 'Fullstack Me Baby!',
                content: 'Hello'
            }
        },
        {
            id: 'n102',
            type: 'noteImg',
            isPinned: false,
            info: {
                url: '../../../assets/img/mazda.jpg',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#f7f7f7'
            }
        },
        {
            id: 'n103',
            type: 'noteTodos',
            isPinned: false,
            style: {
                backgroundColor: '#f7f7f7'
            },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: new Date().getTime() },
                    { txt: 'Coding power', doneAt: new Date().getTime() }
                ]
            }
        },
        {
            id: 'n104',
            type: 'noteTodos',
            isPinned: false,
            style: {
                backgroundColor: '#f7f7f7'
            },
            info: {
                title: 'Pets',
                todos: [
                    { txt: 'Clean their beds', doneAt: new Date().getTime() },
                    { txt: 'Long walk', doneAt: new Date().getTime() }
                ]
            }
        },
        {
            id: 'n105',
            type: 'noteTodos',
            isPinned: false,
            style: {
                backgroundColor: '#f7f7f7'
            },
            info: {
                title: 'Monday',
                todos: [
                    { txt: 'Gym', doneAt: new Date().getTime() },
                    { txt: 'Call the bank', doneAt: new Date().getTime() }
                ]
            }
        },
        {
            id: 'n106',
            type: 'noteTodos',
            isPinned: false,
            style: {
                backgroundColor: '#f7f7f7'
            },
            info: {
                title: 'Sunday',
                todos: [
                    { txt: 'Guitar lesson', doneAt: new Date().getTime() },
                    { txt: 'Shoping', doneAt: new Date().getTime() }
                ]
            }
        },

    ]
    return demoNotes
}