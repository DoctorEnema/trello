<template>
  <section>
    <div
      class="attachment"
      v-for="(attachment, idx) in card.attachments"
      :key="attachment.id"
    >
      <img :src="attachment.imgUrl" />
      <div class="attachment-info">
        <h3>{{ attachment.name }}</h3>
        <div class="attachment-controls">
          <p>Added {{ attachment.time }}</p>
          <span>-</span>
          <a href="#">Comment</a>
          <span>-</span>
          <a href="#" @click="removeAttachment(idx)">Delete</a>
          <span>-</span>
          <a href="#">Edit</a>
        </div>
        <div class="make-cover-attachment">
          <span></span>
          <a href="#" v-if="!card.cover.imgUrl" @click="setCover(attachment.imgUrl)">Make cover</a>
          <a href="#" v-if="card.cover.imgUrl" @click="removeCover" >Remove cover</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service";
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      isRemoved: true,
    };
  },
  methods: {
    removeAttachment(attachmentIdx) {
      this.$emit("removeLink", attachmentIdx);
    },
    setCover(cover) {
      const newCover = { id: utilService.makeId(), imgUrl: cover };
      this.$emit("setCover", newCover);
    },
    removeCover() {
      this.$emit("removeCover");
    },
  },
};
</script>

<style>
</style>