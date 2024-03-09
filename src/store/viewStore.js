import {onMounted, ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {getViewApi} from '../api/index.js'

import cityData from '@/assets/data/cityData.json'

import processViewData from '@/common/processList.js'
export const useViewListStore = defineStore('viewList', () => {
  const viewData = ref([])
  const viewList = ref([])
  const cityName = ref('Taipei')
  const cityNameApi = ref('')

  function setCityName(name) {
    cityName.value = name
  }

  async function getViewsStoreData() {
    console.log('cityNameApi.value', cityNameApi.value)
    if (viewList.value.length > 0 && cityName.value === cityNameApi.value) {
      console.log('資料重複取得，未呼叫api')
      return
    }

    viewList.value = await getViewApi(cityName.value)

    viewData.value = processViewData(viewList.value)

    cityNameApi.value = cityName.value
  }

  return {getViewsStoreData, viewData, setCityName}
})
