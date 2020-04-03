<template>
  <div class="la-loading-wrapper">
    <div>
      <svg viewBox="0 0 50 50"
           class="svg-icon m-loading init-loading">
        <circle cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#F2F2F2"
                class="path"></circle>
        <circle cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#24A2FF"
                stroke-dasharray="60,150"
                class="path"></circle>
      </svg>
    </div>

    <p class="init-tips">{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'LaLoading',
  props: {
    content: {
      type: String,
      default: '初次加载，请耐心等待...'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 40px;
  height: 40px;
  stroke: #343640;
  stroke-width: 2;
  stroke-linecap: round;
}

.svg-icon .path {
  fill: none;
}

.m-wipe {
  background: none;
  animation: loading-rotate 2s linear infinite;
}

.m-wipe .path {
  background: none;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: #20a0ff;
  stroke-linecap: round;
  animation: loading-wipe 1.5s ease-in-out infinite;
}

.m-loading {
  background: none;
  animation: loading-rotate 0.8s linear infinite;
}

@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}

@keyframes loading-wipe {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

.la-loading-wrapper {
  position: absolute;
  top: calc(50% - 67px);
  left: calc(50% - 67px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.la-loading-wrapper .init-loading {
  width: 128px;
  height: 128px;
}

.la-loading-wrapper .init-tips {
  color: #1d7fca;
}
</style>
