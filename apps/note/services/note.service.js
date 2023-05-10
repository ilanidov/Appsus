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




function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(NOTES_KEY)
    // .then(cars => {
    //     if (filterBy.txt) {
    //         const regExp = new RegExp(filterBy.txt, 'i')
    //         cars = cars.filter(car => regExp.test(car.vendor))
    //     }

    //     if (filterBy.minSpeed) {
    //         cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
    //     }
    //     return cars
    // })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
    // return axios.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(note) {
    if (note.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getNextCarId(carId) {
    return storageService.query(CAR_KEY)
        .then((cars) => {
            let carIdx = cars.findIndex(car => car.id === carId)
            if (carIdx === cars.length - 1) carIdx = -1
            return cars[carIdx + 1].id
        })
}

function getEmptyNote() {
    return {
        // id: 'n101',
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
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        minSpeed: searchParams.get('minSpeed') || ''
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