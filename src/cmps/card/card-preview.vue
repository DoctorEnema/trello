<template>
  <section>
    <div v-if="card.style" class="card-preview-cover">
      {{card.style.bgColor}}
    </div>
    <p>{{card.title}}</p>
    <div class="card-preview-date">{{card.dueDate}}</div>
    <div v-if="card.description" class="card-preview-desc">blabla</div>
    <div v-if="card.comments">${{card.comments.length}}</div>
    <div v-if="card.attachments" class="card-preview-attachments">#{{card.attachments.length}}</div>
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