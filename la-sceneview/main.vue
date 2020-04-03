<template>
  <div class="la-scentview__wrapper">
    <vc-viewer ref="sceneview" :cesiumPath="path">
      <slot></slot>
    </vc-viewer>
  </div>
</template>
<script>
export default {
  name: "LaSceneview",
  props: {
    path: String
  },
  data() {
    return {};
  },
  mounted() {
    if (!window.Cesium) {
      this.$refs.sceneview.getCesiumScript();
    }
  }
};
</script>

<style>
.la-scentview__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
}
</style>
