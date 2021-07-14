<template>
  <section class="card-details">
    <header class="details-header">
      <h1>(Card name will be here)</h1>
      <h3>in list (Group name will be here)</h3>
    </header>
    <div class="details-body">
      <div v-if="board" class="left-side">
        <h1>Left Side</h1>
        <labels v-if="board.groups[1].cards[1].labelIds"></labels>
        <checklist v-if="board.groups[1].cards[1].checklists"></checklist>
        <date v-if="board.groups[1].cards[1].dueDate"></date>
        <member v-if="board.groups[1].cards[1].members"></member>
        <attachment v-if="board.groups[1].cards[1].attachments"></attachment>
        <!-- {{ board.groups[1].cards[1] }} -->
        <!-- {{board.groups[1].checklists}} -->
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
import labels from "../cmps/card/label.vue";
import checklist from "../cmps/card/checklist.vue";
import date from "../cmps/card/date.vue";
import member from "../cmps/card/member.vue";
import attachment from "../cmps/card/attachment.vue";

export default {
  components: {
    addLabel,
    addChecklist,
    addDate,
    addMember,
    addAttachment,
    labels,
    checklist,
    date,
    member,
    attachment,
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
  created() {
    this.$store.dispatch({ type: "loadBoard" });
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
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
