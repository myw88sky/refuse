<template>
  <div>
    <scroll-view v-if="scroll" scroll-x=true class="i-tabs i-tabs-scroll" v-bind:class="classObj">
      <slot></slot>
    </scroll-view>
    <div class="i-tabs" v-else><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    scroll: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    iClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    classObj() {
      const fixedClass = this.fixed ? 'i-tabs-fixed' : ''
      return this.iClass + ' ' + fixedClass
    },
    noScrollClass() {
      const fixedClass = this.fixed ? 'i-tabs-fixed' : ''
      return this.iClass + ' ' + fixedClass
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('change', newVal)
      }
    }
  }
}
</script> 

<style lang="scss" scoped> 
	.i-tabs {
	  display: -webkit-box;
	  display: -webkit-flex;
	  display: -ms-flexbox;
	  display: flex;
	  width: 100%;
	  height: 86upx;
	  line-height: 86upx;
	  -webkit-box-sizing: border-box;
	          box-sizing: border-box;
	  position: relative;
	  -webkit-justify-content: space-around;
	      -ms-flex-pack: distribute;
	          justify-content: space-around;
	  -webkit-align-items: center;
	      -ms-flex-align: center;
	          align-items: center;
	  -webkit-box-align: center;
	  background: #fff;
	}
	.i-tabs::after {
	  content: '';
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 200%;
	  height: 200%;
	  -webkit-transform: scale(0.5);
	      -ms-transform: scale(0.5);
	          transform: scale(0.5);
	  -webkit-transform-origin: 0 0;
	      -ms-transform-origin: 0 0;
	          transform-origin: 0 0;
	  pointer-events: none;
	}
	.i-tabs-scroll {
	  display: block;
	  overflow-x: auto;
	  white-space: nowrap;
	}
	.i-tabs-fixed {
	  position: fixed;
	  top: 0;
	  z-index: 2;
	}

</style>

