<template>
  <div class="la-column__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LaCol',
  props: {
    column: {
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
.la-column__wrapper {
  width: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
</style>
