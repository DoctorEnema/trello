import { boardService } from "../../services/board-service"
import { socketService } from '../../services/socket-service'

export const boardStore = {
    state: {
        boards: null,
        selectedBoard: null,
        selectedGroup: null,
        selectedCard: null,
        card: null,
        textareaOpen: false
    },
    getters: {
        boards(state) {
            return state.boards
        },
        selectedBoard(state) {
            return state.selectedBoard
        },
        selectedGroup(state) {
            return state.selectedGroup
        },
        selectedCard(state) {
            return state.selectedCard
        },
        isTextareaOpen(state) {
            return state.textareaOpen
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setBoard(state, { board }) {
            state.selectedBoard = board
        },
        setGroup(state, { group }) {
            state.selectedGroup = group
        },
        setCard(state, { card }) {
            state.selectedCard = card
        },
        removeGroup(state, { groupId }) {
            state.selectedBoard.groups = state.selectedBoard.groups.filter((group) => group.id !== groupId)
        },
        addGroup(state, { group }) {
            state.selectedBoard.groups.push(group)
        },
        removeCard(state, { group, cardId }) {
            const idx = state.selectedBoard.groups.findIndex(gr => gr.id === group.id)
            state.selectedBoard.groups[idx].cards = state.selectedBoard.groups[idx].cards.filter((card) => card.id !== cardId)
        },
        addCard(state, { groupId, card }) {
            const idx = state.selectedBoard.groups.findIndex(gr => gr.id === groupId)
            if (!state.selectedBoard.groups[idx].cards) state.selectedBoard.groups[idx].cards = []
            state.selectedBoard.groups[idx].cards.push(card)
        },
        updateCard(state, { groupCopy, cardCopy }) {
            const cardIdx = groupCopy.cards.findIndex(card => cardCopy.id === card.id)
            groupCopy.cards.splice(cardIdx, 1, cardCopy)
            const grIdx = state.selectedBoard.groups.findIndex(gr => gr.id === groupCopy.id)
            state.selectedBoard.groups.splice(grIdx, 1, groupCopy)
        },
        setTextarea(state) {
            state.textareaOpen = !state.textareaOpen
        },
        removeCurrent(state) {
            state.selectedCard = null
            state.selectedGroup = null
        },
    },
    actions: {
        // async removeCurrent(context, {group, card}){
        //     try{
        //         context.commit({type: 'removeCurrent', card, group})
        //     }catch(err){
        //         console.log('Cannot remove current', err);
        //     }
        // },

        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
                // context.commit({ type: 'setGroup', group })
                // return card
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async addBoard(context, { board }) {
            try {
                await boardService.saveBoard(board)
                // context.commit({ type: 'setCard', card })
                // context.commit({ type: 'setGroup', group })
                // return card
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async loadCard(context, { cardId, groupId, boardId }) {
            try {
                const { card, group } = await boardService.getCardById(cardId, groupId, boardId)
                context.commit({ type: 'setCard', card })
                context.commit({ type: 'setGroup', group })
                socketService.off('updateCard')
                socketService.on('updateCard', cardToUpdate => {
                    context.commit({ type: 'setCard', card: cardToUpdate })
                })
                return card
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async loadBoard(context, { boardId }) {
            try {

                const board = await boardService.getById(boardId)
                context.commit({ type: 'removeCurrent' })
                context.commit({ type: 'setBoard', board })
                socketService.off('updateBoard')
                socketService.on('updateBoard', board => {
                    context.commit({ type: 'setBoard', board })
                })
                socketService.off('addGroup')
                socketService.on('addGroup', group => {
                    context.commit({ type: 'addGroup', group })
                })
                socketService.off('removeGroup')
                socketService.on('removeGroup', groupId => {
                    context.commit({ type: 'removeGroup', groupId })
                })
                socketService.off('removeCard')
                socketService.on('removeCard', ({group, cardId}) => {
                    context.commit({ type: 'removeCard', group, cardId })
                })
                socketService.off('addCard')
                socketService.on('addCard', ({groupId, card}) => {
                    context.commit({ type: 'addCard', groupId, card })
                })
                return board
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async updateBoard(context, { board }) {
            try {
                const savedBoard = await boardService.saveBoard(board)
                context.commit({ type: 'setBoard', board: savedBoard })
                socketService.emit('boardUpdated', savedBoard)
                return board
            } catch (err) {
                console.log('cannot update board', err);
            }
        },
        async updateActivities(context, { activity }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                if (!board.activities) board.activities = []
                board.activities.unshift(activity)
                await boardService.saveBoard(board)
                context.commit({ type: 'setBoard', board })
                return board
            } catch (err) {
                console.log('cannot update board', err);
            }
        },
        async updateLabel(context, { boardId, pickedLabel, action }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                const savedBoard = await boardService.updateLabel(board, action, pickedLabel)
                context.commit({ type: 'setBoard', board })
                socketService.emit('boardUpdated', savedBoard)
                return returnedBoard
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async removeGroup(context, { groupId }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.removeGroup(board, groupId)
                context.commit({ type: 'removeGroup', groupId })
                socketService.emit('groupRemoved', groupId)
            } catch (err) {
                console.log('Cannot delete group', err);
            }
        },
        async addGroup(context, { group }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                const newBoard = await boardService.addGroup(board, group)
                context.commit({ type: 'addGroup', group })
                socketService.emit('groupAdded', group)
            } catch (err) {
                console.log('Cannot add group', err);
            }
        },
        // async updateGroup(context, { group }) {
        //     try {
        //         const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
        //         // JSON.parse(JSON.stringify(group))
        //         const newBoard = boardService.updateGroup(board, group)
        //         context.commit({ type: 'setBoard', newBoard })
        //     }catch(err) {
        //         console.log('cannot update group', err);
        //     }
        // },
        async removeCard(context, { board, group, cardId }) {
            try {
                await boardService.removeCard(board, group, cardId)
                context.commit({ type: 'removeCard', group, cardId })
                const data = { group, cardId }
                socketService.emit('cardRemoved', data)
            } catch (err) {
                console.log('Cant remove card', err);
            }
        },
        async addCard(context, { board, groupId, card }) {
            try {
                await boardService.addCard(board, groupId, card)
                context.commit({ type: 'addCard', groupId, card })
                const data = { groupId, card }
                socketService.emit('cardAdded', data)
            } catch (err) {
                console.log('Cant add card', err);
            }
        },
        async updateCard(context, { group, card }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                const groupCopy = JSON.parse(JSON.stringify(group))
                const cardCopy = JSON.parse(JSON.stringify(card))
                await boardService.updateCard(board, group, card.id, card);
                context.commit({ type: 'updateCard', groupCopy, cardCopy })
                context.commit({ type: 'setCard', card: cardCopy })
                socketService.emit('cardUpdated', cardCopy)
                const savedBoard = board
                socketService.emit('boardUpdated', savedBoard)
            } catch (err) {
                console.log('Cant add card', err);
            }
        }
    }
}

