<template>
  <section>
    <div v-if="card.style" class="card-preview-cover">
      {{ card.style.bgColor }}
    </div>
    <p>{{ card.title }}</p>
    <div class="card-preview-date">{{ card.dueDate }}</div>
    <div v-if="card.description" class="card-preview-desc">blabla</div>
    <div v-if="card.comments">${{ card.comments.length }}</div>
    <div v-if="card.attachments" class="card-preview-attachments">
      #{{ card.attachments.length }}
    </div>
    <div v-if="card.checklists" class="card-preview-checklists">
      {{ numberOfTodos }}
    </div>
    <div v-if="card.members" class="card-preview-members">
      <div v-for="member in card.members" :key="member._id">
        {{ member.fullname }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  computed: {
    numberOfTodos() {
      var sum = 0;
      this.card.checklists.forEach(
        (checklist) => (sum += checklist.todos.length)
      );
      return sum;
    },
  },
};
</script>

<style>
</style>