<template>
	
	<view class="page">
		<!-- <image src="/static/images/weilogo.png" ></image> -->
		<view style="height: 20upx;width: 100%;background: #FFFFFF;"></view>
		<view class="weiLogo" v-if="!userInfo" style="height: 60upx;" @click="gotoPage('me/login')">
			<!-- <image :src="weiLogo" @click="gotoPage('me/login')"></image> -->
			 <view>请登录</view>
		</view>
		<view class="weiLogo" v-if="userInfo">
			<view >
				<image :src="avatarUrl" ></image>
			</view>
		     <view style="margin-left: 30upx;">{{nickName}}</view>
		</view>
		<view style="height: 20upx;"></view>
		<view class="mine">
			<view class="mine-item">
				<image src="/static/images/mine2.png"></image>
				<view class="mine-item-title">兑换订单总数</view>
				<view class="mine-item-number">{{totalGoodOrderNum}}<span style="font-size: 22upx;margin-left: 6upx;">个</span></view>
			</view>
			<view class="mine-item">
				<image src="/static/images/mine1.png"></image>
				<view class="mine-item-title">回收订单总数</view>
				<view class="mine-item-number">{{totalHsOrderNum}}<span style="font-size: 22upx;margin-left: 6upx;">个</span></view>
			</view>
			<view class="mine-item">
				<image src="/static/images/me1.png"></image>
				<view class="mine-item-title">回收总重量</view>
				<view class="mine-item-number">{{totalWeight}}<span style="font-size: 22upx;margin-left: 6upx;">千克</span></view>
			</view>
		</view>
		<view class="subscribe">
			<view class="subscribe-view"  @click="changePage('order/order')">
			  <view class="subscribe-view-left" style="display: flex;">
				  <uni-icons type="list" color="#dddddd" size="18"></uni-icons>
				 <view style="margin-left: 20upx;">订单管理 </view> 
              </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view"  @click="gotoPage('order/address')">
			  <view class="subscribe-view-left" style="display: flex;"> 
			  <uni-icons type="location-filled" color="#dddddd" size="18"></uni-icons>
			  <view  style="margin-left: 20upx;"> 地址管理 </view>
			  </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
<!-- 			<view class="subscribe-view" style="margin-top: 20upx">
			  <view class="subscribe-view-left"> 积分商城 </view>
			  <view class="subscribe-view-right isselect" @click="changePage('shopping/shopping')">
			  </view>
			</view> -->
			<view class="subscribe-view"   @click="gotoPage('shopping/order')">
			  <view class="subscribe-view-left" style="display: flex;">
				   <uni-icons type="cart-filled" color="#dddddd" size="18"></uni-icons>
				  <view  style="margin-left: 20upx;">商城订单</view>
			 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view"   @click="gotoPage('me/recordList')">
			  <view class="subscribe-view-left" style="display: flex;">
				   <uni-icons type="list" color="#dddddd" size="18"></uni-icons>
				  <view  style="margin-left: 20upx;">我的牛币</view>
			 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view"   @click="gotoPage('me/rankList')">
			  <view class="subscribe-view-left" style="display: flex;">
				   <uni-icons type="star-filled" color="#dddddd" size="18"></uni-icons>
				  <view  style="margin-left: 20upx;">牛币排行榜</view>
			 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view"   @click="gotoPage('me/myAddress')">
			  <view class="subscribe-view-left" style="display: flex;">
				   <uni-icons type="location-filled" color="#dddddd" size="18"></uni-icons>
				  <view  style="margin-left: 20upx;">线下门店</view>
			 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view" style="margin-bottom: 40upx;"  @click="openPhone('17733360808')">
			  <view class="subscribe-view-left" style="display: flex;">
				   <uni-icons type="phone-filled" color="#dddddd" size="18"></uni-icons>
				  <view  style="margin-left: 20upx;">客服电话</view>
			 </view>
			  <view class="subscribe-view-right isselect">
				  
			  </view>
			</view>
			<view class="btn" v-if="userInfo" >
				<button type="default" @click="logout()" >退出登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {logout,getMyPageTotal } from"@/api/index.js"
	export default {
		components:{
			uniIcons
		},
		data() {
			return {
			   weiLogo:"/static/images/weilogo.png",
			   nickName:"",
			   avatarUrl:"",
			   weiUser:false,
			   userInfo:false,
			   totalGoodOrderNum: "0", //总商品兑换订单数
			   totalHsOrderNum: "0", //总回收订单数
			   totalWeight: "0" // 总重量
			}
		},
		onLoad() {
			
		},
		onShow() {
			if(uni.getStorageSync("WeiUser")&&uni.getStorageSync("UserInfo")){
				this.weiUser=uni.getStorageSync("WeiUser");
				this.userInfo=uni.getStorageSync("UserInfo");
				this.avatarUrl=getApp().globalData.wUserInfo.avatarUrl
				this.nickName=getApp().globalData.wUserInfo.nickName
				this.getMyPageTotal()
			}	
		},
		methods: {
			openPhone(e){
				uni.makePhoneCall({
				    phoneNumber: e //仅为示例
				});
			},
			getMyPageTotal(){
				getMyPageTotal().then(res=>{
					if(res.returnCode==0){
						this.totalGoodOrderNum=res.result.totalGoodOrderNum
						this.totalHsOrderNum=res.result.totalHsOrderNum
						this.totalWeight=res.result.totalWeight
					}
					
				})
			},
			gotoPage(e){
				if(e=="order/address"||e=="me/recordList"||e=="me/rankList"){
					let user=getApp().globalData.userInfo
					if(JSON.stringify(user)=='{}'){
					   uni.navigateTo({
						url:"../me/login"
					   })
					}	
				}
				uni.navigateTo({
					url:"/pages/"+e
				})
			},
			changePage(e){
			
				let user=getApp().globalData.userInfo
				if(JSON.stringify(user)=='{}'){
				   uni.navigateTo({
				   	url:"../me/login"
				   })
				}
				uni.switchTab({
					url:"../"+e
				})
			},
			logout(){
				logout().then(res=>{
					
					getApp().globalData.userInfo={};
					uni.setStorageSync("UserInfo",false);
					this.userInfo=false;
					/* if(res.returnCode=="0"){
						
					} */
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #F5F5F5;
	}
	.page{
		background: #F5F5F5;
		height: auto;
	}
	@import "@/components/iview/mixin.scss";
	.weiLogo{
		width: 100%;
		height: 140upx;
		background: #FFFFFF;
		padding: 30upx;
		display: flex;
	}
	.weiLogo image{
		width: 140upx;
		height: 140upx;
		border-radius:50%;
	}
	.mine{
		display: flex;
		justify-content:center;
		align-items: center;
		background: #FFFFFF;
		text-align: center;
		padding: 20upx;
	}
	.mine-item{
		flex: 1;
	}
	.mine-item image{
		width: 100upx;
		height: 100upx;
	}
	.mine-item-title{
		color: #9C9C9A;
		font-size: 28upx;
		padding: 10upx 0;
	}
	.mine-item-number{
		color: #31b977;
		font-size: 36upx;
		font-weight: 500;
	}
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
		    left: 80rpx;
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
