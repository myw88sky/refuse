<template>
	<view>
		<view class="subscribe">
			<view class="subscribe-view" @click="openMap('阜阳市颍州区长安路碧桂园.翡翠湾')">
				<view class="subscribe-view-left">
					  <view>小牛换吧（碧桂园店）</view>
					  <view>阜阳市颍州区长安路碧桂园.翡翠湾</view>
				</view>
				 <view class="subscribe-view-right" style="color: #ecbbac;">
					导航
				 </view>
			</view>
		<!-- 	<no-message :isShowNodata="isShowNodata"  :list="list" /> -->
		</view>
		
	</view>
</template>

<script>
	import {
		geocoder,
		getLocation,
		reverseGeocoder,
	} from '@/common/qqmap-util.js'
	import noMessage from '@/components/no-message/no-message.vue'
	import {getMyPerList} from"@/api/index.js"
	export default {
		components: {
			noMessage
		},
		data() {
			return {
				//list:[],
				//isShowNodata:false
			}
		},
		onLoad() {
			//this.getMyPerList()
		},
		methods: {
			openMap(e){
				let self=this;
				geocoder(e).then(res => {
					const latitude = res.result.location.lat
					const longitude = res.result.location.lng
					wx.openLocation({
					  latitude,
					  longitude,
					  scale: 18
					})
				}).catch(err => {
						
				})
			},
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
		  padding-left: 30rpx;
		  padding-right: 30rpx;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  position: relative;
		  &::after {
		    @include hairline();
		    border-bottom-width: 1px;
		    border-bottom-color: #d8d8d8;
		    top: 0upx;
		    left: 30rpx;
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
