<template>
  <section class="member">
      <h1>Member</h1>
      <section v-if="card.members">
      <div v-for="member in card.members" :key="member.id">
        <button @click="removeMember(member.id)">
      <img :src="member.imgUrl">
        </button>
      </div>
      </section>
  </section>
</template>

<script>
export default {
props: {
    card: Object
  },
  created(){
console.log(this.card);
  },
  data(){
    return{

    }
  },
  methods:{
    removeMember(memberId){
      this.$emit('removeMember', memberId)
    }
  },
  computed:{
  }
}
</script>

