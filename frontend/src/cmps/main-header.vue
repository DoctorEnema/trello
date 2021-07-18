<template>
  <section class="main-header">
    <div class="header-left">
      <router-link class="to-home" to="/"></router-link>
      <router-link class="to-boards" :to="'/board/60f42b03d2f67fa6bfa0f528'"> Boards</router-link>
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
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>
