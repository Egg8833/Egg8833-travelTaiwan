import {defineStore} from 'pinia'
import {ref} from 'vue'
import processViewData from '@/common/processList.js'
import {useRoute, useRouter} from 'vue-router'
import allViewPoint from '@/assets/data/allViewPoint.json'

export const useHomeViewStore = defineStore('homeView', () => {
  const travelName = ref('')
  const filteredData = ref([])

  const haveSearchTravel = ref('')

  const router = useRouter()
  const searchTravel = name => {
    if (travelName.value === '') {
      alert('請輸入景點名稱')
      return
    }
    let data = allViewPoint.filter(item => item.ScenicSpotName.includes(name))

    if (data.length === 0) {
      alert('查無相關景點資訊')
      travelName.value = ''
    }

    filteredData.value = processViewData(data)

    haveSearchTravel.value = true
    router.push('/viewList')
  }

  return {travelName, searchTravel, haveSearchTravel, filteredData}
})
