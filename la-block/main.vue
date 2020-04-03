<template>
  <div class="la-block__wrapper"
       :class="[{
         'is-row': row,
         'is-column': col
       }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LaBlock',
  props: {
    row: Boolean,
    col: Boolean
  }
}
</script>

<style scoped>
.la-block__wrapper {
  width: 100%;
  line-height: 22px;
}
.is-row {
  flex-direction: row;
}
.is-column {
  flex-direction: column;
}
</style>
