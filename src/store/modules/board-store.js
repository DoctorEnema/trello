import { boardService } from "../../services/board-service"

export const boardStore = {
    state: {
        selectedBoard: null,
        card: null,
    },
    getters: {
        selectedBoard(state) {
            return state.selectedBoard
        },
        selectedCard(state) {
            return state.card
        }
    },
    mutations: {
        setBoard(state, { board }) {
            state.selectedBoard = board
        },
        removeGroup(state, { groupId }) {
            state.selectedBoard.groups = state.selectedBoard.groups.filter((group) => group.id !== groupId)
        },
        addGroup(state, { group }) {
            state.selectedBoard.groups.push(group)
        },
        removeCard(state, { group, cardId }) {
            const grIdx = state.selectedBoard.groups.findIndex(gr => gr.id === group.id)
            state.selectedBoard.groups[grIdx].cards = state.selectedBoard.groups[grIdx].cards.filter((card) => card.id !== cardId)
        },
        setCard(state, {card}) {
            state.card = card
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            try {
                const board = await boardService.getById(boardId)
                context.commit({ type: 'setBoard', board })
                return board
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async removeGroup(context, { groupId }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.removeGroup(board, groupId)
                context.commit({ type: 'removeGroup', groupId })
            } catch (err) {
                console.log('Cannot delete group', err);
            }
        },
        async addGroup(context, { group }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.addGroup(board, group)
                context.commit({ type: 'addGroup', group })
            } catch (err) {
                console.log('Cannot add group', err);
            }
        },
        async removeCard(context, { group, cardId }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.removeCard(board, group, cardId)
                context.commit({ type: 'removeCard', group, cardId })
            } catch (err) {
                console.log('Cant remove card', err);
            }
        },
        async addCard(context, {groupId, card}){
            try{
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.addCard(board, groupId, card)
            }catch(err){
                console.log('Cant add card', err);
            }
        }
    }
}

