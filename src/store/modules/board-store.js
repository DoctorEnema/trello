import { boardService } from "../../services/board-service"

export const boardStore = {
    state: {
        selectedBoard: null
    },
    getters: {
        selectedBoard(state) {
            return state.selectedBoard
        }
    },
    mutations: {
        setBoard(state, { board }) {
            state.selectedBoard = board
        },
        removeGroup(state, { groupId }) {
            console.log('wow');
            state.selectedBoard.groups = state.selectedBoard.groups.filter((group) => group.id !== groupId)
        },
    },
    actions: {
        async loadBoard(context, {boardId}) {
            try {
                const board = await boardService.getById(boardId)
                context.commit({ type: 'setBoard', board })
                console.log(board);
                return board
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },
        async removeGroup(context, { groupId }) {
            try {
                const board = context.getters.selectedBoard
                await boardService.removeGroup(board, groupId)
                context.commit({ type: 'removeGroup', groupId })
                // boardService.saveBoard(board)
            } catch (err) {
                console.log('Cannot delete group', err);
            }
        }

    }
}

