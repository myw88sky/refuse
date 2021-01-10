import {
	BASEURL
} from './utils.js'

const request = (config) => {
	return new Promise((resove, reject) => {
		
		uni.request({
			url: BASEURL + config.url,
			data: config.data || '',
			header: {
				"Content-Type": config.contentType || "application/json;charset=utf-8",
				"pt": "app",
				//#ifdef H5
				"token": '3ee38234-d7fe-4177-9225-90c5e1667962', //
				//#endif
				//#ifndef H5
				"token": config.token !== undefined ? config.token : uni.getStorageSync('token'),
				//#endif
				"Cookie":uni.getStorageSync('cookie')
			},
			method: config.method,
			dataType: "json",
			success: (res) => {

				if (res.statusCode == 200) {
					console.log("res",res)
					if (res.header.token) {
						uni.setStorageSync('token', res.header.token)
					}
					if(res.cookies.length>0){
						uni.setStorageSync('cookie', res.cookies[0])
					}
					
					resove(res.data)
				}
				//重定向跳转到首页
				if (res.statusCode === 302) {
					uni.reLaunch({
						url: "/pages/index/index.vue"
					})
				}
			},
			fail: (error) => {
				//console.log("error", error);
				uni.showToast({
					title:"请求错误",
					duration:1500,
					mask:false,
					icon:"none"
				});
				reject(error)
			},
			complete: () => {

			}
		})
	})
}
export default request
