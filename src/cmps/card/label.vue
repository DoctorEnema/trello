<template>
  <section v-if="card.labelIds" class="label-cmp">
 
       <button  data-cmp="add-label"  v-for="(label,idx) in cardLabels" :key="idx" :style="{backgroundColor:label.color}" @click.stop="setModalType">
        
         <!-- {{card.labelIds.name}} -->
         <span class="card-label"  >{{label.name}}</span>
       </button>
     <button class="add-new-label" data-cmp="add-label" @click.stop="setModalType"></button>
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
},
methods:{
  setModalType(ev){
    this.$emit('setModalType', ev)
  }
}
}
</script>
