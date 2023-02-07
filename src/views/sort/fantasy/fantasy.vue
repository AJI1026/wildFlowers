<template>
  <div class="knowledge">
    <!--返回按钮-->
    <div class="back" @click="backNav">
      <i class="el-icon-back"></i>
    </div>
    <!--分类按钮-->
    <div class="main">
      <div class="knowledge-navigation" @click="navigate">
        <span style="--i:0;--x:-1 ;--y:0"><a>主流</a></span>
        <span style="--i:1;--x:1;--y:0"><a>剑与魔法</a></span>
        <span style="--i:2;--x:0;--y:-1"><a>黑暗</a></span>
        <span style="--i:3;--x:0;--y:1"><a>历史</a></span>
        <span style="--i:4;--x:-1;--y:1"><a>现代</a></span>
        <span style="--i:5;--x:-1;--y:-1"><a>轻松</a></span>
        <span style="--i:6;--x:1;--y:-1"><a>青少年</a></span>
        <span style="--i:7;--x:1;--y:1"><a>东方</a></span>
      </div>
      <div class="close" @click="closeNavigate">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'knowledge-container',
  data() {
    return {
      navigation: '',
      close: ''
    }
  },
  methods: {
    // 回退
    backNav() {
      this.$router.go(-1)
    },
    // 导航到分类具体页面
    navigate() {
      this.navigation.classList.add('active')
    },
    // 关闭
    closeNavigate() {
      this.navigation.classList.remove('active')
    }
  },
  mounted() {
    this.navigation = document.querySelector('.knowledge-navigation')
    this.close = document.querySelector('.close')
  }
}
</script>

<style lang="scss">
.knowledge {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: black;
  // 回退箭头
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    i {
      color: #e1e1e1;
      font-size: 40px;
      opacity: 0.6;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 230px;
    height: 230px;
    .knowledge-navigation {
      position: relative;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      span {
        position: absolute;
        width: 7px;
        height: 7px;
        background: white;
        transform: translate(calc(20px * var(--x)), calc(20px * var(--y)));
        transition: transform 0.5s, width 0.5s, height 0.5s, background 0.5s;
        transition-delay: calc(0.1s * var(--i));
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          transition: 0.5s;
          font-size: 0;
        }
      }
    }
    .knowledge-navigation.active span {
      width: 60px;
      height: 60px;
      background: black;
      transform: translate(calc(80px * var(--x)), calc(80px * var(--y)));
      a {
        font-size: 1em;
        color: white;
        &:hover {
          color: #33ff33;
          filter: drop-shadow(0 0 2px #33ff33) drop-shadow(0 0 5px #33ff33) drop-shadow(0 0 15px #33ff33);
        }
      }
    }
    .close {
      position: absolute;
      width: 7px;
      height: 7px;
      background: white;
      cursor: pointer;
      transition: 0.5s;
      transition-delay: 0.4s;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .knowledge-navigation ~ .close {
      i {
        font-size: 2em;
        scale: 0;
        color: #10131c;
        transition: 0.5s;
      }
    }
    .knowledge-navigation.active ~ .close {
      width: 30px;
      height: 30px;
      pointer-events: initial;
      transition-delay: 0.8s;
      background: white;
      border-radius: 50%;
      i {
        scale: 1;
        transition-delay: 1s;
      }
    }
  }
}
</style>
