<template>
  <section class="main-header">
    <div class="logo">
      <h2>LOGO</h2>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="'/board/1'">Board</router-link>
    </nav>
  </section>
</template>

<script>
export default {};
</script>
