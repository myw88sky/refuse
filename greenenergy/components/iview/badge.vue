<template>
  <div class="i-badge" v-bind:class="iClass">
    <slot></slot>
    <view class="i-badge-dot" v-if="dot"></view>
    <view class="i-badge-count" v-bind:class="iClassAlone" v-else-if="count !== 0">{{ finalCount }}</view>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    overflowCount: {
      type: Number,
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    iClass: {
      type: String,
      default: ''
    },
    iClassAlone: {
      type: String,
      default: ''
    }
  },
  computed: {
    finalCount() {
      return parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
    }
  }
}
</script>
<style lang="scss" scoped>
	.i-badge {
	  width: 128upx;
	  position: relative;
	  display: inline-block;
	  line-height: 1;
	  vertical-align: middle;
	}
	.i-badge-count {
	  position: absolute;
	  -webkit-transform: translateX(50%);
	      -ms-transform: translateX(50%);
	          transform: translateX(50%);
	  top: -8upx;
	  left: 80rpx;
	  height: 30upx;
	  border-radius: 16upx;
	  min-width: 30upx;
	  background: #E84243;
	  border: 1upx solid transparent;
	  color: #fff;
	  line-height: 30upx;
	  text-align: center;
	  font-weight:400;
	  font-size: 24upx;
	  white-space: nowrap;
	  -webkit-transform-origin: -10% center;
	      -ms-transform-origin: -10% center;
	          transform-origin: -10% center;
	  z-index: 10;
	  -webkit-box-shadow: 0 0 0 1px #fff;
	          box-shadow: 0 0 0 1px #fff;
	 /* -webkit-box-sizing: border-box;
	          box-sizing: border-box; */
	  text-rendering: optimizeLegibility;
	}
	.i-badge-count-alone {
	  top: auto;
	  display: block;
	  position: relative;
	  -webkit-transform: translateX(0);
	      -ms-transform: translateX(0);
	          transform: translateX(0);
	}
	.i-badge-dot {
	  position: absolute;
	  -webkit-transform: translateX(-50%);
	      -ms-transform: translateX(-50%);
	          transform: translateX(-50%);
	  -webkit-transform-origin: 0 center;
	      -ms-transform-origin: 0 center;
	          transform-origin: 0 center;
	  top: -4px;
	  right: -8px;
	  height: 8px;
	  width: 8px;
	  border-radius: 100%;
	  background: #E84243;
	  z-index: 10;
	  -webkit-box-shadow: 0 0 0 1px #fff;
	          box-shadow: 0 0 0 1px #fff;
	}
</style>

