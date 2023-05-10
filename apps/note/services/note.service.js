// note service


import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'carDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
    getNextCarId
}

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return storageService.query(CAR_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }

            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
    // return axios.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getNextCarId(carId) {
    return storageService.query(CAR_KEY)
        .then((cars) => {
            let carIdx = cars.findIndex(car => car.id === carId)
            if(carIdx === cars.length - 1) carIdx = -1
            return cars[carIdx + 1].id
        })
}

function getEmptyCar(vendor = '', maxSpeed = '') {
    return { id: '', vendor, maxSpeed }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        minSpeed: searchParams.get('minSpeed') || ''
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        // cars = []
        // cars.push(_createCar('audu', 300))
        // cars.push(_createCar('fiak', 120))
        // cars.push(_createCar('subali', 50))
        // cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, _createDemoNote())
    }
}

function _createDemoNote() {
    // const car = getEmptyCar(vendor, maxSpeed)
    // car.id = utilService.makeId()

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
        txt: 'Fullstack Me Baby!'
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
        }
        ]
    return demoNotes
}