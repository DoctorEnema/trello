<template>
  <section class="add-board">
    <div>
      <button @click="openCreatBoard">X</button>
      <input v-model="title" type="text" />
      <div class="board-covers">
        <button
          v-for="cover in selectedBoard.covers"
          :key="cover.id"
          @click="imgUrl = cover.imgUrl"
        >
          <img :src="cover.imgUrl" alt="" />
        </button>
      </div>
    </div>
    <button @click="creatBoard">Creat board</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      imgUrl:
        "https://res.cloudinary.com/davidyan7/image/upload/v1625997002/samples/landscapes/beach-boat.jpg",
    };
  },
  computed: {
    selectedBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
  },
  methods: {
    openCreatBoard() {
      this.$emit("openCreatBoard");
    },
    creatBoard() {
      if (!this.title) return;
      this.$emit("creatBoard", this.title, this.imgUrl);
    },
  },
};
</script>

<style>
</style>