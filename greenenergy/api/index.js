import request from '@/common/request.js'

/**
 * 账户登录
   * */
export function fakeLogin(data) {
  return request({
    url: '/fakeLogin?username='+data.username+'&password='+data.password,
    data
  })
}

/**
 * 获取微信的openId
 * */
 export function getWeiOpenId(params) {
 	return request({
 		url: '/wechat/userInfo/getWeiOpenId',
 		method: 'get',
 		data: params
 	})
 }

/**
 * 账户退出
* */
export function logout(data) {
  return request({
    url: '/logout',
    data
  })
}


/**
 * 添加微信用户接口
 * */
export function addWxUser(data) {
  return request({
    url: '/addWxUser',
    method: 'post',
    data
  })
}

/**
 * 查询回收分类接口
  * */
export function getHsTypeZtree(data) {
  return request({
    url: '/hsType/getHsTypeZtree',
    method: 'post',
    data
  })
}

/**
 * 分类列表
   * */
export function getHsTypeList(data) {
  return request({
    url: '/hsType/getHsTypeList',
    method: 'post',
    data
  })
}





/**
 * 上传图片接口
   * */
export function uploadOrderImg(data) {
  return request({
    url: '/hsOrderInf/uploadOrderImg',
    method: 'post',
	// contentType: 'application/x-www-form-urlencoded',
    data
  })
}

/**
 * 新增加地址
 * */
export function addUserAddress(data) {
  return request({
    url: '/hsOrderInf/addUserAddress',
    method: 'post',
    data
  })
}

/**
 * 修改地址
   * */
export function updateUserAddress(data) {
  return request({
    url: '/hsOrderInf/updateUserAddress',
    method: 'post',
    data
  })
}

/**
 * 删除地址
   * */
export function deleteUserAddress(data) {
 return request({
   url: '/hsOrderInf/deleteUserAddress?id='+data,
   method: 'get',
   data
 })
}
 

/**
 * 我的地址列表
   * */
export function myUserAddress(data) {
  return request({
    url: '/hsOrderInf/myUserAddress',
    method: 'get',
    data
  })
}

/**
 * 添加订单接口
* */
export function addHsOrder(data) {
  return request({
    url: '/hsOrderInf/addHsOrder',
    method: 'post',
    data
  })
}

/**
 * 订单列表
   * */
export function getHsOrderList(data) {
  return request({
    url: '/hsOrderInf/getHsOrderList',
    method: 'post',
    data
  })
}

/**
 * 完成订单
   * */
export function getHsOrderListFinish(data) {
  return request({
    url: '/hsOrderInf/getHsOrderList?status=5',
    method: 'post',
    data
  })
}

/**
 * 订单详细 
  * */
export function selectOrderDetailById(data) {
  return request({
    url: '/hsOrderInf/selectOrderDetailById?orderId='+data,
    method: 'get',
    data
  })
}

/**
 * 删除订单,客户
   * */
export function deleteOrderById(data) {
  return request({
    url: '/hsOrderInf/deleteOrderById?orderId='+data,
    method: 'get',
    data
  })
}


/**
 * 确认订单,员工
   * */
export function confirmedOrderById(data) {
  return request({
    url: '/hsOrderInf/confirmedOrderById?orderId='+data,
    method: 'get',
    data
  })
}

/**
 * 确认已回收订单,客户
   * */
export function recoveredOrderById(data) {
  return request({
    url: '/hsOrderInf/recoveredOrderById?orderId='+data,
    method: 'get',
    data
  })
}

/**
 * 
修改订单详细，
填写实际价格和实际总量，
在客户支付订单之前需要
把每个订单项的实际重量和价格填写完整 
 **/
export function updateOrderDetail(data) {
  return request({
    url: '/hsOrderInf/updateOrderDetail',
    method: 'post',
    data
  })
}

/**
 * 支付订单,员工 
  * */
export function payOrderById(data) {
  return request({
    url: '/hsOrderInf/payOrderById?orderId='+data.orderId+'&actualPrice='+data.actualPrice+'&payType='+data.payType,
    method: 'get',
    data
  })
}

/**
 * 确认已支付，客户
   * */
export function confiremedPaidOrderById(data) {
  return request({
    url: '/hsOrderInf/confiremedPaidOrderById?orderId='+data,
    method: 'get',
    data
  })
}
























