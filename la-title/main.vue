<template>
  <div class="la-title__wrapper">
    <div class="la-title-container">
      <i :class="iconClass"
         v-if="showIcon"></i>
      <span class="la-title-content"
            :class="[fontSize, noMargin]">{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LaTitle',
  props: {
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'rect'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    iconClass() {
      return `la-title-${this.type}`
    },
    fontSize() {
      return this.type
    },
    noMargin() {
      if (!this.showIcon) {
        return 'no-margin'
      }
      return ''
    }
  }
}
</script>

<style scoped>
.la-title__wrapper {
  display: flex;
  align-items: center;
  margin: 25px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.la-title-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.la-title-rect {
  width: 4px;
  height: 16px;
  background: rgba(82, 144, 242, 1);
  border-radius: 2px;
}
.la-title-circle {
  width: 6px;
  height: 6px;
  background: rgba(48, 48, 48, 1);
  border-radius: 50%;
}
.la-title-content {
  line-height: 22px;
  font-weight: bold;
  margin: 0 0 0 10px;
}
.no-margin {
  margin: 0;
}
.normal {
  font-size: 18px;
  margin: 0 0 0 14px;
  font-weight: unset;
}
.rect {
  font-size: 18px;
}
.circle {
  font-size: 16px;
}
</style>
