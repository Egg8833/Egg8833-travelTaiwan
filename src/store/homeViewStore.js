import {defineStore} from 'pinia'
import {ref} from 'vue'
import processViewData from '@/common/processList.js'
import {useRoute, useRouter} from 'vue-router'
import allViewPoint from '@/assets/data/allViewPoint.json'

export const useHomeViewStore = defineStore('homeView', () => {
  const travelName = ref('')
  const haveSearchTravel = ref('')
  const filteredData = ref([])
  const randomThreeItems = ref([])

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
      return
    }

    filteredData.value = processViewData(data)

    haveSearchTravel.value = true
    router.push('/viewList')
  }

  function getRandomItemsFromArray(array, count) {
    function isEmptyObject(obj) {
      return Object.keys(obj).length === 0
    }
    const copiedArray = array.filter(item => !isEmptyObject(item.Picture))

    // 建立一個新的陣列來儲存隨機抽取的資料

    const randomItems = []

    // 使用迴圈從陣列中隨機抽取資料，直到達到指定的數量
    for (let i = 0; i < count; i++) {
      // 從剩餘的資料中隨機選擇一個索引
      const randomIndex = Math.floor(Math.random() * copiedArray.length)

      // 將選取的資料從原始陣列中刪除，以避免重複選取
      randomItems.push(copiedArray.splice(randomIndex, 1)[0])
    }
    // 回傳隨機抽取的資料陣列

    return processViewData(randomItems)
  }

  // 使用函式從dataArray中隨機抽取三筆資料
  randomThreeItems.value = getRandomItemsFromArray(allViewPoint, 3)

  return {
    travelName,
    searchTravel,
    haveSearchTravel,
    filteredData,
    randomThreeItems,
    getRandomItemsFromArray,
  }
})
