<template>
  <div class="toolbar-button toolbar-button-long" title="截屏">
    <img class="toolbar-button-icon toolbar-button-icon-long" src="@/assets/onemap-screenshot.png" />
    <p class="toolbar-button-text-long">截屏</p>
  </div>
</template>
<script>
import screenshot from './widget'
export default {
  name: 'ScreenshotItem',
  components: {
    screenshot
  },
  data() {
    return {}
  }
}
</script>
<style>
</style>
