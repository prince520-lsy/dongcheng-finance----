<template>
  <a-range-picker
    :key="id"
    ref="rangeDate"
    format="YYYY-MM-DD HH:mm:ss"
    :showTime="{ hideDisabledOptions: true }"
    showToday
    @change="onChange"
    style="width: 100%"
  ></a-range-picker>
</template>

<script>
export default {
  name: 'RangeDate',
  data() {
    return {
      id: +new Date()
    }
  },
  methods: {
    onChange(date, dateString) {
      this.$emit('change', dateString)
    },
    reset() {
      this.id = +new Date()
    }
  }
}
</script>
