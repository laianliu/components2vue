<template>
  <a class="la-export__wrapper"
     :href="href">导出数据</a>
</template>

<script>
export default {
  name: 'LaExport',
  props: {
    href: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style scoped>
.la-export__wrapper {
  cursor: pointer;
  /* text-decoration: underline; */
  font-size: 16px;
  color: #1d7ce4;
  padding: 0 14px 0 0;
}
</style>
