<template>
  <section>
    <div class="group-header">
      <h2>{{group.title}}</h2>
      <div>...</div>
    </div>
    <card-preview
      class="card-preview"
      :card="card"
      v-for="card in group.cards"
      :key="card.id"
    ></card-preview>
  </section>
</template>

<script>
import cardPreview from "../card/card-preview.vue";
export default {
  props: { group: Object },
  components: {
    cardPreview,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>