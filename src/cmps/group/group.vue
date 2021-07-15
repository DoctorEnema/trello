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
    <div class="group-footer">
      <button @click="addCard(group.id, copiedEmptyCard)">+ Add a card</button>
      <!-- <input type="text" v-model="emptyCard.title" /> -->
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
      // console.log(card);
      this.$emit("addCard", groupId, card);
      this.emptyCard.title = "";
    },
  },
};
</script>