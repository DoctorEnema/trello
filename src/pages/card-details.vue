<template>
  <section v-if="card" class="card-details" @click="closeModal">
    <header class="details-header">
      <h2>{{ card.title }}</h2>
      <h5>in list {{ group.title }}</h5>
    </header>
    <div class="details-body">
      <div v-if="board" class="left-side">
        <h1>Left Side</h1>
        <description></description>
        <date
          :card="card"
          v-if="card.dueDate"
          @changeComplete="changeComplete"
        ></date>
        <member
          :card="card"
          v-if="card.members"
          @removeMember="removeMember"
        ></member>
        <ul v-if="card.checklists">
          <li v-for="(checklist, idx) in card.checklists" :key="idx">
            <checklist :checklist="checklist" @addTodo="addTodo"></checklist>
          </li>
        </ul>
        <attachment
          :card="card"
          v-if="card.attachments"
          @removeLink="removeLink"
        ></attachment>
        <labels :card="card" v-if="card.labelIds"></labels>
      </div>
      <div class="right-side">
        <h3>Add to Card</h3>
        <button class="add-member" @click.stop="setModalType">Members</button>
        <button class="add-label" @click.stop="setModalType">Labels</button>
        <button class="add-checklist" @click.stop="setModalType">
          Checklist
        </button>
        <button class="add-date" @click.stop="setModalType">Dates</button>
        <button class="add-attachment" @click.stop="setModalType">
          Attachment
        </button>
      </div>
      <section class="modal" v-if="openModalType" @click.stop="stop">
        <component
          :is="openModalType"
          @closeModal="closeModal"
          @addUser="addMember"
          @linkAdded="linkAdded"
          @addDate="addDate"
        ></component>
      </section>
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
import description from "../cmps/card/description.vue";
import { boardService } from "../services/board-service";

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
    description,
  },
  data() {
    return {
      openModalType: null,
      board: null,
      group: null,
      card: null,
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadBoard", boardId: "b101" });
    const { cardId, groupId, boardId } = this.$route.params;
    const { board, group, card } = await boardService.getCardById(
      cardId,
      groupId,
      boardId
    );
    this.board = board;
    this.group = group;
    this.card = card;
  },
  computed: {
    // board() {
    //   return this.$store.getters.selectedBoard;
    // },
    selectedCard() {
      return this.$store.getters.selectedCard;
    },
  },
  methods: {
    stop(event) {
      // event.stopPropagation
    },
    changeComplete(isComplete) {
      this.card.dueDate.isComplete = isComplete;
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    addDate(date) {
      this.card.dueDate.date = date;
      if (!this.card.dueDate.isComplete) this.card.dueDate.isComplete = false;
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    linkAdded(link) {
      console.log(link);
      if (!this.card.attachments) this.card.attachments = [];
      this.card.attachments.push(link);
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    removeLink(linkIdx) {
      this.card.attachments.splice(linkIdx, 1);
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },

    addMember(member) {
      if(!this.card.members) { this.card.members=[] }
      // if(!this.card.members.length) {
      //   this.card.members.push(member);
      // boardService.updateCard(this.board, this.group, this.card.id, this.card);
      // return
      // }
      if (this.card.members.some((m) => m._id === member._id)) {
        this.removeMember(member._id);
        return;
      }
      this.card.members.push(member);
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
        // this.$store.dispatch({ type: "updateCard", group:this.group ,cardId:this.card.id, card:this.card});
    },
    addTodo(checklist) {
      const checklistIdx = this.card.checklists.findIndex(
        (c) => c.id === checklist.id
      );
      console.log("called");
      this.card.checklists.splice(checklistIdx, 1, checklist);
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    removeMember(memberId) {
      const memberIdx = this.card.members.findIndex(
        (member) => member.id === memberId
      );
      this.card.members.splice(memberIdx, 1);
      boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    closeModal() {
      if (!this.openModalType) return;
      this.openModalType = null;
    },
    setModalType(ev) {
      var value = ev.target.className;
      this.openModalType = value;
    },
  },
};
</script>
