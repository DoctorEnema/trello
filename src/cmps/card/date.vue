<template>
  <section class="date">
      <h5>DUE DATE</h5>
      <span>
   
   <input type="checkbox" v-model="checkbox" >{{time}} <span v-if="checkbox">Complete</span>
      </span>

  </section>
</template>

<script>
export default {
  data(){
    return{
      checkbox:true
    }
  },
created() {
    this.$store.dispatch({ type: "loadBoard", boardId: "b101" });
  },
  computed: {
    board() {
      console.log(this.$store.getters.selectedBoard);
      return this.$store.getters.selectedBoard;
    },
    time(){
      const date =  new Date(this.board.groups[1].cards[1].dueDate) 
      return (date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());
    }
  },
}
</script>

<style>

</style>