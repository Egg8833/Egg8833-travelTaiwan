import {onMounted, ref, computed} from 'vue'
import {defineStore} from 'pinia'
import homeViewData from '@/assets/data/homeViewPoint.json'

export const hotViewDataStore = defineStore('hotViewData', () => {
  const viewArea = ref([
    '北部地區',
    '中部地區',
    '南部地區',
    '東部地區',
    '離島地區',
    '熱門打卡',
  ])

  const selectIndex = ref(0)
  const selectAreaData = computed(() => {
    selectIndex.value = 0
    return homeViewData[selectIndex.value][viewArea.value[selectIndex.value]]
  })

  const changeSelectIndex = index => {
    selectIndex.value = index
  }

  return {
    viewArea,
    selectAreaData,
    selectIndex,
    changeSelectIndex,
    count,
    increment,
  }
})
