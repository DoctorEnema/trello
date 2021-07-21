<template>
  <section class="dashboard" @click="closeDashboard">
    <h1>Hello</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    selectedBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
  },
  methods: {
    closeDashboard() {
      this.$router.push(`/board/${this.selectedBoard._id}`);
    },
  },
};
</script>

<style>
</style>