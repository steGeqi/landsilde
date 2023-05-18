import request from '@/utils/request'
import md5 from "js-md5";
export function getPrecipitation() {
    return request({
        methods: 'get',
        url: '/data/get_precipitation',
    })
}
export function getPrecipitation_data(area_id){
    return request({
        methods: 'get',
        url:'/data/get_precipitation_data',
        params: {
            area_id
        },
    })
}
export function get_vibration(earthtime,station){
    return request({
        methods: 'get',
        url:'/data/get_vibration',
        params: {
            earthtime:earthtime,
            station:station
        },
    })
}
