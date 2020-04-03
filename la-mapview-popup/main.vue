<template>
  <div class="la-mapview-popup__wrapper"
       :style="position"
       v-show="visible">
    <div class="la-mapview-popup__content">
      <span v-if="!custom">{{content}}</span>
      <slot></slot>
    </div>
    <div class="la-mapview-popup__tip"></div>
  </div>
</template>

<script>
export default {
  name: 'LaMapviewPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top:0px;left:0px;'
    },
    content: {
      type: String,
      default: ''
    },
    custom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.la-mapview-popup__wrapper {
  width: auto;
  height: auto;
  background-color: #fff;
  position: absolute;
  border-radius: 6px;
  transform: translate(-50%, -120%);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.la-mapview-popup__content {
  margin: 10px 10px 0px 10px;
}
.la-mapview-popup__tip {
  position: relative;
  top: 5px;
  left: calc(50% - 4px);
  background-color: white;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg); /* IE 9 */
  -moz-transform: rotate(45deg); /* Firefox */
  -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
  -o-transform: rotate(45deg); /* Opera */
}
span {
  color: #464c5b;
}
</style>
