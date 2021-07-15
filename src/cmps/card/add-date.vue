<template>
  <div class="add-to-card">
    <span class="demonstration">Date: </span>
    <el-date-picker @change="addDate"
      ref="dateInput"
      v-model="date"
      type="datetime"
      placeholder="Select date and time"
      value-format="timestamp"
      default-time="12:00:00">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        date: ''
      };
    },
  
  mounted() {
    this.$refs.dateInput.focus();
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addDate(){
      this.$emit("addDate",this.date);
    }
  },
};
</script>
      