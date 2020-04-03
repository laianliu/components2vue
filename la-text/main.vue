<template>
  <p class="la-text__wrapper">{{content}}</p>
</template>

<script>
export default {
  name: 'LaText',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.la-text__wrapper {
  font-size: 16px;
  padding: 0 14px;
  /* text-indent: 32px; */
}
</style>
