<template>
  <section class="side-menu">
    <div class="add-card-header side-menu-header">
      <h3 v-if="!isActivityModal">Menu</h3>
      <h3 v-else>Change background</h3>
      <button @click="toggleMenu"></button>
      <div v-if="isActivityModal" class="side-menu-back" @click="coverModal"></div>
    </div>
    <hr />
    <div class="side-menu-content">
      <button v-if="!isActivityModal" @click="coverModal">Change background</button>
      <board-cover
        @boardCoverColor="boardCoverColor"
        @boardCoverImage="boardCoverImage"
        v-if="isCoverModal"
      ></board-cover>
      <div v-if="!isActivityModal">
        <h3>Activities</h3>
        <!-- {{selectedBoard.activities}} -->
        <div v-for="activity in selectedBoard.activities" :key="activity.id">
          <p>
            <span>{{ activity.byMember.fullname }} </span>{{ activity.txt }}
          </p>
          <show-time :time="activity.creatAt"></show-time>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import showTime from "../card/show-time.vue";
import boardCover from "./board-cover.vue";

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