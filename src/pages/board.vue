<template>
  <section v-if="board" class="board-container">
    <div class="board-header">
      <div>Board Name</div>
      <div>isFavorite</div>
      <div>Members</div>
      <button>Invite</button>
    </div>
    <div class="board-content">
      <group @removeGroup="removeGroup"
        class="group"
        :group="group"
        v-for="group in board.groups"
        :key="group.id"
      ></group>
    </div>
  </section>
</template>

<script>
import group from "../cmps/group/group.vue";
export default {
  components: {
    group,
  },
  data() {
    return {};
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  methods:{
    removeGroup(groupId){
      
    }
  },
  created() {
    this.$store.dispatch({ type: "loadBoard" });
  },
};
</script>
