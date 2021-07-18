<template>
  <section class="description">
    <button v-if="card.description">Edit</button>
    <textarea
      v-model="desc"
      @focus="isActive = true"
      @blur="setDesc"
      placeholder="Add a more detailed description..."
    ></textarea>
    <div v-if="this.isActive" class="description-controls">
      <button @click.stop="setDesc">Save</button>
      <button @focus="isActive = false"></button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      isActive: false,
      desc: this.card.description || "",
    };
  },
  methods: {
    setDesc() {
      this.isActive = false;
      this.$emit("setDesc", this.desc);
    },
  },
};
</script>

<style>
</style>