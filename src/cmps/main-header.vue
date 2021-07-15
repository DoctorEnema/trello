<template>
  <section class="main-header">
    <div class="header-left">
      <router-link class="to-home" to="/"></router-link>
      <router-link class="to-boards" :to="'/board/b101'">Boards</router-link>
      <input class="search" type="text" placeholder="Jump to..." />
    </div>
      <div class="logo">
        <h2>LOGO1</h2>
      </div>
    <div class="header-right">
      <div>+</div>
      <div>!</div>
      <div>Bell</div>
      <div>User</div>
    </div>
  </section>
</template>

<script>
export default {};
</script>
