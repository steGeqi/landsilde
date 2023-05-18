import request from '@/utils/request'
// 获取历史地震
export function getHistoryEq(type) {
  return request({
    url: 'get_marker/'+type,
    method: 'get',
  })
}


// 获取台站
export function getStationEq(id) {
  return request({
    url: 'get_station/'+id,
    method: 'get',
  })
}

//搜索历史地震
export function searchhis(strtype,opertype,name){
  return request({
    url:'search_his/'+strtype+'/'+opertype+'/'+name,
    method:'get',
  })
}