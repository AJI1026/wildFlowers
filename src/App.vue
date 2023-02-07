<template>
  <div id="app" v-cloak>
    <!--粒子特效-->
    <vue-particles
        color="#fff"
        :particle-opacity="0.7"
        :particles-number="80"
        shape-type="circle"
        :particle-size="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
    >
    </vue-particles>
    <!--页面过渡效果-->
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  // 允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true, // 强刷页面
    }
  },
  methods: {
    // 强刷页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  created() {

  }
}

</script>

<style>
  [v-cloak] {
    display: none;
  }
  /*页面切换过渡效果*/
  .fade-transform-leave-active,.fade-transform-enter-active {
    transition: all .2s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .lizi {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -999;
    background: url("./assets/wallhaven-x66zzd.jpg") center;
    background-size: cover;
  }
</style>
