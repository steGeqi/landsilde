import request from '@/utils/request'
const base_url = '/huapo'
// 获取滑坡点、线、面
//data是指哪个地震
export function getHuapoMarker(type) {
  return request({
    url: 'get_marker/'+type,
    method: 'get',
  })
}

export function searchhuapo(strtype,opertype,name){
  return request({
    url:'get_huapo/'+strtype+'/'+opertype+'/'+name,
    method:'get',
  })
}

//修改滑坡数据
export function editMarker(type,id,info) {
  return request({
    url: 'edit_marker/'+type+'/'+id,
    method: 'post',
    data:info
  })
}

//删除滑坡
export function delMarker(type,id) {
  return request({
    url: 'del_marker/'+type+'/'+id,
    method: 'get',
  })
}