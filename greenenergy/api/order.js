import request from '@/common/request.js'

export function myGroupList(data) {
  return request({
    url: '/eduCommonGroup/myGroupList',
    method: 'post',
    data
  })
}