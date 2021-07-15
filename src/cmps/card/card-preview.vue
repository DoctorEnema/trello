<template>
  <section @click="openCard(group.id, card.id)">
    <button @click.stop="removeCard(card.id)" >X</button>
    <div v-if="card.style" :style="{ backgroundColor:card.style.bgColor }"  class="card-preview-cover">
    </div>
    <div v-for="label in card.labelIds" :key="label">{{label}}</div>
    <div class="card-preview-title">{{ card.title }}</div>
    <div class="card-preview-badges">
      <div class="card-preview-date">{{ card.dueDate }}</div>
      <div v-if="card.description" class="card-preview-desc">blabla</div>
      <div v-if="card.comments">${{ card.comments.length }}</div>
      <div v-if="card.attachments" class="card-preview-attachments">
        #{{ card.attachments.length }}
      </div>
      <div v-if="card.checklists" class="card-preview-checklists">
        {{ numberOfTodos }}
      </div>
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
    group: Object
  },
  methods:{
    removeCard(cardId){
      this.$emit('removeCard', cardId)
    },
    openCard(groupId, cardId) {
      this.$router.push(`/board/b101/${groupId}/${cardId}`)
    }
  },
  computed: {
    numberOfTodos() {
      let sum = 0;
      this.card.checklists.forEach(
        (checklist) => (sum += checklist.todos.length)
      );
      return sum;
    },
    date(){
      let time = new Date(this.card.dueDate)
      let month = time.getMonth()
      let day = time.getDay()
      return `${month} ${day}`
    },
  },
};
</script>

<style>
</style>