<template>
	<view>
		<view class="subscribe">
			<view class="subscribe-view" v-for='(item,index) in list' :key="index" >
			  <view class="subscribe-view-left" style="display: flex;">
				  <view v-if='index>2' style="width:40upx;text-align: center;">{{index+1}}</view>
				  <view v-else style="display: flex;align-items: center;">
					  <image :src="rankImage[index]" style="width: 40upx;height: 40upx;"></image>
				  </view>
				  <!-- <image :src="BASEURL+avatar" style="width: 40upx;height: 40upx;"></image> -->
				  <view  style="margin-left: 20upx;">{{item.name}}</view>
			 </view>
			  <view class="subscribe-view-right">
				  牛币数：{{item.remainScore}}
			  </view>
			</view>
			<no-message :isShowNodata="isShowNodata"  :list="list" />
		</view>
		
	</view>
</template>

<script>
	import noMessage from '@/components/no-message/no-message.vue'
	import { BASEURLImg } from '@/common/utils.js'
	import {getUserByRemainScoreLimit} from"@/api/index.js"
	export default {
		components: {
			noMessage
		},
		data() {
			return {
				BASEURL:BASEURLImg,
				avatar: "/filesystem/headImg/avatar.jpg",
				list:[],
				isShowNodata:false,
				rankImage:['/static/images/rank1.png','/static/images/rank2.png','/static/images/rank3.png']
			}
		},
		onLoad() {
			this.getUserByRemainScoreLimit()
		},
		methods: {
			getUserByRemainScoreLimit(){
				this.isShowNodata=false
				getUserByRemainScoreLimit().then(res=>{
					if(res.returnCode=='0'){
						this.list=res.result
						this.isShowNodata=true
					}
				})
			},
			getOrder(order){
				return order+1
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/components/iview/mixin.scss";
.subscribe{
		background-color: #FFFFFF;
		margin-top: 30upx;
		&-view {
		  height: 100upx;
		  line-height: 100upx;
		  padding-left: 30rpx;
		  padding-right: 30rpx;
		  display: flex;
		  justify-content: space-between;
		  position: relative;
		  &::after {
		    @include hairline();
		    border-bottom-width: 1px;
		    border-bottom-color: #d8d8d8;
		    top: 0upx;
		    left: 30rpx;
		  }
		  &-left {
		    line-height: 100rpx;
		    font-size: 28rpx;
		    font-weight: 400;
		    color: #BABABA;
		
		    &.isrequired {
		      position: relative;
		      padding-right: 16rpx;
		
		      &::before {
		        content: "*";
		        display: inline-block;
		        line-height: 100rpx;
		        position: absolute;
		        right: 0px;
		        color: #d0021b;
		      }
		    }
		  }
		
		  &-right {
		    line-height: 100rpx;
		    position: relative;
		    padding-right: 20rpx;
		    font-size: 28rpx;
		
		    &.nodata {
		      color: rgba(153, 153, 153, 1);
		    }
		
		    &.isselect {
		      position: relative;
		
		      &::before {
		        content: " ";
		        display: inline-block;
		        width: 6px;
		        height: 6px;
		        position: absolute;
		        top: 50%;
		        right: 0rpx;
		        border-width: 2px 2px 0 0;
		        border-color: #b0b0b0;
		        border-style: solid;
		        transform: translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		      }
		    }
		  }
		}
		.btn{
			position:relative;
			margin: 30upx;
			width: calc(100% - 60upx) ;
		}
	}
</style>
