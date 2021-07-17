<template>
  <section>
    <div
      class="attachment"
      v-for="(attachment, idx) in card.attachments"
      :key="attachment.id"
    >
      <img :src="attachment" />
      <div class="attachment-info">
        <h3>attachment title</h3>
        <div class="attachment-controls">
          <p>Added (time here)</p>
          <span>-</span>
          <a href="#">Comment</a>
          <span>-</span>
          <a href="#" @click="removeAttachment(idx)">Delete</a>
          <span>-</span>
          <a href="#">Edit</a>
        </div>
        <div class="make-cover-attachment">
          <span></span>
          <a href="#">Make cover</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  methods: {
    removeAttachment(attachmentIdx) {
      this.$emit("removeLink", attachmentIdx);
    },
  },
};
</script>

<style>
</style>