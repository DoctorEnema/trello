<template>
  <section v-if="board" class="board-container">
    <div class="board-header">
      <div class="main-header-side">
        <h2>Electricity~</h2>
        <button class="favorite-board"></button>
        <button class="board-members" v-for="member in board.members" :key="member._id">
          <span v-if="member.imgUrl"><img :src="member.imgUrl"></span>
          <span v-else>{{ member.fullname }}</span>
        </button>
        <button>Invite</button>
      </div>
      <button class="show-board-menu"> Show menu</button>
    </div>
    <div class="board-content">
      <group
        @removeCard="removeCard"
        @removeGroup="removeGroup"
        @addCard="addCard"
        class="group"
        :group="group"
        v-for="group in board.groups"
        :key="group.id"
      ></group>
    </div>
    <div v-if="isAdding">
      <input v-model="emptyGroup.title" type="text" />
      <button @click="toggleAdding">X</button>
      <button @click="addGroup(copiedGroup)">Add</button>
    </div>
    <button v-else @click="toggleAdding">Add new Group</button>
    <router-view></router-view>
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
      isAdding: false,
      emptyGroup: {
        title: "",
        style: {},
      },
    };
  },
  computed: {
    board() {
      return this.$store.getters.selectedBoard;
    },
    boardId() {
      return this.$route.params.boardId;
    },
    copiedGroup() {
      return JSON.parse(JSON.stringify(this.emptyGroup));
    },
  },
  methods: {
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    addGroup(group) {
      this.$store.dispatch({ type: "addGroup", group });
      this.emptyGroup.title = "";
    },
    removeCard(group, cardId) {
      this.$store.dispatch({ type: "removeCard", group, cardId });
    },
    addCard(groupId, card) {
      this.$store.dispatch({ type: "addCard", groupId, card });
    },
    toggleAdding() {
      this.isAdding = !this.isAdding;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadBoard", boardId: this.boardId });
    boardService.getById(this.boardId).then((board) => {
      this.selectedBoard = board;
    });
  },
};
</script>
