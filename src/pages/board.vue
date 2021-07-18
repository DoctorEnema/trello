<template>
  <section v-if="board" class="board-container">
    <div
      class="background"
      :style="{
        'background-image': 'url(' + this.board.style.backgroundImg + ')',
      }"
    />
    <div class="board-header">
      <div class="main-header-side">
        <h2>Electricity~</h2>
        <button class="favorite-board"></button>
        <button
          class="board-members"
          v-for="member in board.members"
          :key="member._id"
        >
          <span v-if="member.imgUrl"><img :src="member.imgUrl" /></span>
          <span v-else>{{ member.fullname }}</span>
        </button>
        <button>Invite</button>
      </div>
      <button class="show-board-menu" @click="toggleMenu">Show menu</button>
      <side-menu v-if="isSideMenu" @toggleMenu="toggleMenu"></side-menu>
    </div>
    <div class="board-content">
      <div class="groups-and-add">
        <draggable
          class="groups"
          :list="board.groups"
          @start="onDragStart"
          @end="onDragEnd"
        >
          <group
            @removeCard="removeCard"
            @removeGroup="removeGroup"
            @addCard="addCard"
            class="group"
            :group="group"
            v-for="group in board.groups"
            :key="group.id"
            @onDragEnd="onDragEnd"
          ></group>
        </draggable>
        <div class="adding-group" v-if="isAdding">
          <input
            v-model="emptyGroup.title"
            type="text"
            placeholder="Enter group title..."
          />
          <div class="add-group-controls">
            <button @click="addGroup(copiedGroup)">Add group</button>
            <button @click="toggleAdding"></button>
          </div>
        </div>
        <button class="add-group" v-else @click="toggleAdding">
          Add another group
        </button>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import group from "../cmps/group/group.vue";
import draggable from "vuedraggable";
import activities from "../cmps/card/activities.vue";
import sideMenu from "../cmps/card/side-menu.vue";
export default {
  components: {
    group,
    activities,
    sideMenu,
    draggable,
  },
  data() {
    return {
      selectedBoard: null,
      isAdding: false,
      emptyGroup: {
        title: "",
        style: {},
      },
      isSideMenu: false,
    };
  },
  computed: {
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
    boardId() {
      return this.$route.params.boardId;
    },
    copiedGroup() {
      return JSON.parse(JSON.stringify(this.emptyGroup));
    },
  },
  methods: {
    onDragStart() {
      console.log(this.board.groups);
    },
    onDragEnd() {
      console.log("dragEnd");
      const board = this.board;
      this.$store.dispatch({ type: "updateBoard", board });
    },
    // updateGroup(group) {
    //   this.$store.dispatch({ type: "updateGroup", group})
    // },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    addGroup(group) {
      if(!group.title) return
      this.$store.dispatch({ type: "addGroup", group });
      this.emptyGroup.title = "";
      this.isAdding = false;
    },
    removeCard(group, cardId) {
      this.$store.dispatch({ type: "removeCard", board: this.board, group, cardId });
    },
    addCard(groupId, card) {
      console.log('addCard - board');
      this.$store.dispatch({ type: "addCard", board: this.board, groupId, card });
    },
    toggleAdding() {
      this.isAdding = !this.isAdding;
    },
    toggleMenu() {
      this.isSideMenu = !this.isSideMenu;
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
