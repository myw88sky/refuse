<template>
	<view class="content">
		<image class="logo" src="/static/images/banner_02.jpg"></image>
		<view class="static">
			<view class="static-item">
				<view class="static-item-type">累计积分</view>
				<view class="static-item-number">0<span style="font-size: 24upx;">分</span></view>
			</view>
			<view class="static-item">
				<view class="static-item-type">累计回收</view>
				<view class="static-item-number">0 <span style="font-size: 24upx;">kg</span></view>
			</view>
			<view class="static-item">
				<view class="static-item-type">累计收益</view>
				<view class="static-item-number">0 <span style="font-size: 24upx;">元</span></view>
			</view>
		</view>	
		  <view class="page-section-spacing">
			<swiper class="swiper" 
				indicator-dots="true" 
				autoplay="true" 
				interval="5000" 
				duration="1500"	>
				<swiper-item v-for="(item,index) in lunbo" :key="index">
					<image :src="item.img" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		  </view>
		 <view class="order-class">
			 <view class="order-class-item" @click="addOrder(1)">
				 <image src="/static/images/index1.png" mode="aspectFill"></image>
			 </view>
			 <view class="order-class-item" @click="addOrder(2)" style="margin-left: 8upx;" >
			 	 <image src="/static/images/index2.png" mode="aspectFill"></image>
			 </view>
		 </view>  
		 <view class="order-class">
			 <view class="order-class-item"  @click="addOrder(3)">
				 <image src="/static/images/index3.png" mode="aspectFill"></image>
			 </view>
			 <view class="order-class-item" @click="addOrder(4)" style="margin-left: 8upx;"  >
			 	 <image src="/static/images/index4.png" mode="aspectFill"></image>
			 </view>
		 </view> 
		 <view class="phone">
			 <view class="phone-item" style="margin-left: 30upx;" >服务热线</view>
			 <view class="phone-item" style="margin-right: 30upx;display: flex;color: #31b977;" @click="openPhone()">
				 <uni-icons type="phone-filled" color="#31b977" size="24"></uni-icons>
			     <view>18255157968</view>
			 </view>
		 </view>
		 <view class="other">
			 <view class="other-title">
				 其他功能
			 </view>
			 <view class="other-content">
				<!-- <view class="other-content-item">
					 <image src="/static/images/qt1.png"></image>
					 <view>附件回收员</view>
				 </view>
				 <view class="other-content-item">
					 <image src="/static/images/qt2.png"></image>
					 <view>服务咨询</view>
				 </view> -->
				 <view class="other-content-item" @click="changePage()">
					 <image src="/static/images/qt3.png"></image>
					 <view>积分商城</view>
				 </view>
				 <view class="other-content-item" @click="gotoPage()">
					 <image src="/static/images/qt4.png"></image>
					 <view>地址管理</view>
				 </view>
			 </view>
		 </view>
		 <view class="cu-reclaimss" @click="addOrder(1)">
			<view class="cu-reclaims">
			     <view class="cu-reclaim" >
			         <image src="/static/images/xunhuan.svg" style="width:60upx;height:60upx;margin:50upx 80upx 4upx;"></image>
			         <view style="color: #FFFFFF;text-align: center;font-size: 36upx;" > 一键预约</view>
			     </view>
			 </view>
		 </view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {fakeLogin} from"@/api/index.js"
	export default {
		components:{
			uniIcons
		},
		data() {
			return {
				lunbo: [{
					img:"/static/images/liu1.png"
				},
				{
					img:"/static/images/liu2.png"
				},
				{
					img:"/static/images/liu3.png"
				}],
				getWeiUser:"",
	            wUserInfo:{},
				userInfo:{},
				model:{
					userAddress:"",//预约地址
					addressId:""
				}
			}
		},
		onLoad() {
			console.log("333")
          /* this.getWeiUser=uni.getStorageSync("WeiUser")
		  if(this.getWeiUser){
			  this.login()
		  } */
		},
		methods: {
			addOrder(type){
			   this.userInfo=getApp().globalData.userInfo
			   if(JSON.stringify(this.userInfo)=='{}'){
			      uni.navigateTo({
			      	url:"../me/login"
			      })
			   }
				uni.navigateTo({
					url:"../order/addOrder?type="+type
				})
			},
			login(){
				this.wUserInfo=getApp().globalData.wUserInfo
				let data={
					username:this.wUserInfo.nickName,
					password:"123456"
				}
				fakeLogin(data).then(res=>{
					if(res.returnCode=="0"){
						getApp().globalData.userInfo=res.result
					}
				})
			},
			gotoPage(){
				this.userInfo=getApp().globalData.userInfo
				if(JSON.stringify(this.userInfo)=='{}'){
				   uni.navigateTo({
				   	url:"../me/login"
				   })
				}
				uni.navigateTo({
					url:"../order/address"
				})
			},
			changePage(){
				this.$api.msg("开发中...")
				return false;
				/* uni.switchTab({
					url:"../shopping/shopping"
				}) */
			},
			openPhone(){
				uni.makePhoneCall({
				    phoneNumber: '18255157968' //仅为示例
				});
			},
			getSelectAddress(item){
				this.model.userAddress=item.locationAddress+"("+item.addressDetail+")"
			    this.model.addressId=item.id;
			},

		}
	}
</script>

<style>
	.content {
		height: auto;
	}
	.logo {
		height: 300upx;
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
		margin-top: 20upx;
	}
	.static{
		height: 200upx;
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
		background: white;
		-webkit-box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
		box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
		-webkit-border-radius: 20upx;
		border-radius: 20upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.static-item{
		flex:1;
		text-align: center;
	}
	.static-item-type{
		font-size: 36upx;
		color: #222222;
	}
	.static-item-number{
		margin-top: 40upx;
		font-size: 50upx;
		color: #31b977;
	}
    .page-section-spacing{
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
	}
	.swiper{
		height: 300upx;
		width: 100%;
	}

	// swiper-item 里面的图片高度
	swiper-item image{
		width: 100%;
		height: 300upx;
		border-radius: 20upx 20upx 0 0;
	}
	
	.order-class{
		display: flex;
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
	}
	.order-class-item{
		height: 200upx;
		width: calc(50% - 4upx);
	}
	
	.order-class-item image{
		width: 100%;
		height: 200upx;
		border-radius: 14upx;
	}
	.phone{
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
		background-color: #F7F7F7;
		border-radius: 20upx 20upx 20upx 20upx;
		display: flex;
		height: 140upx;
		align-items:center;
		justify-content:space-between;
	}
    .phone-item{
		font-size: 40upx;
		color: #222222;
	}
	.other{
        width: calc(100% - 60upx);
		margin: 30upx 30upx 60upx;
	}	
	.other-title{
		font-size: 40upx;
		color: #222222;
		font-weight: 700;
	}
	.other-content{
		margin-top: 60upx;
		display: flex;
		align-items:center;
		justify-content:center;
	}
	.other-content-item{
		flex: 1;
		text-align: center;
	}
	.other-content-item image{
		width: 120upx;
		height: 100upx;
	}
	
	.cu-reclaim {
	    height: 220upx;
	    width: 220upx;
	    border-radius: 110upx 110upx 110upx 110upx;
	    background-color: rgba(50,186,120,1);
		position: absolute;
		top: 20upx;
		left: 20upx;
	}
	
	.cu-reclaims {
	    background-color: rgba(50,186,120,0.5);
	    height: 260upx;
	    width: 260upx;
	    border-radius: 130upx 130upx 130upx 130upx;
		position: absolute;
		top: 50upx;
		left: 50upx;
	}
	
	.cu-reclaimss {
	    background-color: rgba(50,186,120,0.3);
	    height: 360upx;
	    width: 360upx;
		margin: 0 auto;
		border-radius: 180upx 180upx 180upx 180upx;
		position: relative;
	    animation: one-reclaim 0.6s infinite linear;
	    animation-direction: alternate;
	}
	
	@keyframes one-reclaim {
	    0% {
	        opacity: 0;
	        transform: scale(0.5);
	    }
	
	    100% {
	        opacity: 1;
	        transform: scale(1);
	    }
	}
	
	
</style>
