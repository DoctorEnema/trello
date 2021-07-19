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
      title: '',
      imgUrl:'https://res.cloudinary.com/davidyan7/image/upload/v1625997002/samples/landscapes/beach-boat.jpg',
      covers:[
    {
        "id" : "c101",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1625997002/samples/landscapes/beach-boat.jpg"
    },
    {
        "id" : "c102",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1625997005/samples/landscapes/nature-mountains.jpg"
    },
    {
        "id" : "c103",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1625997001/samples/landscapes/architecture-signs.jpg"
    },
    {
        "id" : "c104",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1625996999/samples/landscapes/girl-urban-view.jpg"
    },
    {
        "id" : "c105",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1626442129/download-3_o4vbyr.jpg"
    },
    {
        "id" : "c106",
        "imgUrl" : "https://res.cloudinary.com/davidyan7/image/upload/v1626442129/download-4_enj2yk.jpg"
    }
]
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