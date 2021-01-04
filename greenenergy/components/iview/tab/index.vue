<template>
  <div class="i-tabs-tab" v-bind:class="classObj">
    <div class="i-tabs-tab-content">
      <i-badge :dot="dot" :count="remindCount">
        <div @click.stop="handleClickItem"  >
          <div class="i-tabs-tab-title"
            v-bind:class="{'i-tabs-tab-title-current': current}"
            v-if="current"
            v-bind:style="{color: currentColor}">{{ title }}</div>
          <div class="i-tabs-tab-title"
            v-bind:class="{'i-tabs-tab-title-current': current}"
            v-else>{{ title }}</div>
        </div>
      </i-badge>
      <view class="i-tabs-tab-bar" v-if="current" v-bind:style="{background: currentColor}"></view>
    </div>
  </div>
</template>
<script>
import badge from '../badge.vue'
export default {
  components: {
    'i-badge': badge
  },
  props: {
    itemKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    dot: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    },
    iClass: {
      type: String,
      default: ''
    },
    scroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = this.$parent.scroll
  },
  computed: {
    classObj() {
      const tabScrollClass = this.scroll ? 'i-tabs-tab-scroll' : ''
      const tabCurrentClass = this.current ? 'i-tabs-tab-current' : ''
      return this.iClass + ' ' + tabScrollClass + ' ' + tabCurrentClass
    },
    remindCount() {
      return this.dot ? 0 : this.count
    },
    current() {
      return this.$parent.value === this.itemKey
    },
    currentColor() {
      return this.$parent.color
    }
  },
  methods: {
    handleClickItem() {
      this.$parent.$emit('input', this.itemKey)
    }
  },
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
	  right: -16upx;
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
	.i-tabs-tab {
		 height: 86upx;
	  -webkit-box-flex: 1;
	  -webkit-flex: 1;
	      -ms-flex: 1;
	          flex: 1;
	  display: -webkit-box;
	  display: -webkit-flex;
	  display: -ms-flexbox;
	  display: flex;
	  width: 100%;
	  -webkit-box-pack: center;
	  -webkit-justify-content: center;
	      -ms-flex-pack: center;
	          justify-content: center;
	  -webkit-box-align: center;
	  -webkit-align-items: center;
	      -ms-flex-align: center;
	          align-items: center;
	  -webkit-box-orient: vertical;
	  -webkit-box-direction: normal;
	  -webkit-flex-direction: column;
	      -ms-flex-direction: column;
	          flex-direction: column;
	  text-align: center;
	}
	.i-tabs-tab-content {
	  position: relative;
	  width: 100%;
	  height: 86upx;
	  padding-top:20upx;
	}
	.i-tabs-tab-bar {
	  display: block;
	  width: 64upx;
	  height: 4upx;
	  background: transparent;
	  position: absolute;
	  bottom: 0;
	  left: 50%;
	  transform: translateX(-50%);
	  background: rgba(0,95,255,1);
	}
	.i-tabs-tab-title {
	  font-size: 32upx;
	  text-align: center;
	  -webkit-box-sizing: border-box;
	          box-sizing: border-box;
	  color: #222222;
      height:44upx;
	  line-height:44upx;
	  font-weight:400;
	}
	.i-tabs-tab-title-current {
	  height:44upx;
	  font-size:32upx;
	  font-weight:400;
	  color:rgba(0,95,255,1);
	  line-height:44upx;
	}
	.i-tabs-tab-scroll {
	  display: inline-block;
	  width: 60px;
	}

</style>
