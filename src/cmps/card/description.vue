<template>
  <section class="description">
    <textarea
      v-model="desc"
      @focus="isActive = true"
      @blur="isActive = false"
      placeholder="Add a more detailed description..."
    ></textarea>
    <div v-if="this.isActive" class="description-controls">
      <button>Save</button>
      <button></button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      desc: "",
    };
  },
};
</script>

<style>
</style>