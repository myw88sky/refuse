<template>
	<view>
		<view class="logo">
			<image src="/static/images/xiaoniu.png"></image>
		</view>
<!-- 		<view class="logo-txt">
			小牛换吧
		</view> -->
		<view class="login">
		   <button type="primary" v-if="!isUser" style="background: #5AA28A;" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">
				微信登录
		   </button>
		   <button type="primary" v-if="isUser" style="background: #5AA28A;" @click="addWxUser()">
		   		微信登录
		   </button>
		</view>
	</view>
</template>

<script>
	import {addWxUser,fakeLogin,getWeiOpenId} from"@/api/index.js"
	export default {
		data() {
			return {
				wUserInfo:{
					nickName:"",
					avatarUrl:"",
					openId:""
				},
				isUser:false
				
			}
		},
		onLoad(){
			if(JSON.stringify(getApp().globalData.wUserInfo)!='{}'){
				this.wUserInfo=getApp().globalData.wUserInfo;
				this.isUser=true
			}
			this.getWeiOpenId()
		},
		methods: {
			wxGetUserInfo() {
				let self = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						getApp().globalData.wUserInfo = infoRes.userInfo;
						uni.setStorageSync("WeiUser",true)
						self.wUserInfo.nickName = infoRes.userInfo.nickName; //昵称
						self.wUserInfo.avatarUrl = infoRes.userInfo.avatarUrl; //头像
					    self.addWxUser();
					},
					fail(res) {}
				});
			},
			addWxUser(){
				let self=this;
				let data={
					username:self.wUserInfo.weiOpenId,
					name:self.wUserInfo.nickName,
					userType:4,//1：超级管理员 2：普通管理员 3：员工 4：客户
					phone:'12345678901'
				}
				addWxUser(data).then(res=>{
					if(res.returnCode=="0"||res.returnCode=="2"){
						self.fakeLogin()
					}
				})
			},
     		getWeiOpenId(){
				let self=this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						var data = {
							code: code
						};
						getWeiOpenId(data).then(res => {
							if(res.returnCode=="0"){
								self.wUserInfo.weiOpenId=res.result.openId;
							} 
						})
					  }
				})
			},
			fakeLogin(){
				
				//登录
				let wUserInfo=getApp().globalData.wUserInfo
				let data={
					username:this.wUserInfo.weiOpenId,
					password:"123456"
				}
				fakeLogin(data).then(res=>{
					if(res.returnCode=="0"){
						getApp().globalData.userInfo=res.result
						uni.setStorageSync("UserInfo",true);
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		}
	}
</script>

<style>
  .logo{
	  width: 180upx;
	  height: 180upx;
	  margin: 0 auto;
	  margin-top: 260upx;
	 
  }
  .logo image{
	  width: 100%;
	  height: 100%;
	   border-radius: 20upx;
  }
  .logo-txt{
  	  margin:  0 auto;
  	  font-size: 50upx;
  	  font-weight: 800;
  	  text-align: center;
  	  color: #267426;
  	  margin-top: 40upx;
  }
  .login{
	  margin:40upx 30upx;
	  background: #267426;
	  border-radius: 20upx;
  }
</style>
