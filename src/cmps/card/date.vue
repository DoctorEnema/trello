<template>
  <section class="date">
    <span>
      <input type="checkbox" v-model="checkbox" @change="changeComplete" />
      <button>
        {{ time }}
        <span class="is-complete" v-if="checkbox">COMPLETE </span>
      </button>
    </span>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      checkbox: this.card.dueDate.isComplete,
    };
  },
  created() {},
  computed: {
    time() {
      // return new Date(this.card.dueDate.date)
      const date = new Date(this.card.dueDate.date);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
  },
  methods: {
    changeComplete() {
      this.$emit("changeComplete", this.checkbox);
    },
  },
};
</script>

<style>
</style>