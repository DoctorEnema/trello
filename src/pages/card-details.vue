<template>
  <section v-if="card" class="card-details" @click="closeModal">
    <div
      v-if="card.cover"
      class="details-cover"
      :style="{ backgroundColor: card.cover.color }"
    >
      <img v-if="card.cover.imgUrl" :src="card.cover.imgUrl" alt="" />
      <!-- <button class="close-details"></button> -->
      <button class="choose-cover" data-cmp="add-cover" @click.stop="setModalType">Cover</button>
    </div>
    <button class="close-details" @click="closeCard"></button>
    <header class="details-header">
      <span class="details-title"></span>
      <div>
        <h2>{{ card.title }}</h2>
        <!--this is a textarea in trello -->
        <h5>in list {{ group.title }}</h5>
      </div>
    </header>
    <div class="details-body">
      <div v-if="card" class="left-side">
        <div class="details-top-left">
          <div class="details-members">
            <h3>MEMBERS</h3>
            <member
              :card="card"
              v-if="card.members"
              @removeMember="removeMember"
            ></member>
          </div>
          <div class="details-labels">
            <h3>LABELS</h3>
            <labels :card="card" v-if="card.labelIds" @setModalType="setModalType"></labels>
          </div>
          <div class="details-dates">
            <h3>DATES</h3>
            <date
              :card="card"
              v-if="card.dueDate"
              @changeComplete="changeComplete"
            ></date>
          </div>
        </div>
        <description></description>

        <ul v-if="card.checklists">
          <li v-for="(checklist, idx) in card.checklists" :key="idx">
            <checklist
              :checklist="checklist"
              @addTodo="addTodo"
              @removeList="removeList"
            ></checklist>
          </li>
        </ul>
        <attachment
          :card="card"
          v-if="card.attachments"
          @removeLink="removeLink"
        ></attachment>
      </div>
      <div class="right-side">
        <h3>Add to Card</h3>
        <button class="add-member" data-cmp="add-member"  @click.stop="setModalType">Members</button>
        <button class="add-label" data-cmp="add-label"  @click.stop="setModalType">Labels</button>
        <button class="add-checklist" data-cmp="add-checklist" @click.stop="setModalType">
          Checklist
        </button>
        <button class="add-date" data-cmp="add-date"  @click.stop="setModalType">Dates</button>
        <button class="add-attachment" data-cmp="add-attachment"  @click.stop="setModalType">
          Attachment
        </button>
        <button v-if="!card.cover" class="add-cover" data-cmp="add-cover"  @click.stop="setModalType">Cover</button>
      </div>
      <section class="modal" v-if="openModalType" @click.stop="stop">
        <component
          :is="openModalType"
          @closeModal="closeModal"
          @addUser="addMember"
          @linkAdded="linkAdded"
          @addDate="addDate"
          @createLabel="createLabel"
          @setLabel="setLabel"
          @listAdded="addList"
          @setCover="setCover"
          @removeCover="removeCover"
        ></component>
      </section>
      <!-- {{selectedBoard}} -->
    </div>
  </section>
</template>

<script>
import addLabel from "../cmps/card/add-label.vue";
import addChecklist from "../cmps/card/add-checklist.vue";
import addDate from "../cmps/card/add-date.vue";
import addMember from "../cmps/card/add-member.vue";
import addAttachment from "../cmps/card/add-attachment.vue";
import addCover from "../cmps/card/add-cover.vue";
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
    addCover,
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
      boardId: null,
    };
  },
  async created() {
    // this.$store.dispatch({ type: "loadBoard", boardId: "b101" });
    const { cardId, groupId, boardId } = this.$route.params;
    this.boardId = boardId;
    this.$store.dispatch({ type: "loadCard", boardId, groupId, cardId });
  },
  computed: {
    selectedBoard() {
      // return this.$store.getters.selectedBoard;
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
    card() {
      // console.log("card-getter", this.$store.getters.selectedCard);
      return JSON.parse(JSON.stringify(this.$store.getters.selectedCard));
    },
    group() {
      // console.log('110',this.$store.getters.selectedGroup);
      return JSON.parse(JSON.stringify(this.$store.getters.selectedGroup));
      return this.$store.getters.selectedGroup;
    },
  },
  methods: {
    stop(event) {
      // event.stopPropagation
    },
    setCover(cover){
      this.card.cover = {}
      this.card.cover = cover;
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    removeCover(){
      this.card.cover=null
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    setLabel(labelId) {
      // console.log("labelId", labelId)
      if (!this.card.labelIds) this.card.labelIds = [];
      if (this.card.labelIds.some((lId) => lId === labelId)) {
        this.removeLabel(labelId);
        return;
      }
      if (labelId === null) return;
      this.card.labelIds.push(labelId);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    removeLabel(labelId) {
      const labelIdx = this.card.labelIds.findIndex(
        (label) => label === labelId
      );
      this.card.labelIds.splice(labelIdx, 1);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    async createLabel(pickedLabel, action = 'add') {
      await this.$store.dispatch({
        type: "updateLabel",
        boardId: this.boardId,
        pickedLabel: {...pickedLabel},
        action
      });
      if (action === 'add') {
        this.setLabel(pickedLabel.id);
      }
    },
    changeComplete(isComplete) {
      this.card.dueDate.isComplete = isComplete;
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    addDate(date) {
      if (!this.card.dueDate) this.card.dueDate = {};
      this.card.dueDate.date = date;
      if (!this.card.dueDate.isComplete) this.card.dueDate.isComplete = false;
      // boardService.updateCard(this.board, this.group, this.card.id, this.card);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    linkAdded(link) {
      console.log(link);
      if (!this.card.attachments) this.card.attachments = [];
      this.card.attachments.push(link);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
      // boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    removeLink(linkIdx) {
      this.card.attachments.splice(linkIdx, 1);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
      // boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    addMember(member) {
      if (!this.card.members) this.card.members = [];
      if (this.card.members.some((m) => m._id === member._id)) {
        this.removeMember(member._id);
        return;
      }
      this.card.members.push(member);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    removeMember(memberId) {
      const memberIdx = this.card.members.findIndex(
        (member) => member._id === memberId
      );
      this.card.members.splice(memberIdx, 1);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    addTodo(checklist) {
      const checklistIdx = this.card.checklists.findIndex(
        (c) => c.id === checklist.id
      );
      this.card.checklists.splice(checklistIdx, 1, checklist);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
      // boardService.updateCard(this.board, this.group, this.card.id, this.card);
    },
    addList(title) {
      if(!this.card.checklists) this.card.checklists = []
      var newList = boardService.getEmptyList();
      newList.title = title;
      this.card.checklists.push(newList);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    removeList(listId) {
      const listIdx = this.card.checklists.findIndex(
        (list) => list._id === listId
      );
      this.card.checklists.splice(listIdx, 1);
      this.$store.dispatch({
        type: "updateCard",
        group: this.group,
        card: this.card,
      });
    },
    closeModal() {
      if (!this.openModalType) return;
      this.openModalType = null;
    },
    setModalType(ev) {
      // var value = ev.target.className;
      var value = ev.target.dataset.cmp;
      this.openModalType = value;
    },
    closeCard() {
      this.$router.push(`/board/${this.selectedBoard._id}`);
    }
  },
};
</script>
