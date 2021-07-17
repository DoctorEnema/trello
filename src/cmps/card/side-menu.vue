<template>
  <section class="side-menu">
      <h1>sideMenu</h1>
      <button @click="toggleMenu">X</button>
<h3>Activities</h3>
       <div v-for="activity in selectedBoard.activities" :key="activity.id">
                  <h3>{{activity.byMember.fullname}}</h3>{{activity.txt}}
              </div>
  </section>
</template>

<script>
export default {
computed: {
    selectedBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
},
methods:{
    toggleMenu(){
        this.$emit('toggleMenu')
    }
}
}
</script>

<style>

</style>