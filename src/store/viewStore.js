import {onMounted, ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {getViewApi} from '../api/index.js'
import noImage from '../assets/images/empty-img.png'
import cityData from '../assets/data/cityData.json'
export const useViewListStore = defineStore('viewList', () => {
  const viewData = ref([])
  const viewList = ref([])
  const cityName = ref('Taipei')
  const cityNameApi = ref('')

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  function setCityName(name) {
    cityName.value = name
  }

  async function getData() {
    console.log('cityNameApi.value', cityNameApi.value)
    if (viewList.value.length > 0 && cityName.value === cityNameApi.value) {
      console.log('資料重複取得，未呼叫api')
      return
    }

    viewList.value = await getViewApi(cityName.value)
    // viewList.value = cityData
    console.log('ApiList', viewList.value)

    viewData.value = viewList.value.map(e => {
      const tagText = [e.Class1, e.Class2, e.Class3].filter(Boolean)
      const photoSrc = [
        e.Picture.PictureUrl1,
        e.Picture.PictureUrl2,
        e.Picture.PictureUrl3,
      ].filter(Boolean)

      if (photoSrc.length === 0) {
        photoSrc.push(noImage)
      }

      return {
        city: e.City,
        id: e.ScenicSpotID,
        title: e.ScenicSpotName,
        phone: e.Phone,
        openTime: e.OpenTime,
        tagText,
        startNum: generateRandomNumber(3, 5),
        photoSrc,
        description: e.DescriptionDetail,
        ZipCode: e.ZipCode,
        Address: e.Address,
      }
    })
    console.log(viewData.value)
    cityNameApi.value = cityName.value
  }

  return {getData, viewData, setCityName}
})
