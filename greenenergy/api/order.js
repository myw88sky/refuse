import request from '@/common/request.js'

/**
 * 金币转成牛币接口
   * */
export function transformScore(data) {
  return request({
    url: '/hsOrderInf/transformScore?actualPrice='+data,
    method: 'post',
    data
  })
}
/**
 * 商品分类接口
  * 目前返回2级，不需要就只取type=1这一级
  * */
export function getHsGoodTypeZtree(data) {
  return request({
    url: '/inf4/goodsInfo/getHsGoodTypeZtree',
    method: 'post',
    data
  })
}
/**
 * 根据分类id分页查询商品列表
   * */
export function getGoodsInfoByPage(data) {
  return request({
    url: '/inf4/goodsInfo/getGoodsInfoByPage?id='+data.id+'&page='+data.page+'&rows='+data.rows,
    method: 'get',
    data
  })
}

/**
 * 商品详情接口
   * */
export function getGoodInfoById(data) {
  return request({
    url: '/inf4/goodsInfo/getGoodInfoById?id='+data,
    method: 'get',
    data
  })
}
/**
 * 商品下单接口 
 * goodsNum 是下单商品数量
goodsId 是商品id
  * */
  export function addGoodExchange(data) {
    return request({
      url: '/inf4/goodExchange/addGoodExchange?goodsNum='+data.goodsNum+'&goodsId='+data.goodsId+'&addressId='+data.addressId,
      method: 'get',
      data
    })
  }
  
  /**
   * 已经下单商品详情
	* */
 export function getChangeDetail(data) {
    return request({
      url: '/inf4/goodExchange/getChangeDetail?changeId='+data,
      method: 'get',
      data
    })
  }


/**
 * 我的商品兑换列表接口
   * */
export function getMyGoodsExchangeInfo(data) {
  return request({
    url: '/inf4/goodExchange/getMyGoodsExchangeInfo?status='+data.status+'&page='+data.page+'&rows='+data.rows,
    method: 'get',
    data
  })
}


/**
 * 确认收货接口，
 * 7天内未收货，自动签收
   * */
export function confirmedGoodByChangeId(data) {
  return request({
    url: '/inf4/goodExchange/confirmedGoodByChangeId?changeId='+data,
    method: 'get',
    data
  })
}

/** 
 * 未发货之前可以删除兑换，删除兑换接口。
  * */
export function cannelExchangeByChangeId(data) {
  return request({
    url: '/inf4/goodExchange/cannelExchangeByChangeId?changeId='+data,
    method: 'get',
    data
  })
}