import { utilService } from '../services/util-service.js';
import { storageService } from '../services/async-storage-service.js';
import {httpService} from '../services/http-service.js';

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
// const gBoards = _createBoards();

export const boardService = {
    query,
    remove,
    getById,
    saveBoard,
    removeGroup,
    addGroup,
    removeCard,
    addCard,
    updateCard,
    getCardById,
    getEmptyTodo,
    getEmptyList,
    // updateGroup
};



function _createBoards() {
    let boards = utilService.loadFromStorage(BOARD_KEY);
    if (!boards || !boards.length) {
        boards = newBoard;

        utilService.saveToStorage(BOARD_KEY, boards);
    }
    return boards;
}

// function query() {
//     return storageService.query(BOARD_KEY);
// }
async function query() {
    // return storageService.query(BOARD_KEY);
    return httpService.get('board')
}

// function remove(boardId) {
//     return storageService.remove(BOARD_KEY, boardId)
// }
function remove(boardId) {
    return httpService.remove(`board/${boardId}`)
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
    // return storageService.get(BOARD_KEY, boardId);
}

// function addBoard(board) {
//     return storageService.post(BOARD_KEY, board)

// }

function saveBoard(board) {
  if (board._id) return httpService.put('board', board)
  else return httpService.post('board', board)
    // return storageService.put(BOARD_KEY, board)
}

function removeGroup(board, groupId) {
    const idx = board.groups.findIndex(group => groupId === group.id)
    board.groups.splice(idx, 1)
    return saveBoard(board)
}

function addGroup(board, group) {
    group.id = utilService.makeId()
    board.groups.push(group)
    return saveBoard(board)
}

function updateGroup(board, group) {
  const groupIdx = board.groups.findIndex(g => g.id === group.id)
  board.groups.splice(groupIdx, 1, group)
  return saveBoard(board)
}

function removeCard(board, group, cardId) {
    const cardIdx = group.cards.findIndex(card => cardId === card.id)
    group.cards.splice(cardIdx, 1)
    const grIdx = board.groups.findIndex(gr => gr.id === group.id)
    board.groups.splice(grIdx, 1, group)
    return saveBoard(board)
}

function updateCard(board, group, cardId, newCard) {
    const cardIdx = group.cards.findIndex(card => cardId === card.id)
    group.cards.splice(cardIdx, 1, newCard)
    const grIdx = board.groups.findIndex(gr => gr.id === group.id)
    board.groups.splice(grIdx, 1, group)
    return saveBoard(board)
}

function addCard(board, groupId, card) {
    card.id = utilService.makeId()
    const idx = board.groups.findIndex(group => groupId === group.id)
    if (!board.groups[idx].cards) board.groups[idx].cards = []
    board.groups[idx].cards.push(card)
    return saveBoard(board)
}

async function getCardById(cardId, groupId, boardId) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const cardIdx = board.groups[groupIdx].cards.findIndex(card => card.id === cardId)
        return { card: board.groups[groupIdx].cards[cardIdx], group: board.groups[groupIdx], board: board }
    } catch (err) {
        console.log('cant get card', err);
    }
}

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        title: '',
        isDone: false,
        isEdit: false
    }
}

function getEmptyList() {
    return {
        id: utilService.makeId(),
        title: '',
        todos: []
    }
}