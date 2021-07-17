<template>
  <section>
    <div class="group-header">
      <p>{{ group.title }}</p>
      <button @click="removeGroup(group.id)"></button>
    </div>
      <draggable class="group-content"  :list="group.cards" group="cardGroup" @start="onDragStart" @end="onDragEnd">
      <card-preview
        @changeComplete="changeComplete"
        @removeCard="removeCard"
        class="card-preview"
        :group="group"
        :card="card"
        v-for="card in group.cards"
        :key="card.id"
      ></card-preview>
      </draggable>
    <section class="add-card-area" v-if="isAdding">
      <textarea
        placeholder="Enter a title for this card..."
        v-model="emptyCard.title"
      />
      <div class="add-card-controls">
        <button @click="addCard(group.id)">Add card</button>
        <button class="close-adding" @click="isAdding = false"></button>
      </div>
    </section>
    <div v-else class="group-footer">
      <button @click="isAdding = true"> Add a card</button>
    </div>
  </section>
</template>

<script>
import cardPreview from "../card/card-preview.vue";
import draggable from 'vuedraggable'
export default {
  props: { group: Object },
  components: {
    cardPreview, 
    draggable
  },
  data() {
    return {
      emptyCard: {
        title: "",
      },
      isAdding: false,
    };
  },
  computed: {
    copiedGroup() {
      return JSON.parse(JSON.stringify(this.group));
    },
    copiedEmptyCard() {
      return JSON.parse(JSON.stringify(this.emptyCard));
    },
  },
  methods: {
    onDragStart(ev) {
      ev.item.classList.add('dragging')
    },
    onDragEnd(ev) {
      ev.item.classList.remove('dragging')
      this.$emit('onDragEnd')
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    removeCard(cardId) {
      this.$emit("removeCard", this.copiedGroup, cardId);
    },
    addCard(groupId) {
      if (!this.emptyCard.title) return;
      this.$emit("addCard", groupId, this.copiedEmptyCard);
      this.emptyCard.title = "";
      this.isAdding = false;
    },
    changeComplete(isComplete) {
      this.$emit("changeComplete", isComplete);
    },
  },
};
</script>