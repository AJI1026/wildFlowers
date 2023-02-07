<!--底部波浪组件-->
<template>
  <div class="wave-container">
    <!--波浪，分为三个部分，上中下-->
    <div class="waveTop">
      <div class="wave wt"></div>
    </div>
    <div class="waveMiddle">
      <div class="wave wm"></div>
    </div>
    <div class="waveBottom">
      <div class="wave wb"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wave-container',
    data() {
      return{}
    }
  }
</script>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .wave-container {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    .waveTop {
      z-index: 15;
      opacity: 0.75;
    }
    .waveMiddle {
      z-index: 10;
      opacity: 0.75;
    }
    .waveBottom {
      z-index: 5;
    }
    .wave {
      background-image: url(https://front-end-noobs.com/jecko/img/wave-top.png);
      position: absolute;
      left: 0;
      width: 200%;
      height: 100%;
      //x轴重复，y轴不重复
      background-repeat: repeat no-repeat;
      //图片固定到底部
      background-position: 0 bottom;
      //图片运动中，以哪个为中心点
      transform-origin: center bottom;
    }
    @keyframes move_wave {
      0% {
        transform: translateX(0) translateZ(0) scaleY(1);
      }
      50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55);
      }
      100% {
        transform: translateX(-50%) translateZ(0) scaleY(1);
      }

    }
    .wt {
      background-size: 50% 100px;
      animation: move_wave 3s;
      animation-delay: 1s;
    }
    .wm {
      background-size: 50% 120px;
      animation: move_wave 10s linear infinite;
    }
    .wb {
      background-size: 50% 120px;
      animation: move_wave 15s linear infinite;
    }
  }
  @media (max-height: 570px) {
    .wave-container {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      display: none;
      .waveTop {
        z-index: 15;
        opacity: 0.75;
      }
      .waveMiddle {
        z-index: 10;
        opacity: 0.75;
      }
      .waveBottom {
        z-index: 5;
      }
      .wave {
        background-image: url(https://front-end-noobs.com/jecko/img/wave-top.png);
        position: absolute;
        left: 0;
        width: 200%;
        height: 100%;
        //x轴重复，y轴不重复
        background-repeat: repeat no-repeat;
        //图片固定到底部
        background-position: 0 bottom;
        //图片运动中，以哪个为中心点
        transform-origin: center bottom;
      }
      @keyframes move_wave {
        0% {
          transform: translateX(0) translateZ(0) scaleY(1);
        }
        50% {
          transform: translateX(-25%) translateZ(0) scaleY(0.55);
        }
        100% {
          transform: translateX(-50%) translateZ(0) scaleY(1);
        }

      }
      .wt {
        background-size: 50% 100px;
        animation: move_wave 3s;
        animation-delay: 1s;
      }
      .wm {
        background-size: 50% 120px;
        animation: move_wave 10s linear infinite;
      }
      .wb {
        background-size: 50% 120px;
        animation: move_wave 15s linear infinite;
      }
    }
  }
</style>
