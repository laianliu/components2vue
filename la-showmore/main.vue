<template>
  <div class="la-showmore__wrapper">
    <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
      <div class="intro-content"
           :title="msg"
           ref="desc">
        <span class="merchant-desc">{{msg}}</span>
        <div class="unfold"
             @click="showTotalIntro"
             v-if="showExchangeButton">
          <p>{{exchangeButton ? '更多' : '收起'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaShowmore',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      introduce: '',
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: ''
    }
  },
  mounted() {
    // this.init();
  },
  methods: {
    showTotalIntro() {
      this.showTotal = !this.showTotal
      this.exchangeButton = !this.exchangeButton
    },
    getRem() {
      const defaultRem = 4
      let winWidth = window.innerWidth
      let rem = (winWidth / 375) * defaultRem
      return rem
    }
  },
  watch: {
    msg: function () {
      this.$nextTick(
        function () {
          let rem = parseFloat(this.getRem())
          if (!this.$refs.desc) {
            return
          }
          let descHeight = window
            .getComputedStyle(this.$refs.desc)
            .height.replace('px', '')
          if (descHeight > rem) {
            // 显示展开收起按钮
            this.showExchangeButton = true
            this.exchangeButton = true
            // 不是显示所有
            this.showTotal = false
          } else {
            // 不显示展开收起按钮
            this.showExchangeButton = false
            // 没有超过四行就显示所有
            this.showTotal = true
          }
        }.bind(this)
      )
    }
  }
}
</script>

<style lang="less" scoped rel="stylesheet/less">
.la-showmore__wrapper {
  margin: 0;
  padding: 0;
}
.top-prove {
  height: 100px;
  width: 100%;
  background: #dddddd;
  text-align: center;
  line-height: 100px;
}
.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: 16px;
  color: #434343;
  margin: 14px;
  line-height: 22px;
  .intro-content {
    .merchant-desc {
      width: 100%;
    }
  }
  .unfold {
    display: block;
    z-index: 11;
    float: right;
    width: 32px;
    height: 22px;
    cursor: pointer;
    position: relative;
    right: 6px;
    p {
      margin: 0;
      color: #1989d9;
    }
  }
}
.detailed-introduce {
  font-size: 16px;
  color: #434343;
  position: relative;
  overflow: hidden;
  margin: 14px;
  line-height: 22px;
  .intro-content {
    // 最大高度设为4倍的行间距
    max-height: 50px;
    word-wrap: break-word;
    /*强制打散字符*/
    word-break: break-all;
    background: #ffffff;
    /*同背景色*/
    color: #ffffff;
    overflow: hidden;
    .merchant-desc {
      width: 100%;
    }
    &:after,
      // 这是展开前实际显示的内容
      &:before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 4px;
      width: 100%;
      color: #434343;
      // overflow: hidden;
    }
    // 把最后最后一行自身的上面三行遮住
    &:before {
      display: block;
      overflow: hidden;
      z-index: 1;
      max-height: 25px;
      background: #ffffff;
    }
    &:after {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      /*截取行数*/
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
      text-indent: -12em;
      /*尾部留空字符数*/
      padding-right: 40px;
    }
    .unfold {
      z-index: 11;
      width: 40px;
      height: 21px;
      outline: 0;
      position: absolute;
      right: -2px;
      bottom: 2px;
      cursor: pointer;
      p {
        margin: 0;
        line-height: 22px;
        color: #1989d9;
      }
    }
  }
}
</style>
