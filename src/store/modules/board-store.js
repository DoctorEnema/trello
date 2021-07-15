import { boardService } from "../../services/board-service"

export const boardStore = {
    state: {
        selectedBoard: null,
        selectedGroup:null,
        selectedCard:null,
        card: null,
        textareaOpen: false
    },
    getters: {
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
        setBoard(state, { board }) {
            state.selectedBoard = board
        },
        setGroup(state, { group }) {
            state.selectedGroup = group
        },
        setCard(state, { card }) {
            console.log("card", card)
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
        updateCard(state,{groupCopy, cardId, cardCopy}){
            console.log("state", state)
            const cardIdx = groupCopy.cards.findIndex(card => cardId === card.id)
            groupCopy.cards.splice(cardIdx, 1, cardCopy)
            const grIdx = state.selectedBoard.groups.findIndex(gr => gr.id === groupCopy.id)
            state.selectedBoard.groups.splice(grIdx, 1, groupCopy)
            // state.commit
            // state.selectedCard = cardCopy
        },
        setTextarea(state) {
            state.textareaOpen = !state.textareaOpen
        }
    },
    actions: {
        async loadCard(context, { cardId,groupId,boardId }) {
            try {
                const { card,group } =  await boardService.getCardById(cardId,groupId,boardId)
                console.log("card", card)
                context.commit({ type: 'setCard', card })
                context.commit({ type: 'setGroup', group })
                return card
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
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
        async addCard(context, { groupId, card }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                await boardService.addCard(board, groupId, card)
                context.commit({ type: 'addCard', groupId, card })
            } catch (err) {
                console.log('Cant add card', err);
            }
        },
        async updateCard(context, { group, cardId,card }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                const groupCopy = JSON.parse(JSON.stringify(group))
                const cardCopy = JSON.parse(JSON.stringify(card))
                boardService.updateCard(board, group, cardId, card);
                context.commit({ type: 'updateCard', groupCopy, cardId, cardCopy })
                context.commit({ type: 'setCard', card:cardCopy })

            } catch (err) {
                console.log('Cant add card', err);
            }
        }
    }
}

