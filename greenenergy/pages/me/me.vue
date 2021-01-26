<template>
	<view class="page">
		<view style="height: 20upx;width: 100%;background: #FFFFFF;"></view>
		<view class="weiLogo" v-if="!userInfo">
			 <image  :src="weiLogo" @click="gotoPage('me/login')"></image>
			 <view>请登录</view>
		</view>
		<view class="weiLogo" v-if="userInfo">
			 <image  :src="avatarUrl"></image>
		     <view>{{nickName}}</view>
		</view>
		<view style="height: 20upx;"></view>
		<view class="mine">
			<view class="mine-item">
				<image src="/static/images/mine_rec.png"></image>
				<view class="mine-item-title">回收物品</view>
				<view class="mine-item-number">0<span style="font-size: 22upx;margin-left: 6upx;">千克</span></view>
			</view>
			<view class="mine-item">
				<image src="/static/images/mine_open.png"></image>
				<view class="mine-item-title">减少碳排放</view>
				<view class="mine-item-number">0<span style="font-size: 22upx;margin-left: 6upx;">千克</span></view>
			</view>
			<view class="mine-item">
				<image src="/static/images/mine_pro.png"></image>
				<view class="mine-item-title">保护树木</view>
				<view class="mine-item-number">0<span style="font-size: 22upx;margin-left: 6upx;">棵</span></view>
			</view>
		</view>
		<view class="subscribe">
			<view class="subscribe-view" style="margin-top: 20upx" @click="changePage('order/order')">
			  <view class="subscribe-view-left"> 订单管理 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view" style="margin-top: 20upx" @click="gotoPage('order/address')">
			  <view class="subscribe-view-left"> 地址管理 </view>
			  <view class="subscribe-view-right isselect">
			  </view>
			</view>
			<view class="subscribe-view" style="margin-top: 20upx">
			  <view class="subscribe-view-left"> 积分商城 </view>
			  <view class="subscribe-view-right isselect" @click="changePage('shopping/shopping')">
			  </view>
			</view>
			<view class="subscribe-view" style="margin-top: 20upx">
			  <view class="subscribe-view-left"> 商城订单 </view>
			  <view class="subscribe-view-right isselect" @click="gotoPage('shopping/order')">
			  </view>
			</view>
		</view>
		<view class="btn" v-if="userInfo" >
			<button type="default" @click="logout()" >退出登录</button>
		</view>
	</view>
</template>

<script>
	import {logout} from"@/api/index.js"
	export default {
		data() {
			return {
			   weiLogo:"/static/images/weilogo.png",
			   nickName:"",
			   avatarUrl:"",
			   weiUser:false,
			   userInfo:false,
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
			}	
		},
		methods: {
			gotoPage(e){
				if(e=="order/address"){
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
				if(e=="shopping/shopping"){
					this.$api.msg("开发中...")
					return false;
				}
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
		height: 300upx;
		background: #FFFFFF;
		/* display: flex;
		align-items: center;
		justify-content:center; */
		margin: 0 auto;
		text-align: center;
	}
	.weiLogo image{
		width: 160upx;
		height: 160upx;
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
		font-size: 30upx;
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
		    left: 30rpx;
		  }
		  &-left {
		    line-height: 100rpx;
		    font-size: 32rpx;
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
		    font-size: 32rpx;
		
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
	}
 .btn{
 	position:fixed;
 	bottom: 40upx;
 	left:30upx;
 	width: calc(100% - 60upx) ;
 }
</style>
