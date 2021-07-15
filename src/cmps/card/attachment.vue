<template>
  <section class="attachment">
      <h1>Attachment</h1>
      <section v-if="card.attachments">
      <div v-for="(attachment,idx) in card.attachments" :key="attachment.id">
      <img :src="attachment">
        <button @click="removeAttachment(idx)">X</button>
      </div>
      </section>
  </section>
</template>

<script>
export default {
props: {
    card: Object
  },
  methods:{
    removeAttachment(attachmentIdx){
this.$emit('removeLink', attachmentIdx)
    }
  }
}
</script>

<style>

</style>