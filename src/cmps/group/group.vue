<template>
  <section>
    <div class="group-header">
      <!-- <textarea></textarea> -->
      <p>{{ group.title }}</p>
      <button @click="removeGroup(group.id)">...</button>
    </div>
    <card-preview
      @removeCard="removeCard"
      class="card-preview"
      :group="group"
      :card="card"
      v-for="card in group.cards"
      :key="card.id"
    ></card-preview>
          <section class="add-card-area" v-if="isAdding" >
        <textarea v-model="emptyCard.title" />
        <button @click="addCard(group.id, copiedEmptyCard)">Add card</button>
        <button @click="isAdding=false">X</button>
      </section>
    <div v-else class="group-footer">
      <button @click="isAdding=true" >+ Add a card</button>
    </div>
  </section>
</template>

<script>
import cardPreview from "../card/card-preview.vue";
export default {
  props: { group: Object },
  components: {
    cardPreview,
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
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    removeCard(cardId) {
      this.$emit("removeCard", this.copiedGroup, cardId);
    },
    addCard(groupId, card) {
      if(!this.emptyCard.title) return
      this.$emit("addCard", groupId, card);
      this.emptyCard.title = "";
      this.isAdding = false
    },
  },
};
</script>