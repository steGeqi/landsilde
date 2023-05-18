import axios from "axios";
import jsonpAdapter from 'axios-jsonp';
// 获取验证码
export async function reverseGeocoding({
    lat,
    lng
}) {
    const {
        data
    } = await axios({
        url: `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&key=5202b4197397024ecadc81122ca42d85&radius=300&extensions=all`,
        adapter: jsonpAdapter,
    })
    return data.regeocode.formatted_address
}
export async function drivingLine(start, end) {
    const {
        data
    } = await axios({
        url: `https://api.map.baidu.com/direction/v2/driving?origin=${start.lon},${start.lat}&destination=${end.lon},${end.lat}&ak=YElc57wKGoYKNk6MDmvMqfHGcmW6BNZb`,
        adapter: jsonpAdapter,
    })
    return data
}

export async function searchBmap(key, latitude, longitude) {
    const {
        data
    } = await axios({
        url: `http://api.map.baidu.com/place/v2/search?query=${key}&location=${latitude},${longitude}&radius=150000&output=json&ak=e1egLjgq97K83xRDSV5LdqxBnjzlzOfa`,
        adapter: jsonpAdapter,
    })
    return data
}