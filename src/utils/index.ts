'use strict'

import dayjs from 'dayjs'

/**
 * 判断值是否为空
 */
function isEmpty(value: any) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (const i in value) {
        return false
      }
      return true
  }
  return false
}

/**
 * 金格格式化，每三位加逗号,并保留两位小数
 */
function formatPrice(val: number) {
  let value
  if (typeof val !== 'undefined') {
    if (val.toString().includes('.')) {
      value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      value = val + '.00'
    }
  } else {
    value = 0
  }
  return value
}

function formatDate(date: string) {
  return date && dayjs(date).format('YYYY-MM-DD')
}

// 判断客户端的类型
const browserInfo = {
  isAndroid: Boolean(navigator.userAgent.match(/android/ig)), // android
  isIos: Boolean(navigator.userAgent.match(/iphone|ipod/ig)), // ios
  isIpad: Boolean(navigator.userAgent.match(/ipad/ig)), // ipad
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)), // 微信
  isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)), // 支付宝
  isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) // 手机端
}


export {
  isEmpty,
  formatPrice,
  formatDate,
  browserInfo
}