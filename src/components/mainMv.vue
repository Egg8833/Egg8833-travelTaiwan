<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const videoPopup = ref(false);
const videoId = ref("");
const player = ref(null);

onMounted(() => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const getHead = document.getElementsByTagName("Head")[0];
  getHead.append(tag);
  window.onYouTubeIframeAPIReady = () => {
    initYoutube(ref.player);
  };
  initYoutube(ref.player);
});

onBeforeUnmount(() => {
  if (player.value !== null && player.value.destroy) {
    player.value.destroy();
    delete player.value;
  }
});

const initYoutube = () => {
  if (!window.YT) return;
  player.value = new window.YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: "uQbr7V4Mqn8",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      modestbranding: 0,
      rel: 0,
      playsinline: 1,
      playlist: "uQbr7V4Mqn8",
      origin: "http://localhost:3000",
      host: "https://www.youtube.com",
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = (evt) => {
  evt.target.mute();
  evt.target.playVideo();
};

const onPlayerStateChange = (evt) => {
  if (evt.data === 0) {
    evt.target.playVideo();
  }
};
const videoPlay = (videoKey) => {
  videoPopup.value = true;
  videoId.value = videoKey;
};
const changePopupHandler = (isChange) => {
  videoPopup.value = isChange;
};
</script>

<template>
  <section ref="part__banner" class="part__banner">
    <div id="videoBanner" ref="videoBanner" class="videoBanner">
      <div id="player" ref="player"></div>
    </div>
  </section>
</template>

<style lang="scss">
.part__banner {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;

  .videoBanner {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    z-index: -1;

    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>

