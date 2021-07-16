<template>
   <div class="add-to-card">
     <div class="create-cover">
          <button @click="closeModal">X</button>
         <h4>size</h4>
         <button>Header inside the cover</button>
         <button>Header outside the cover</button>

         <button v-if="isRemoved" @click="removeCover">Remove Cover</button>
        <form @submit.prevent="setCoverColor()">
          <label for="name">colors</label>
          <ul>
            <li
              class="card-cover-color"
              v-for="(label, idx) in editCovers"
              :key="idx"
              :style="'background-color:' + label"
            @click="setCoverColor(label)">
              <span class="icon"></span>
            </li>
          </ul>
          <!-- <div>
            <button>Create</button>
          </div> -->
        </form>
        <h4>attachments</h4>
        
        <h4>Unsplash</h4>
        <button v-for="(cover,idx) in boardCovers" :key="idx" @click="setCover(cover)">
        <img class="cover-img" :src="cover.imgUrl" alt="">
       </button>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
editCovers: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
      ],
      pickedCover: {
        id:null,
        color: "#344563",
      },
      isRemoved:true
    }
},
computed:{
   boardCovers() {
      const board = this.$store.getters.selectedBoard
      return board.covers;
    },  
},
methods:{
    setCover(cover){
        this.isRemoved=true
     this.$emit('setCover' , cover)
    },
    setCoverColor(color){
         this.isRemoved=true
        this.pickedCover.color =color
        this.$emit('setCover' , this.pickedCover)
    },
     closeModal() {
      this.$emit("closeModal");
    },
    removeCover(){
       this.isRemoved=false
         this.$emit("removeCover");
    }
}
}
</script>
