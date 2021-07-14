<template>
  <section class="board-container">
    <div class="board-header">
        <div>Board Name</div>
        <div>isFavorite</div>
        <div>Members</div>
        <button>Invite</button>
    </div>
    <div class="board-content">
      <group class="group" v-for="(group, idx) in groups" :key="idx"></group>
    </div>
  </section>
</template>

<script>
import group from '../cmps/group/group.vue'
export default {
  components:{
    group
  },
  data() {
    return {
      groups: ["1", "2"],
    };
  },
};
</script>
