<template>
  <section>
    <div class="main-header">
      <div class="header-left">
        <router-link class="to-home" to="/"></router-link>
        <!-- <router-link class="to-boards" :to="'/board/'+currBoard"> Boards</router-link> -->

        <!-- <router-link @click="toggleMenu" class="to-boards" :to="'/board/b101'"> Boards</router-link> -->
        <button @click="toggleMenu" class="to-boards"> Boards</button>
        <div class="search">
          <input
            v-model="search"
            class="search-bar"
            type="search"
            placeholder="Jump to..."
          />
          <span class="search-glass"></span>
        </div>
      </div>
      <div class="logo">
        <div class="yuumi-header"></div>
        <h2>Yuulo</h2>
      </div>
      <div class="header-right">
        <button class="to-create-board"></button>
        <button class="to-info"></button>
        <button class="to-notifications"></button>
        <button class="to-user">User</button>
      </div>
    </div>
    <board-menu
      @selectBoard="selectBoard"
      @toggleMenu="toggleMenu"
      v-if="isBoardMenu"
    ></board-menu>
  </section>
</template>

<script>
import boardMenu from "../cmps/board/board-menu.vue";
export default {
  components: {
    boardMenu,
  },
  data() {
    return {
      search: "",
      isBoardMenu: false,
      currBoard: "60f42b03d2f67fa6bfa0f528",
    };
  },
  methods: {
    toggleMenu() {
      this.isBoardMenu = !this.isBoardMenu;
    },
    selectBoard(boardId) {
      console.log("boardId", boardId);
      this.currBoard = boardId;
      this.$router.push("/board/" + boardId);
      console.log("this.currBoard", this.currBoard);
    },
  },
};
</script>
