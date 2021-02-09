<template>
	<view v-if="computerIsShow" class="no-data">
		<image src="/static/images/nodata.png" />
		<view class="no-data-title">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isShowNodata: {
				type: Boolean,
				default: false, // 默认是不显示的
			},
			list: {
				type: Array,
				default: () => []
			}
			
		},
		computed: {
			computerIsShow() {
				let result = null
				if (this.isShowNodata && this.list.length == 0) {
					result = true
				} else {
					result = false
				}
				console.log('result', result)
				return result
			},
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.no-data {
		display: inline-block;
		text-align: center;
		width: 100%;
		padding-top: 166upx;
		padding-bottom: 100upx;

		&-title {
			padding-top: 40upx;
			font-size: 30upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 550;
			color: rgba(0, 0, 0, 0.85);
			line-height: 42upx;
		}

		&-info {
			padding-top: 7upx;
			font-size: 24upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.45);
			line-height: 33upx;
		}

		image {
			width: 469upx;
			height: 389upx;
		}
	}
</style>

<style>

</style>
