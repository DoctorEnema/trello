<template>
  <section class="main-header">
    <div class="header-left">
      <router-link class="to-home" to="/"></router-link>
      <router-link class="to-boards" :to="'/board/b101'"> Boards</router-link>
      <div>
      <input class="search" type="search" placeholder="Jump to..." />
      <span class="search-glass"></span>
      </div>
    </div>
      <div class="logo">
        <h2>Yuulo</h2>
      </div>
    <div class="header-right">
      <div class="to-create-board"></div>
      <div class="to-info"></div>
      <div class="to-notifications"></div>
      <div class="to-user">User</div>
    </div>
  </section>
</template>

<script>
export default {
};
</script>
