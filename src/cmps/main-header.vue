<template>
  <section class="main-header">
    <div class="logo">
      <h2>LOGO1</h2>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="'/board/b101'">Board</router-link>
    </nav>
  </section>
</template>

<script>
export default {};
</script>
