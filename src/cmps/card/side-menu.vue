<template>
  <section class="side-menu">
      <h1>sideMenu</h1>
      <button @click="toggleMenu">X</button>
<h3>Activities</h3>
       <div v-for="activity in selectedBoard.activities" :key="activity.id">
                  <p><span>{{activity.byMember.fullname}} </span>{{activity.txt}} </p>
                  <show-time :time="activity.creatAt"></show-time>
              </div>
  </section>
</template>

<script>
import showTime from "../../cmps/card/show-time.vue";

export default {
  components:{
    showTime
  },
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