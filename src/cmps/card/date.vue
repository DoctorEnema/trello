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
  props: {
    card: Object
  },
  data(){
    return{
      checkbox:true
    }
  },
created() {
  },
  computed: {
    time(){
      const date =  new Date(this.card.dueDate) 
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