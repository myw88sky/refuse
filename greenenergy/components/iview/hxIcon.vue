<template>
  <div class="i-icon" v-bind:class="classObj" v-bind:style="{color: color, fontSize: size + 'px'}" @click="clickHandle"></div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    custom: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: ''
    },
    iClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    classObj() {
      const iconType = this.type ? 'i-icon-' + this.type : ''
      const custom = this.custom ? this.custom : ''
      return this.iClass + ' ' + iconType + ' ' + custom
    }
  },
  methods: {
    clickHandle() {
      this.$emit('click')
    }
  }
}
</script>

<style>
	@import './icon.css';
</style>
