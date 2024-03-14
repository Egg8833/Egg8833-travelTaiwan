import axios from 'axios'
import jsSHA from 'jssha'

const url = 'https://tdx.transportdata.tw/api/basic/v2'

export async function getViewApi(area = Taipei) {
  return axios
    .get(`${url}/Tourism/ScenicSpot/${area}?%24top=30&%24format=JSON`, {
      headers: getAuthorizationHeader(),
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = import.meta.env.VITE_APP_ID
  let AppKey = import.meta.env.VITE_APP_ID
  console.log('appId', import.meta)
  console.log('appId', import.meta.env)
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
