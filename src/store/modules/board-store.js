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
        updateCard(state,{groupCopy, cardCopy}){
            const cardIdx = groupCopy.cards.findIndex(card => cardCopy.id === card.id)
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
        async updateLabel(context, { boardId , pickedLabel, action}) {
            // console.log("pickedLabel", pickedLabel)
            try {
                const board = await boardService.getById(boardId)
                if(!board.labels) board.labels = []
                if (action === 'add') {
                    board.labels.push(pickedLabel)
                } else if (action === 'remove'){
                    const labelIdx = board.labels.findIndex(label=> label.id === pickedLabel.id)
                    // console.log('labelIdx',labelIdx);
                    board.labels.splice(labelIdx, 1)
                    board.groups.forEach(group=> {
                        group.cards.forEach(card => {
                            if (!card.labelIds){
                                console.log("not have labels")
                            } 
                             else {
                                const idIdx = card.labelIds.findIndex(id => id === pickedLabel.id)
                                if (idIdx !== -1) {  
                                    card.labelIds.splice(idIdx, 1)
                                    console.log('asdas;daslkjdklsajda',idIdx);
                            }

                            }
                        })
                    })
                }
                // else if(action === 'edit') {
                //     const labelIdx = board.labels.findIndex(label=> label.id === pickedLabel.id)
                //     board.labels.splice(labelIdx, 1, pickedLabel)
                //     board.groups.forEach(group=> {
                //         group.cards.forEach(card => {
                //             if (card.labelIds) {
                //                 const idIdx = card.labelIds.findIndex(id => id === pickedLabel.id)
                //                 if (idIdx !== -1) card.labelIds.splice(idIdx, 1, pickedLabel.id)
                //             }
                //         })
                //     })
                // }
                await boardService.saveBoard(board)
                context.commit({ type: 'setBoard', board })
                // return board
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
        async updateCard(context, { group, card }) {
            try {
                const board = JSON.parse(JSON.stringify(context.getters.selectedBoard))
                const groupCopy = JSON.parse(JSON.stringify(group))
                const cardCopy = JSON.parse(JSON.stringify(card))
                boardService.updateCard(board, group, card.id, card);
                context.commit({ type: 'updateCard', groupCopy, cardCopy })
                context.commit({ type: 'setCard', card:cardCopy })

            } catch (err) {
                console.log('Cant add card', err);
            }
        }
    }
}

