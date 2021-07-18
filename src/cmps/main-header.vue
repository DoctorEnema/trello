<template>
  <section class="main-header">
    <div class="header-left">
      <router-link class="to-home" to="/"></router-link>
      <router-link @click="toggleMenu" class="to-boards" :to="'/board/b101'"> Boards</router-link>
      <button @click="toggleMenu" class="to-boards" :to="'/board/b101'"> Boards</button>
      <board-menu @toggleMenu="toggleMenu" v-if="isBoardMenu"></board-menu>
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
  </section>
</template>

<script>
import boardMenu from "../cmps/board/board-menu.vue";
export default {
  components:{
    boardMenu
  },
  data() {
    return {
      search: "",
      isBoardMenu:false
    };
  },
  methods:{
    toggleMenu(){
      this.isBoardMenu = !this.isBoardMenu
    }

  }
};
</script>
