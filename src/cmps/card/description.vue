<template>
  <section class="description">
    <textarea
      v-model="desc"
      @focus="isActive = true"
      placeholder="Add a more detailed description..."
    ></textarea>
    <div v-if="this.isActive" class="description-controls">
      <button @click.stop="setDesc">Save</button>
      <button></button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      desc: "",
    };
  },
  methods:{
    setDesc(){
      this.isActive=false
      this.$emit('setDesc' , this.desc)
    }
  }
};
</script>

<style>
</style>