<template>
  <section v-if="selectedBoard" class="board-container">
    <div class="board-header">
      <div>Board Name</div>
      <div>isFavorite</div>
      <div>Members</div>
      <button>Invite</button>
    </div>
    <div class="board-content">
      <group
        @removeGroup="removeGroup"
        class="group"
        :group="group"
        v-for="group in selectedBoard.groups"
        :key="group.id"
      ></group>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import group from "../cmps/group/group.vue";
export default {
  components: {
    group,
  },
  data() {
    return {
      selectedBoard: null,
    };
  },
  computed: {
    // board() {
    //   return this.$store.getters.board;
    // },
    boardId() {
      return this.$route.params.boardId;
    },
  },
  methods: {
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
  },
  created() {
    boardService.getById(this.boardId).then((board) => {
      this.selectedBoard = board;
    this.$store.dispatch({ type: "loadBoard", boardId: this.boardId });
    });
  },
};
</script>
