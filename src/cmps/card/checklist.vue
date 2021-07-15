<template>
  <section class="checklist">
    <h1>Checklist</h1>
    {{card.checklists}}
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
};
</script>

<style>
</style>