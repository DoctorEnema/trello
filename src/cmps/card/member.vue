<template>
  <section class="member" v-if="card.members">
    <div v-for="member in card.members" :key="member.id">
      <button @click="removeMember(member.id)">
        <img :src="member.imgUrl" />
      </button>
    </div>
    <button class="add-new-member"></button>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    removeMember(memberId) {
      this.$emit("removeMember", memberId);
    },
  },
  computed: {},
};
</script>

