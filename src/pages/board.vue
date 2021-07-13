<template>
  <section class="board-container">
    <div class="board-header">
        <div>Board Name</div>
        <div>isFavorite, a star that filled or not filled</div>
        <div>Members, will be a v-for</div>
        <button>Invite</button>
    </div>
    <div class="board-content">
      <div v-for="(group, idx) in groups" :key="idx">{{group}}</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      groups: ["1", "2"],
    };
  },
};
</script>
