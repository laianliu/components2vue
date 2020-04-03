<template>
  <div class="la-button__wrapper">
    <img v-if="isShow"
         :src="imgUrl" />
  </div>
</template>

<script>
export default {
  name: 'LaButton',
  props: {
    type: String,
    fn: Function
  },
  data() {
    return {
      addImgUrl: require('@/assets/plananalyse/add.png'),
      reduceImgUrl: require('@/assets/plananalyse/reduce.png')
    }
  },
  mounted() { },
  computed: {
    imgUrl() {
      if (this.type === 'add') {
        return this.addImgUrl
      } else if (this.type === 'reduce') {
        return this.reduceImgUrl
      }
    },
    isShow() {
      if (!this.type) return false
      else return true
    },
    handleBtnClick() {
      return this.fn
    }
  },
  methods: {}
}
</script>

<style scoped>
.la-button__wrapper {
  width: 52px;
  height: 40px;
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
}
</style>
