<template>
<section class="add-to-card">
  <div class="block">
    <span class="demonstration">Date</span>
    <el-date-picker ref="dateInput"
      v-model="value1"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
  </div>
</section>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
        value1: '',
      };
    },
    mounted() {
    this.$refs.dateInput.focus();
  },
  };
</script>