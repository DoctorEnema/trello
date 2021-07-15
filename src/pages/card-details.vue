<template>
  <section class="card-details" @click="closeModal">
    <header class="details-header">
      <h1>(Card name will be here)</h1>
      <h3>in list (Group name will be here)</h3>
    </header>
    <div class="details-body">
      <div v-if="board" class="left-side">
        <h1>Left Side</h1>
        {{selectedCard}}
        <checklist v-if="board.groups[1].cards[1].checklists"></checklist>
        <date v-if="board.groups[1].cards[1].dueDate"></date>
        <member v-if="board.groups[1].cards[1].members"></member>
        <attachment v-if="board.groups[1].cards[1].attachments"></attachment>
        <labels v-if="board.groups[1].cards[1].labelIds"></labels>
      </div>
      <div class="right-side">
        <h3>Add to Card</h3>
        <button class="add-member" @click.stop="setModalType">Members</button>
        <button class="add-label" @click.stop="setModalType">Labels</button>
        <button class="add-checklist" @click.stop="setModalType">Checklist</button>
        <button class="add-date" @click.stop="setModalType">Dates</button>
        <button class="add-attachment" @click.stop="setModalType">Attachment</button>
      </div>
      <section class="modal" v-if="openModalType" @click.stop="stop">
        <component :is="openModalType" @closeModal="closeModal"></component>
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
import { boardService } from '../services/board-service';

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
      openModalType: null,
    };
  },
  async created() {
    this.$store.dispatch({ type: "loadBoard", boardId: "b101" });
    const {cardId, groupId, boardId} = this.$route.params
    const card = await boardService.getCardById(cardId, groupId, boardId)
    console.log('card',card);
  },
  computed: {
    board() {
      return this.$store.getters.selectedBoard;
    },
    selectedCard() {
      return this.$store.getters.selectedCard
    }
  },
  methods: {
    stop(event) {
      // event.stopPropagation
    },
    addUserMember(user) {
      console.log(user);
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
