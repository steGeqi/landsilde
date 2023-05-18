import request from '@/utils/request'

// 获取天气
export function getWeather(params) {
  return request({
    // https://devapi.heweather.net/v7/weather/3d
    url: 'http://47.101.35.46:2929/7d',
    method: 'get',
    params
  })
}
// 获取城市
export function getLocation(params) {
    return request({
      url: 'https://geoapi.heweather.net/v2/city/lookup',
      method: 'get',
      params
    })
  }
