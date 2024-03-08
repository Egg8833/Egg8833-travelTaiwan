<script setup>
import { computed, onMounted, ref } from "vue";
import card from "../components/card.vue";
import satisfaction from "../components/satisfaction.vue";
import ArticleToggle from "../components/ArticleToggle.vue";
import { useRoute } from "vue-router";
import { useViewListStore } from "../store/viewStore";
import ZipCode from "../assets/data/zipCode.json";
import homeViewData from "@/assets/data/homeViewPoint.json";

const store = useViewListStore();
// store.getData();
// 優化建議 進入頁面後把資料存入到localstrorage

const viewArea = [
  "北部地區",
  "中部地區",
  "南部地區",
  "東部地區",
  "離島地區",
  "熱門打卡",
];

const route = useRoute();
const viewListId = route.path.split("/").pop();

const viewData = computed(() => {
  // 從首頁熱門景點來的資料
  if (viewListId.startsWith("VCA")) {
    let areaData = [];
    homeViewData.forEach((e, i) => {
      areaData.push(e[viewArea[i]]);
    });
    console.log("d", areaData);

    let [data] = areaData.flat().filter((item) => item.id == viewListId);

    return data;
  } else {
    let [data] = store.viewData.filter((item) => item.id == viewListId);

    return data;
  }
});

const data = ref({
  id: "C1_379000000A_000001",
  title: "大稻埕碼頭_大稻埕碼頭貨櫃市集",
  phone: "886-2-66057338",
  openTime:
    "平常日以團體預約包船為主，例假日行駛固定航次，請洽詢各船公司。強烈季風、漲退潮水位差影響航行及靠泊安全，當日實際航班得由現場公告或網站預告調整。",
  tagText: ["遊憩類"],
  startNum: 5,
  photoSrc: ["https://www.travel.taipei/image/223127"],
  description:
    "大稻埕原是平埔族的居住地，因萬華（艋舺）同安人發生激烈的械鬥，造成族人移至大稻埕定居，開始大稻埕淡水河旁商店和房屋的興建，淡水港開放後，大稻埕在劉銘傳的治理下成為臺北城最繁華的物資集散中心，當中以茶葉、布料為主要貿易交易，當時的延平北路及貴德街一帶便是商業活動的重心，也讓大稻埕早年的歷史多采多姿、令人回味。",
  ZipCode: "103",
});

const zipCodeData = computed(() => {
  console.log("zip", viewData.value.ZipCode);
  console.log("e", ZipCode[0]["臺北市"]);
  return ZipCode[viewData.value.ZipCode];
});

onMounted(() => {
  console.log("store", store.viewData);
  console.log("computed", viewData.value);
});
</script>

<template>
  <div class="max-w-[1232px] mx-auto">
    <div class="pt-3 px-6 xl:px-4">
      <!-- 麵包屑 -->
      <router-link to="/viewList" class="group flex items-center mb-2 md:mb-3">
        <img src="../assets/images/icon/arrow-left.svg" alt="arrow" />
        <p class="ml-2 text-[#808080] font-700 group-hover:text-[#1fb588]">
          景點列表
        </p>
      </router-link>

      <div class="flex justify-between items-center mb-1 md:mb-3">
        <h4 class="text-[#434343] font-700 text-[18px] md:text-[46px]">
          {{ viewData.title }}
        </h4>
        <div class="flex gap-2">
          <div
            class="flex items-center justify-center w-[30px] h-[30px] rounded-full border-1 border-solid border-[#1Fb588]"
          >
            <img
              src="../assets/images/icon/phone-filled.svg"
              alt="phone"
              class="w-[18px]"
            />
          </div>
          <div
            class="flex items-center justify-center w-[30px] h-[30px] rounded-full border-1 border-solid border-[#1Fb588]"
          >
            <img
              src="../assets/images/icon/web.svg"
              alt="web"
              class="w-[18px]"
            />
          </div>
          <div
            class="flex items-center justify-center w-[30px] h-[30px] rounded-full border-1 border-solid border-[#1Fb588]"
          >
            <img
              src="../assets/images/icon/heart-outline.svg"
              alt="heart"
              class="w-[18px]"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mb-2">
        <satisfaction
          :startNum="3"
          :commit="true"
          :commitNum="234"
        ></satisfaction>
        <p class="text-[#808080]">{{ viewData.Address || " " }}</p>
      </div>
      <div class="flex gap-1 mb-2 md:mb-6">
        <button
          v-for="(item, index) in viewData['tagText']"
          :key="index"
          class="tag"
        >
          {{ item }}
        </button>
      </div>

      <!-- 圖片輪播 -->
      <div class="md:flex md:justify-between">
        <div class="-mx-6 md:w-[60%] md:order-1 md:mx-0">
          <div class="relative">
            <img :src="viewData['photoSrc']" class="w-full object-cover" />
            <div
              class="flex justify-center gap-2 absolute bottom-4 left-0 right-0"
            >
              <button
                v-for="(item, index) in 3"
                :key="index"
                class="w-[10px] h-[10px] rounded-full bg-[#FFF]"
              ></button>
            </div>
          </div>
        </div>
        <div class="pt-7 md:w-[35%] md:pt-0">
          <div class="grid gap-y-7">
            <div>
              <h4
                class="text-[#188E6B] font-700 text-[24px] pb-2 md:text-[32px]"
              >
                關於
              </h4>
              <ArticleToggle
                class="text-[#616161 font-500 leading-5 md:text-[18px] leading-6"
                :content="viewData['description']"
                :maxSummaryWordCount="150"
              ></ArticleToggle>
            </div>

            <div>
              <h4
                class="text-[#188E6B] font-700 text-[24px] pb-2 md:text-[32px]"
              >
                開放時間
              </h4>

              <ArticleToggle
                v-if="viewData['openTime']"
                class="text-[#616161 font-500 leading-5 md:text-[18px] leading-6"
                :content="viewData['openTime']"
                :maxSummaryWordCount="120"
              ></ArticleToggle>
              <p v-else>全日開放，依各店家營業時間為主。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 景點特色 -->
      <div class="pt-8 grid gap-8">
        <div>
          <h4 class="text-[#188E6B] font-700 text-[24px] pb-2 md:text-[32px]">
            服務設施
          </h4>
          <ul class="flex gap-2 flex-col">
            <li class="flex items-center gap-2">
              <span>服務處</span>
              <img src="../assets/images/icon/check.svg" alt="" />
            </li>
            <li class="flex items-center gap-2">
              <span>公共廁所</span>
              <img src="../assets/images/icon/check.svg" alt="" />
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-[#188E6B] font-700 text-[24px] pb-3 md:text-[32px]">
            交通方式
          </h4>
          <div class="flex items-center bg-[#f0f0f0] justify-center py-2">
            <img src="../assets/images/icon/bus.svg" alt="" />
            <p class="ml-3 text-[#808080] text-[18px] font-700 md:text-[24px]">
              大眾運輸
            </p>
          </div>
          <!-- 交通工具 -->
          <div class="md:flex">
            <div
              class="p-9 border-b border-b-solid border-[#eee] md:border-b-0 md:border-r-solid md:border-r"
            >
              <div class="flex justify-center items-center flex-col">
                <div
                  class="py-2 px-2 text-[12px] rounded-[20px] bg-[#808080] text-white mb-2 inline-block"
                >
                  公車
                </div>
                <p class="mb-3 text-center leading-5 md:text-lg">
                  搭乘982、307等路線，至板橋站站牌，往中山路步行五分鐘即可抵達
                </p>

                <button class="flex items-center btn-secondary">
                  查看車次即時動態
                  <img
                    src="../assets/images/icon/bus-filled.svg"
                    alt=""
                    class="ml-2"
                  />
                </button>
              </div>
            </div>
            <div
              class="p-9 border-b border-b-solid border-[#eee] md:border-b-0 md:border-r-solid md:border-r"
            >
              <div class="flex justify-center items-center flex-col">
                <div
                  class="py-2 px-2 text-[12px] rounded-[20px] bg-[#808080] text-white mb-2 inline-block"
                >
                  火車、高鐵
                </div>
                <p class="mb-3 text-center leading-5 md:text-lg">
                  搭至板橋站，往中山路步行五分鐘即可抵達
                </p>

                <button class="flex items-center btn-secondary">
                  查看車次即時動態
                  <img
                    src="../assets/images/icon/train-filled.svg"
                    alt=""
                    class="ml-2"
                  />
                </button>
              </div>
            </div>
            <div class="p-9">
              <div class="flex justify-center items-center flex-col">
                <div
                  class="py-2 px-2 text-[12px] rounded-[20px] bg-[#808080] text-white mb-2 inline-block"
                >
                  捷運
                </div>
                <p class="mb-3 text-center leading-5 md:text-lg">
                  搭至板橋站，往中山路步行五分鐘即可抵達
                </p>

                <button class="flex items-center btn-secondary">
                  查看車次即時動態
                  <img
                    src="../assets/images/icon/mrt-filled.svg"
                    alt=""
                    class="ml-2"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 評價 -->
      <div>
        <div>
          <h4 class="text-[#188E6B] font-700 text-[24px] pb-4 md:text-[32px]">
            旅客評價
          </h4>
          <div class="flex items-center gap-2">
            <p class="text-[30px] text-[#434343] font-700">3</p>
            <satisfaction
              :startNum="3"
              :commit="true"
              :commitNum="234"
            ></satisfaction>
            <div
              class="ml-auto flex items-center justify-center w-[32px] h-[32px] rounded-full border-1 border-solid border-[#1Fb588]"
            >
              <img
                src="../assets/images/icon/sort.svg"
                alt=""
                class="w-[18px] h-[18px]"
              />
            </div>
          </div>
        </div>
        <div>
          <!-- 評價區塊 -->
          <div v-for="(i, index) in 3" :key="i">
            <div class="pt-4 flex items-end">
              <img src="../assets/images/people.png" alt="" />
              <p class="ml-2 text-[18px] font-700 text-[#434343]">
                路上容易塞車
              </p>
              <div class="ml-auto">
                <satisfaction :startNum="3"></satisfaction>
              </div>
            </div>
            <div
              class="pt-4 pb-6 border-b border-b-solid border-[#eee]"
              :class="{ 'border-b-0': index + 1 === 3 }"
            >
              <p class="leading-6">
                最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五
              </p>
            </div>
          </div>
          <div class="flex justify-center pt-7 pb-10">
            <button class="btn">查看更多</button>
          </div>
        </div>
        <div class="pb-10">
          <h4 class="text-[#188E6B] font-700 text-[24px] pb-4 md:text-[32px]">
            這些景點大家也推薦
          </h4>
          <div
            class="flex justify-center flex-col gap-4 items-center md:grid md:grid-cols-3 md:gap-6"
          >
            <!-- <card :cardData="data2"></card> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

