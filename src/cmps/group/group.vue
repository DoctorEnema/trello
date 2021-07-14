<template>
  <section>
    <card-preview class="card" v-for="(card, idx) in cards" :key="idx"></card-preview>
  </section>
</template>

<script>
import cardPreview from "../card/card-preview.vue";
export default {
  components: {
    cardPreview,
  },
  data(){
      return{
          cards:['a','b']
      }
  }
};
</script>

<style>
</style>