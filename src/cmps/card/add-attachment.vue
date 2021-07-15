<template>
  <section class="add-to-card">
    <header class="add-label-header">
      <span class="add-label-title">Add attachment</span>
      <button @click="closeModal">X</button>
    </header>
    <hr />
    <form @submit.prevent="setLink(), closeModal()">
      <label for="attachment">Attach a link</label>
      <input ref="attach" type="text" placeholder="Paste any link here..." />
      <button>Attach</button>
    </form>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$refs.attach.focus();
  },
  data() {
    return {
      link: ''
    };
  },
  methods: {
    resetModals() {
      this.$emit("closeModals");
    },
    setLink() {
      this.$emit('linkAdded', this.link)
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>