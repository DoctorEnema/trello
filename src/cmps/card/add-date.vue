<template>
  <section class="add-to-card">
       <h1>Hello Date</h1>
     
    
       <button @click="resetModals">X</button>
  </section>
</template>

<script>

export default {
data(){
  return{

  }
},
components:{

},
computed:{

},
methods:{
  resetModals(){
      this.$emit('closeModals');
  },
  
}
}
</script>

<style>

</style>