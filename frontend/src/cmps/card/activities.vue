
<template>
  <section class="activities">
    <textarea
      v-model="activity"
      @focus="isActive = true"
      placeholder="Write a Comment..."
    ></textarea>
    <div v-if="this.isActive" class="activitie-controls">
      <button @click.stop="setActivity">Save</button>
      <button @focus="isActive = false"></button>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data() {
    return {
      isActive: false,
      activity:  '',
    };
  },
  methods:{
    setActivity(){
      this.isActive=false
      const newActivity = 'comment a '+this.activity
      this.$emit('setActivity' , newActivity, this.activity)
      this.activity = ''
    }
  }
};
</script>

<style>
</style>