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
    addNewNote
}

function addNewNote(userNote) {
    console.log(userNote)
    const note = {
        createdAt: 2023,
        type: 'noteTxt',
        isPinned: true,
        info: { title: userNote }
    }
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

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            
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

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
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
            type: 'noteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#FFD59E'
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
                url:"../../../assets/img/mazda.jpg",
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
                backgroundColor: '#F9FFA4'
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
                backgroundColor: 'rgb(215, 249, 213)'
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
                backgroundColor: 'rgb(233, 241, 248)'
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
                backgroundColor: 'rgb(238, 216, 219)'
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