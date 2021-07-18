
<template>
  <section class="board-menu"  >
      <h1>board menu</h1>
    <button @click="toggleMenu">X</button>
   
  </section>
</template>

<script>

export default {
  data() {
    return {
      isCoverModal: false,
      isActivityModal: false,
    };
  },
  components: {
    showTime,
    boardCover,
  },
  computed: {
    selectedBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
  },
  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    coverModal() {
      this.isCoverModal = !this.isCoverModal;
      this.isActivityModal = !this.isActivityModal;
    },
    boardCoverImage(img) {
      this.$emit("boardCoverImage", img);
    },
    boardCoverColor(color) {
      this.$emit("boardCoverColor", color);
    },
  },
};
</script>

