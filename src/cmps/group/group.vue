<template>
  <section>
    <button @click="removeGroup(group.id)">REMOVE</button>
    <div class="group-header">
      <!-- <textarea></textarea> -->
      <p>{{group.title}}</p>
      <div>...</div>
    </div>
    <card-preview
      @removeCard="removeCard"
      class="card-preview"
      :card="card"
      v-for="card in group.cards"
      :key="card.id"
    ></card-preview>
    <button>Add Card</button>
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
    };
  },
  computed:{
    copiedGroup(){
      return JSON.parse(JSON.stringify(this.group))
    }
  },
  methods:{
    removeGroup(groupId){
      this.$emit('removeGroup', groupId)
    },
    removeCard(cardId){
      this.$emit('removeCard', this.copiedGroup, cardId)
    },
  },
};
</script>