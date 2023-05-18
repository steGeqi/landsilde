import request from '@/utils/request'

export function upExcel(earthType,file) {
  return request({
    url: 'up_excel/'+earthType,
    method: 'post',
    data:file
  })
}

export function upJson(earthType,file,huapoType) {
  return request({
    url: 'up_json/'+earthType+'/'+huapoType,
    method: 'post',
    data:file
  })
}

export function upImg(type) {
  return request({
    url: base_url + '/getHuapoArea',
    method: 'get',
    data:{
      type
    }
  })
}
