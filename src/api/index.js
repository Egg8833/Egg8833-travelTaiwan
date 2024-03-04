import axios from 'axios'
import jsSHA from 'jssha'

const url = 'https://tdx.transportdata.tw/api/basic/v2'

export async function getViewApi(area = Taipei) {
  return axios
    .get(`${url}/Tourism/ScenicSpot/${area}?%24top=30&%24format=JSON`, {
      headers: getAuthorizationHeader(),
    })
    .then(function (response) {
      console.log('area', area)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = 'egg8833-1f51e68c-c84f-41d9'
  let AppKey = 'c8c65c48-4536-4c3d-bf6c-f774508f5532'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return {Authorization: Authorization, 'X-Date': GMTString}
}
