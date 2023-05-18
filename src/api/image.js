import request from '@/utils/request'

export function getImgFile(type) {
    return request({
      url: 'get_imgFile/' + type,
      method: 'get',
    })
  }
  
  export function getImages(path) {
    return request({
      url: 'get_Photo/'+path,
      method: 'get',
    })
  }

  export function upImage(path,file,isPhoto) {
    return request({
      url: 'up_image/'+path+'/'+isPhoto,
      method: 'post',
      data:file
    })
  }

  export function deleteImage(path,codeNum) {
    return request({
      url: 'delete_image/'+codeNum,
      method: 'post',
      data:{
          path
      }
    })
  }

  export function editImage(path,file) {
    return request({
      url: 'up_image/'+path,
      method: 'post',
      data:file
    })
  }