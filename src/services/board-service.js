import { utilService } from '../services/util-service.js';
import { storageService } from '../services/async-storage-service.js';



const boardsJson = [{
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "cards": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                },
                {
                    "id": "c103",
                    "title": "wiwa"
                },
                {
                    "id": "c104",
                    "title": "wow"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "cards": [
                {
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["101"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "attachments": ["url", "url2"],
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        },
        {
            "id": "g103",
            "title": "Group 1",
            "cards": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                },
                {
                    "id": "c103",
                    "title": "wiwa"
                },
                {
                    "id": "c104",
                    "title": "wow"
                }
            ],
            "style": {}
        },
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ]
}]
// const user = {
//     "_id": "u101",
//     "fullname": "Abi Abambi",
//     "username": "abi@ababmi.com",
//     "password": "aBambi123",
//     "imgUrl": "http://some-img.jpg",
//     "mentions": [{
//         "id": "m101",
//         "boardId": "m101",
//         "taskId": "t101"
//     }]
// }


const BOARD_KEY = 'boards';
const gBoards = _createBoards();

export const boardService = {
    query,
    remove,
    getById,
    addBoard,
    saveBoard,
    removeGroup,
    addGroup,
    removeCard,
    addCard,
    updateCard,
};



function _createBoards() {
    let boards = utilService.loadFromStorage(BOARD_KEY);
    if (!boards || !boards.length) {
        boards = boardsJson;

        utilService.saveToStorage(BOARD_KEY, boards);
    }
    return boards;
}

function query() {
    return storageService.query(BOARD_KEY);
}

function remove(boardId) {
    return storageService.remove(BOARD_KEY, boardId)
}

function getById(boardId) {
    return storageService.get(BOARD_KEY, boardId);
}

function addBoard(board) {
    return storageService.post(BOARD_KEY, board)

}

function saveBoard(board) {
    return storageService.put(BOARD_KEY, board)
}

function removeGroup(board, groupId) {
    const idx = board.groups.findIndex(group => groupId === group.id)
    board.groups.splice(idx, 1)
    storageService.put(BOARD_KEY, board)
}

function addGroup(board, group){
    group.id = utilService.makeId()
    board.groups.push(group)
    storageService.put(BOARD_KEY, board)
}

function removeCard(board, group, cardId){
    const cardIdx = group.cards.findIndex(card => cardId === card.id)
    group.cards.splice(cardIdx, 1)
    const grIdx = board.groups.findIndex(gr => gr.id === group.id)
    board.groups.splice(grIdx, 1, group)
    return storageService.put(BOARD_KEY, board)
}

function updateCard(board, group, cardId, newCard){
    const cardIdx = group.cards.findIndex(card => cardId === card.id)
    group.cards.splice(cardIdx, 1, newCard)
    const grIdx = board.groups.findIndex(gr => gr.id === group.id)
    board.groups.splice(grIdx, 1, group)
    return storageService.put(BOARD_KEY, board)
}

function addCard(board, groupId, card){
    card.id = utilService.makeId()
    board.groups.card.push(card)
    storageService.put(BOARD_KEY, board)
}
