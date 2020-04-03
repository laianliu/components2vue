<template>
  <div class="la-row__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LaRow',
  props: {
    row: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.la-row__wrapper {
  width: 100%;
  margin: 10px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
}
</style>

