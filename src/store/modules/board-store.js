import { boardService } from "../../services/board-service"

export const boardStore = {
    state: {
        // boards: [],
        board: null
    },
    getters: {
        // boards(state) {
        //     return state.boards
        // },
        board(state){
            return state.board
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setBoard(state, { board }) {
            state.board = board
        }
    },
    actions: {
        // async loadBoards(context) {
        //     try {
        //         const boards = await boardService.query()
        //         context.commit({ type: 'setBoard', boards })
        //         return boards
        //     } catch (err) {
        //         console.log('Cannot load boards', err);
        //     }
        // },
        async loadBoard(context) {
            try {
                const board = await boardService.query()
                context.commit({ type: 'setBoard', board })
                return board
            } catch (err) {
                console.log('Cannot load board', err);
            }
        },

    }
}
