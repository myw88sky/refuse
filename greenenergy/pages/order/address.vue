<template>
	<view class="page">
		<view style="height: 5upx;"></view>
		<view class="content">
			<view class="address" v-for="(item,index) in list" :key="index" >
				<view class="address-title">
					<view>{{item.fullName}}<span v-if="item.defaultFlag=='1'" class="address-default">默认</span></view>
					<view>{{item.telphone}}</view>
				</view>
				<view class="address-content">
					{{item.locationAddress}}（{{item.addressDetail}}）
				</view>
				<view class="address-menu">
					<view class="addres-menu-item" @click="selectAddress(item)">选择</view>
					<view class="addres-menu-item" v-if="item.defaultFlag=='0'" @click="setAddress(item)">设置默认</view>
					<view class="addres-menu-item" @click="editAddress(item)">修改</view>
					<view class="addres-menu-item" style="color: #e676B6;" @click="deleteAddress(item)">删除</view>
				</view>
			</view>
			<!-- <view class="address">
				<view class="address-title">
					<view>缪元武(写字楼)<span class="address-default">默认</span></view>
					<view>18255157968</view>
				</view>
				<view class="address-content">
					安徽省合肥市蜀山区天柱路3号 安徽软件行业协会（合肥蜀山区）地位地址
				</view>
				<view class="address-menu">
					<view class="addres-menu-item"></view>
					<view class="addres-menu-item"></view>
					<view class="addres-menu-item">修改</view>
					<view class="addres-menu-item" style="color: #e676B6;">删除</view>
				</view>
			</view> -->
		</view>
		<view class='placeholder-view'></view>
		<view class="btn" >
			<button type="primary" @click="editAddress()" >新增地址</button>
		</view>
	</view>
</template>

<script>
	import {
		getLocation
	} from '@/common/qqmap-util.js'
	import {myUserAddress,updateUserAddress,deleteUserAddress} from"@/api/index.js"
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(){
			
		},
		onShow() {
			this.getCurLocation()
		   this.myUserAddress()	
		},
		methods: {
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
			editAddress(item=""){
				if(item==""){
					uni.navigateTo({
						url:"./add-address?item="+item
					})
				}else{
					let data={
						createUserId:item.createUserId,
						addressDetail:item.addressDetail,
						addressType: item.addressType,
						defaultFlag: item.defaultFlag,
						addressType: item.addressType,
						delFlag: item.delFlag,
						fullName: item.fullName,
						id: item.id,
						latitude: item.latitude,
						locationAddress: item.locationAddress,
						longitude: item.longitude,
						sex:item.sex,
						telphone: item.telphone
					}
					uni.navigateTo({
						url:"./add-address?item="+ JSON.stringify(data)
					})
				}
				
			},
			myUserAddress(){
				myUserAddress().then(res=>{
					if(res.returnCode=="0"){
						this.list=res.result
					}
				})
			},
			deleteAddress(item){
				let self=this;
				uni.showModal({
					title: '删除',
					    content: '确定删除这个地址',
					    success: function (res) {
						if (res.confirm) {
							deleteUserAddress(item.id).then(res=>{
								if(res.returnCode=="2"){
									self.$api.msg("删除成功");
									self.myUserAddress();	
									return false;
								}
								
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			setAddress(item){
				let data={
					createUserId:item.createUserId,
					addressDetail:item.addressDetail,
					addressType: item.addressType,
					defaultFlag: "1",
					addressType: item.addressType,
					delFlag: item.delFlag,
					fullName: item.fullName,
					id: item.id,
					latitude: item.latitude,
					locationAddress: item.locationAddress,
					longitude: item.longitude,
					sex:item.sex,
					telphone: item.telphone
					}
					updateUserAddress(data).then(res=>{
						if(res.returnCode=="2"){
							this.$api.msg("保存成功");
						    this.myUserAddress()	
						}
					})
			},
			selectAddress(item){
				const self = this;
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//传参数去上一个页面，
				prevPage.$vm.getSelectAddress(item);
				uni.navigateBack();
			}
		}
	}
</script>

<style >
page{
	background: #F5F5F5;
}
.content{
	overflow-y:auto; 
}

.address{
	margin: 30upx 30upx;
	background: #FFFFFF;
	padding: 30upx 20upx 20upx;
	border-radius: 20upx;
}
.address-title{
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #222222;
	font-size: 28upx;
	font-weight: 600;
}
.address-default{
	background: #ED3F14;
	border-radius: 28upx;
	padding: 3upx 15upx;
	font-size: 28upx;
	font-weight: 500;
	color: #FFFFFF;
}
.address-content{
	margin-top: 40upx;
	margin-bottom: 20upx;
	color: #9B9B9B;
	font-size: 28upx;
	font-weight: 500;
}
.address-menu{
	border-top: solid 1px #ECECEC;
	display: flex;
	padding-top:10upx;
}
.addres-menu-item{
	flex:1;
	text-align: center;
	color: #B2B2B2;
	font-size: 28upx;
}
.placeholder-view{
	width: 100%;
	height: 150upx;
}
.btn{
	position:fixed;
	bottom: 40upx;
	left:30upx;
	width: calc(100% - 60upx) ;
}
</style>
