<template>
	<view class="content">
		<image class="logo" src="/static/images/banner_02.jpg"></image>
		<view class="static">
			<view class="static-item" style="border-radius: 20upx 0 0 20upx;">
				<view class="static-item-type">累计牛币</view>
				<view class="static-item-number">{{userInfo.remainScore?userInfo.remainScore:0}}<span style="font-size: 24upx;">个</span></view>
			</view>
			<view class="static-item">
				<view class="static-item-type">累计回收</view>
				<view class="static-item-number">{{totalWeight}} <span style="font-size: 24upx;">kg</span></view>
			</view>
			<view class="static-item" style="border-radius:0 20upx 20upx 0;">
				<view class="static-item-type">累计收益</view>
				<view class="static-item-number">{{totalPrice}}<span style="font-size: 24upx;">元</span></view>
			</view>
		</view>	
		<view class="city">
			<view class="city-item">当前城市</view>
			<view class="city-item" style="color: #31b977;">{{city}}<uni-icons v-if="city" type="location-filled" color="#31b977" size="20"></uni-icons></view>
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
			 <view class="phone-info"> 
				 <view class="phone-item" style="margin-left: 30upx;" >全国服务热线</view>
				 <view class="phone-item" style="margin-right: 30upx;display: flex;color: #31b977;" @click="openPhone('18156277182')">
					 <uni-icons type="phone-filled" color="#31b977" size="16"></uni-icons>
					 <view>18156277182</view>
				 </view>
			 </view>
			 <view class="phone-info">
				 <view class="phone-item" style="margin-left: 30upx;" >本地服务热线</view>
				 <view class="phone-item" style="margin-right: 30upx;display: flex;color: #31b977;" @click="openPhone('17733360808')">
					 <uni-icons type="phone-filled" color="#31b977" size="16"></uni-icons>
					 <view>17733360808</view>
				 </view>
			 </view>
		 </view>
		<!-- <view class="room">
			 <view class="room-address">门店地址</view>
			 <view style="color:#31b977;font-size: 28upx;" @click="openMap('阜阳市颍州区长安路碧桂园.翡翠湾')"><uni-icons type="location-filled" color="#31b977" size="18"></uni-icons>安徽省阜阳市颍州区长安路(碧桂园.翡翠湾-41栋114)</view>
		</view> -->
		 <view class="other">
			 <view class="other-title">
				 其他功能
			 </view>
			 <view class="other-content">
				<view class="other-content-item"  @click="gotoPage('me/myAddress')">
					 <image src="/static/images/qt2.png"></image>
					 <view>线下门店</view>
				 </view>
				 <view class="other-content-item" @click="openAction()">
					 <image src="/static/images/qt1.png"></image>
					 <view>活动中心</view>
				 </view>
				 <view class="other-content-item" @click="changePage()">
					 <image src="/static/images/qt3.png"></image>
					 <view>变废为宝</view>
				 </view>
				 <view class="other-content-item" @click="gotoPage('order/address')">
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
	import {fakeLogin,getIndexTotal} from"@/api/index.js"
	import {
		geocoder,
		getLocation,
		reverseGeocoder,
	} from '@/common/qqmap-util.js'
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
				},
				city:"",
				totalPrice:"0",
				totalWeight:"0"
			}
		},
		onLoad() {
          /* this.getWeiUser=uni.getStorageSync("WeiUser")
		  if(this.getWeiUser){
			  this.login()
		  } */
		   this.getCurLocation()
		   
		},
		onShow() {
			this.userInfo=getApp().globalData.userInfo
			this.getIndexTotal()
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
			getIndexTotal(){
				getIndexTotal().then(res=>{
					this.totalWeight=res.result.totalWeight
					this.totalPrice=res.result.totalPrice
				})
			},
			getCurLocation() {
				 uni.showLoading({
				 	title: '加载中...'
				 })
				var self = this;
				getLocation().then(res => {
						const {
							longitude,
							latitude
						} = res
						self.getLocationInfo({
							longitude,
							latitude
						})
						uni.hideLoading();
					}).catch(arr => {
						uni.hideLoading();
						if(arr&&arr.errCode===1&&arr.errMsg==="getLocation:fail:ERROR_NETWORK"){
							self.$api.msg("检查网络是否开启",3000)
						}
						if(arr&&arr.errCode===2&&arr.errMsg==="getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF"){
							self.$api.msg("检查gps是否开启",3000)
						}
					})
			},
			getLocationInfo(location) {
				let self=this;
				reverseGeocoder(location).then(res => {
						if(res.result){
							self.city=res.result.ad_info.city
						}
					}).catch(err => {
						
					})
			},
			addOrder(type){
			   this.userInfo=getApp().globalData.userInfo
			   if(JSON.stringify(this.userInfo)=='{}'){
			      uni.navigateTo({
			      	url:"../me/login"
			      })
			   }else{
				  uni.navigateTo({
				  	url:"../order/addOrder?type="+type
				  }) 
			   }
				
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
			gotoPage(e){
				this.userInfo=getApp().globalData.userInfo
				if(JSON.stringify(this.userInfo)=='{}'){
				   uni.navigateTo({
				   	url:"../me/login"
				   })
				}
				uni.navigateTo({
					url:"/pages/"+e
				})
			},
			openAction(){
				this.$api.msg('暂时没有活动')
				return false;
			},
			changePage(){
				uni.switchTab({
					url:"../shopping/shopping"
				})
			},
			openPhone(e){
				uni.makePhoneCall({
				    phoneNumber: e //仅为示例
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
		height: 400upx;
		width: 100%;
		/* width: calc(100% - 60upx);
		margin: 30upx 30upx;
		margin-top: 20upx; */
	}
	.static{
		/* height: 200upx; */
		width: calc(100% - 60upx);
		margin:-70upx 30upx 0;
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
		background-color: rgb(255,255,255);
	}
	.static-item-type{
		padding-top: 20upx;
		font-size: 32upx;
		color: #222222;
	}
	.static-item-number{
		margin-top: 4upx;
		font-size: 40upx;
		color: #31b977;
		padding-bottom: 20upx;
	}
	.city{
		width: calc(100% - 60upx);
		margin: 30upx 30upx;	
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	.city-item{
		font-size: 30upx;
		color: #000000;
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
		height: 140upx;
	}
	.phone-info{
		padding-top: 20upx;
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
    .phone-item{
		font-size: 28upx;
		color: #222222;
	}
	.room{
		width: calc(100% - 60upx);
		margin: 30upx 30upx;
		display: flex;
		/* background-color: #EEEEEE;
		border-radius: 20upx 20upx 20upx 20upx; */
	}
	.room-address{
		color: #000000;
		font-size: 32upx;
		font-weight: 600;
		width: 170upx;
	}
	.room-info{
		display: flex;
		align-items:center;
		justify-content:space-between;
		color: #19BE6B;
		font-size: 30upx;
	}
	.room-info-item{
		flex:1;
		padding: 20upx;
	}
	.other{
        width: calc(100% - 60upx);
		margin: 30upx 30upx 60upx;
	}	
	.other-title{
		font-size: 32upx;
		color: #222222;
		font-weight: 600;
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
