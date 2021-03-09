<script>
	import {fakeLogin,getWeiOpenId} from"@/api/index.js"
	export default {
		onLaunch: function() {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			let self=this;
			this.autoUpdate();
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

		},
		onHide: function() {

		},
		methods:{
			autoUpdate: function() {
			    var self = this
			    // 获取小程序更新机制兼容
			    if (wx.canIUse('getUpdateManager')) {
			      const updateManager = wx.getUpdateManager()
			      //1. 检查小程序是否有新版本发布
			      updateManager.onCheckForUpdate(function(res) {
			        // 请求完新版本信息的回调
			        if (res.hasUpdate) {
			          //检测到新版本，需要更新，给出提示
			          wx.showModal({
			            title: '更新提示',
			            content: '检测到新版本，是否下载新版本并重启小程序？',
			            success: function(res) {
			              if (res.confirm) {
			                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
			                self.downLoadAndUpdate(updateManager)
			              } else if (res.cancel) {
			                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
			                wx.showModal({
			                  title: '温馨提示~',
			                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
			                  showCancel:false,//隐藏取消按钮
			                  confirmText:"确定更新",//只保留确定更新按钮
			                  success: function(res) {
			                    if (res.confirm) {
			                      //下载新版本，并重新应用
			                      self.downLoadAndUpdate(updateManager)
			                    }
			                  }
			                })
			              }
			            }
			          })
			        }
			      })
			    } else {
			      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			      wx.showModal({
			        title: '提示',
			        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			      })
			    }
			  },
			  /**
			   * 下载小程序新版本并重启应用
			   */
			  downLoadAndUpdate: function (updateManager){
			    var self=this
			    wx.showLoading();
			    //静默下载更新小程序新版本
			    updateManager.onUpdateReady(function () {
			      wx.hideLoading()
				  //清理缓存
				  uni.clearStorageSync();
			      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			      updateManager.applyUpdate()
			    })
			    updateManager.onUpdateFailed(function () {
			      // 新的版本下载失败
			      wx.showModal({
			        title: '已经有新版本了哟~',
			        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
			      })
			    })
			}
		}
	}
</script>

<style>

</style>
