import request from '@/utils/request'

export function getGoods(data) {
  return request({
    url: '/backGround/commodify/list',
    method: 'post',
    data
  })
}
export function querycontainerlist(params) {
  return request({
    url: '/public/container/list',
    method: 'get',
    params
  })
}
export function addGoods(data) {
  return request({
    url: '/backGround/commodify/add',
    method: 'post',
    data
  })
}

export function deviceTypeadd(data) {
  return request({
    url: '/backGround/deviceType/add',
    method: 'post',
    data
  })
}
export function deviceTypeupdate(data) {
  return request({
    url: '/backGround/deviceType/update',
    method: 'post',
    data
  })
}
export function deviceTypelist(params) {
  return request({
    url: '/backGround/deviceType/list',
    method: 'get',
    params
  })
}
export function containeradd(data) {
  return request({
    url: '/backGround/container/add',
    method: 'post',
    data
  })
}
export function deviceadd(data) {
  return request({
    url: '/backGround/device/add',
    method: 'post',
    data
  })
}
export function deviceQuery(data) {
  return request({
    url: '/backGround/device/deviceQuery',
    method: 'post',
    data
  })
}
export function  userregist(data) {
  return request({
    url: '/user/regist',
    method: 'post',
    data
  })
}
export function  userquery(data) {
  return request({
    url: '/user/query',
    method: 'post',
    data
  })
}
export function  deviceTypedelete(data) {
  return request({
    url: '/backGround/deviceType/delete',
    method: 'post',
    data
  })
}
export function  containerdelete(data) {
  return request({
    url: '/backGround/container/delete',
    method: 'post',
    data
  })
}
export function  commodifyupdate(data) {
  return request({
    url: '/backGround/commodify/update',
    method: 'post',
    data
  })
}
export function  deviceupdate(data) {
  return request({
    url: '/backGround/device/update',
    method: 'post',
    data
  })
}
export function  userdelete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
export function  devicelist(data) {
  return request({
    url: '/foreground/device/list',
    method: 'post',
    data
  })
}

export function  refund(data) {
  return request({
    url: '/foreground/refund/add',
    method: 'post',
    data
  })
}
export function  refundquery(params) {
  return request({
    url: '/backGround/refund/query',
    method: 'get',
    params
  })
}
export function  orderquery(data) {
  return request({
    url: '/foreground/turnover/query',
    method: 'post',
    data
  })
}
export function   backGroundorderquery(data) {
  return request({
    url: '/backGround/order/query',
    method: 'post',
    data
  })
}

export function  refundadd(params) {
  return request({
    url: '/backGround/refund/add',
    method: 'get',
    params
  })
}
export function  deviceopen(params) {
  return request({
    url: '/foreground/device/open',
    method: 'get',
    params
  })
}
export function  openconfirm(params) {
  return request({
    url: '/foreground/device/open/confirm',
    method: 'get',
    params
  })
}

export function  devicecomand(params) {
  return request({
    url: '/foreground/device/comand',
    method: 'get',
    params
  })
}

export function  foredeviceadd(data) {
  return request({
    url: '/foreground/device/add',
    method: 'POST',
    data
  })
}
export function  foredeviceupdate(data) {
  return request({
    url: '/foreground/device/update',
    method: 'POST',
    data
  })
}
export function   userupdate(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}





