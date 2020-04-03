<template>
  <transition>
    <div class="la-panel-wrapper">
      <div class="la-panel-title">
        <span>{{title}}</span>
        <i class="el-icon-close"
           @click="handleCloseClick"
           style="position: absolute;right:20px;cursor:pointer;"></i>
      </div>
      <div class="la-panel-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LaPanel',
  props: {
    title: {
      type: String,
      default: '面板组件'
    }
  },

  methods: {
    handleCloseClick() {
      this.$emit('closePanel', false)
    }
  }
}
</script>

<style scoped>
.la-panel-wrapper {
  position: absolute;
  top: 3.6rem;
  right: 1rem;
  width: 410px;
  bottom: 1rem;
  z-index: 9999;
}
.la-panel-title {
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  position: relative;
}

.la-panel-content {
  position: absolute;
  top: 45px;
  width: 100%;
  bottom: 0px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.la-panel-content::-webkit-scrollbar {
  display: none;
}
</style>
