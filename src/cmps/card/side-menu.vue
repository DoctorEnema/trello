<template>
  <section class="side-menu">
    <h1>sideMenu</h1>
    <button @click="toggleMenu">X</button>
    <button @click="coverModal">Change background</button>
    <board-cover
      @boardCoverColor="boardCoverColor"
      @boardCoverImage="boardCoverImage"
      v-if="isCoverModal"
    ></board-cover>
    <div v-if="!isActivityModal">
      <h3>Activities</h3>
      <div v-for="activity in selectedBoard.activities" :key="activity.id">
        <p>
          <span>{{ activity.byMember.fullname }} </span>{{ activity.txt }}
        </p>
        <show-time :time="activity.creatAt"></show-time>
      </div>
    </div>
  </section>
</template>

<script>
import showTime from "../../cmps/card/show-time.vue";
import boardCover from "../../cmps/board/board-cover.vue";

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

<style>
</style>