<script>
	import {fakeLogin,getWeiOpenId} from"@/api/index.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let self=this;
			// 1.wx获取登录用户code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					wx.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log("333",infoRes);
										getApp().globalData.wUserInfo = infoRes.userInfo;
										uni.setStorageSync("WeiUser",true)
										//登录
										let wUserInfo=getApp().globalData.wUserInfo
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
														let data={
															username:res.result.openId,
															//username:getApp().globalData.wUserInfo.nickName,
															password:"123456"
														}
														fakeLogin(data).then(res=>{
															if(res.returnCode=="0"){
																getApp().globalData.userInfo=res.result
																uni.setStorageSync("UserInfo",true)
															}
														})
													} 
												})
											  }
										})
										
										
									}
								});
							}else{
								uni.setStorageSync("WeiUser",false)
							}
						}
					})
				}
			});
		},
		globalData:{
			//微信用户
			wUserInfo:{},
			//登录用户
			userInfo:{}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
