<template>
  <section class="date">
      <h6>DUE DATE</h6>
      <span>  
   <input type="checkbox" v-model="checkbox" @change="changeComplete" >{{time}} <span v-if="checkbox">Complete</span>
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
      checkbox:this.card.dueDate.isComplete
    }
  },
created() {
  },
  computed: {
    time(){
      // return new Date(this.card.dueDate.date)
      const date =  new Date(this.card.dueDate.date) 
      return (date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());
    }
  },
  methods:{
    changeComplete(){
      this.$emit('changeComplete',this.checkbox)
    }
  }
}
</script>

<style>

</style>