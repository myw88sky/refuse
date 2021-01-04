<template>
	<view v-if="list.length == 0" class="no-data">
		<image src="/static/images/no-message.png" />
		<view class="no-data-title">
			暂无食谱
		</view>
		<view class="no-data-info">
			请先添加本周食谱
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			type: {
				type:String,
				default: '待办'
			}
		},
		computed: {
			messageTitle() {
				return this.type
			}
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
