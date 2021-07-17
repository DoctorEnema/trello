<template>
  <section class="side-menu">
      <h1>sideMenu</h1>
      <button @click="toggleMenu">X</button>
  </section>
</template>

<script>
export default {

methods:{
    toggleMenu(){
        this.$emit('toggleMenu')
    }
}
}
</script>

<style>

</style>