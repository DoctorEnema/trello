<template>
  <section class="card-details">
    <header class="details-header">
      <h1>(Card name will be here)</h1>
      <h3>in list (Group name will be here)</h3>
    </header>
    <div class="details-body">
      <div class="left-side">
        <h1>Left Side</h1>
      </div>
      <div class="right-side">
        <h3>Add to Card</h3>
        <button @click="membersModal">Members</button>
        <button @click="labelsModal">Labels</button>
        <button @click="checklistModal">Checklist</button>
        <button @click="datesModal">Dates</button>
        <button @click="attachmentModal">Attachment</button>
      </div>
      <add-label v-if="isLabels" @closeModals="resetModals"></add-label>
      <add-checklist
        v-if="isChecklist"
        @closeModals="resetModals"
      ></add-checklist>
      <add-date v-if="isDates" @closeModals="resetModals"></add-date>
      <add-member v-if="isMembers" @closeModals="resetModals"></add-member>
      <add-attachment
        v-if="isAttachment"
        @closeModals="resetModals"
      ></add-attachment>
    </div>
  </section>
</template>

<script>
import addLabel from "../cmps/card/add-label.vue";
import addChecklist from "../cmps/card/add-checklist.vue";
import addDate from "../cmps/card/add-date.vue";
import addMember from "../cmps/card/add-member.vue";
import addAttachment from "../cmps/card/add-attachment.vue";
export default {
  components: {
    addLabel,
    addChecklist,
    addDate,
    addMember,
    addAttachment,
  },
  data() {
    return {
      isMembers: false,
      isLabels: false,
      isChecklist: false,
      isDates: false,
      isAttachment: false,
    };
  },
  computed: {},
  methods: {
    membersModal() {
      this.resetModals();
      this.isMembers = true;
    },
    labelsModal() {
      this.resetModals();
      this.isLabels = true;
    },
    checklistModal() {
      this.resetModals();
      this.isChecklist = true;
    },
    datesModal() {
      this.resetModals();
      this.isDates = true;
    },
    attachmentModal() {
      this.resetModals();
      this.isAttachment = true;
    },
    resetModals() {
      this.isMembers = false;
      this.isLabels = false;
      this.isChecklist = false;
      this.isDates = false;
      this.isAttachment = false;
    },
  },
};
</script>
