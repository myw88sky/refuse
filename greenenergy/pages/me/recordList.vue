<template>
	<view>
		<view class="subscribe">
			<view class="subscribe-view" v-for="(item,index) in list" :key="index" @click="showDesr(item.description)">
				<view class="subscribe-view-left" style="display: flex;">
					  <view>{{getRecordContent(item.type)}}：{{item.integral?item.integral:'0'}}个牛币</view>
				</view>
				 <view class="subscribe-view-right">
					{{item.createTimeStr}}
				 </view>
			</view>
			<no-message :isShowNodata="isShowNodata"  :list="list" />
		</view>
		
	</view>
</template>

<script>
	import noMessage from '@/components/no-message/no-message.vue'
	import {getMyPerList} from"@/api/index.js"
	export default {
		components: {
			noMessage
		},
		data() {
			return {
				list:[],
				isShowNodata:false
			}
		},
		onLoad() {
			this.getMyPerList()
		},
		methods: {
			getRecordContent(type){
				if(type=='1'){
					return '兑换商品扣除'
				}
				if(type=='2'){
					return '回收订单增加'
				}
				if(type=='3'){
					return '取消兑换返还'
				}
				
			},
			showDesr(desc){
				uni.showModal({
					title: '提示',
					    content: desc,
						showCancel:false,
					    success: function (res) {
						if (res.confirm) {
							
						}
					}
				})
			},
			getMyPerList(){
				let data={
					page:1,
					rows:100
				}
				this.isShowNodata=false
				getMyPerList(data).then(res=>{
					this.list=res.rows
					this.isShowNodata=true
				})
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
