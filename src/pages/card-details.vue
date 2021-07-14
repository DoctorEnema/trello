<template>
  <section class="card-details" >
    <header class="details-header">
      <h1>(Card name will be here)</h1>
      <h3>in list (Group name will be here)</h3>
    </header>
    <div class="details-body">
      <div v-if="board" class="left-side">
        <h1>Left Side</h1>
        <checklist v-if="board.groups[1].cards[1].checklists"></checklist>
        <date v-if="board.groups[1].cards[1].dueDate"></date>
        <member v-if="board.groups[1].cards[1].members"></member>
        <attachment v-if="board.groups[1].cards[1].attachments"></attachment>
        <labels v-if="board.groups[1].cards[1].labelIds"></labels>
      </div>
      <div class="right-side">
        <h3>Add to Card</h3>
        <button @click="membersModal">Members</button>
        <button @click="labelsModal">Labels</button>
        <button @click="checklistModal">Checklist</button>
        <button @click="datesModal">Dates</button>
        <button @click="attachmentModal">Attachment</button>
      </div>
      <add-label v-if="isOpen.isLabels" @closeModals="resetModals"></add-label>
      <add-checklist
        v-if="isOpen.isChecklist"
        @closeModals="resetModals"
      ></add-checklist>
      <add-date v-if="isOpen.isDates" @closeModals="resetModals"></add-date>
      <add-member
        v-if="isOpen.isMembers"
        @closeModals="resetModals"
        @addUser="addUserMember"
      ></add-member>
      <add-attachment
        v-if="isOpen.isAttachment"
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
      isOpen: {
        isMembers: false,
        isLabels: false,
        isChecklist: false,
        isDates: false,
        isAttachment: false,
      },
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
    addUserMember(user) {
      console.log(user);
    },
    membersModal() {
      this.resetModals();
      this.isOpen.isMembers = true;
    },
    labelsModal() {
      this.resetModals();
      this.isOpen.isLabels = true;
    },
    checklistModal() {
      this.resetModals();
      this.isOpen.isChecklist = true;
    },
    datesModal() {
      this.resetModals();
      this.isOpen.isDates = true;
    },
    attachmentModal() {
      this.resetModals();
      this.isOpen.isAttachment = true;
    },
    resetModals() {
      // var isOpen = false;
      // for (var modal in this.isOpen) {
      //   if (this.isOpen[modal] === true) isOpen = false;
      // }
      // console.log(false);

      // if (!isOpen) return;
      this.isOpen.isMembers = false;
      this.isOpen.isLabels = false;
      this.isOpen.isChecklist = false;
      this.isOpen.isDates = false;
      this.isOpen.isAttachment = false;
    },
  },
};
</script>
