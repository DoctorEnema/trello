<template>
  <section v-if="card.labelIds" class="label-cmp">
       <button v-for="(label,idx) in cardLabels" :key="idx" :style="{backgroundColor:label.color}">
        
         <!-- {{card.labelIds.name}} -->
         <span class="card-label"  >{{label.name}}</span>
       </button>
     <button class="add-new-label"></button>
  </section>
</template>

<script>
export default {
props: {
    card: Object
  },
   computed: {
    boardLabels() {
      const board = this.$store.getters.selectedBoard
      return board.labels;
    },
    cardLabels(){
       const cardLabels = []
      this.card.labelIds.forEach(label=> {
        const currLabel = this.boardLabels.filter(l=>l.id === label )
        cardLabels.push(currLabel[0])
      })
      return cardLabels
    }

}
}
</script>
