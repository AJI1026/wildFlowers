<template>
  <div class="homePage" ref="jumpNext">
    <!--分屏1-->
    <div class="home-container section section1">
      <!-- 准备一个容器用来存放音乐播放器 -->
      <div id="aplayer"></div>
      <!--弹幕-->
      <!-- 确保父元素是相对定位，弹幕容器是绝对定位 -->
      <v-barrage :arr="arr" :isPause="isPause" :percent="100" style="z-index: 0; margin-top: 61px"></v-barrage>
      <div class="barrage-control">
        <input type="text" v-model="sendContent" placeholder="发送一个弹幕试试！" id="sendContent" @keyup.enter="sendBarrage" />
        <button id="sendBarrageBtn" @click="sendBarrage">
          <i slot="icon" class="iconfont icon-jijianfasong-xianxing"></i>
        </button>
        <button id="pauseBtn" @click="isPause=true">
          <i slot="icon" class="iconfont icon-zanting"></i>
        </button>
        <button id="startBtn" @click="isPause=false">
          <i slot="icon" class="iconfont icon-kaishi1"></i>
        </button>
        <select v-model="direction" class="option">
          <option value="default">默认</option>
          <option value="top">顶部</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import APlayer from "../../../node_modules/aplayer";
import VBarrage from '@/components/barrage/index';

export default {
  name: 'home-container',
  components: {
    VBarrage,
  },
  data() {
    return {
      arr: [],
      isPause: false,
      sendContent: null,
      isJs: false,
      direction: 'default',
      // 用户名称
      name: '阿集',
      // 左栏gif图片路径
      url: 'https://www.bing.com/th/id/OGC.6ef84a7cb3d053c0923ec25db42b002b?pid=1.7&rurl=https%3a%2f%2ftupian.qqw21.com%2farticle%2fUploadPic%2f2013-11%2f2013111312542051899.gif&ehk=wOy39lKN8AD7iMCQiq4Lh6ScWa4lI9Jz%2bGA5UfKUbMc%3d',
      audio: [ // 歌曲列表
        {
          name: "Бухгалтер", // 歌曲名字
          artist: "Комбинация", // 歌曲演唱者
          // 这里不能直接解析网页云音乐的资源，这里通过一个接口以通过歌曲id直接获取音乐播放地址
          url: "https://music.163.com/song/media/outer/url?id=1306971701", // 歌曲地址（这里用外链地址）
          cover: "https://tse3-mm.cn.bing.net/th/id/OIP-C.umhAP0XEVPcDOHop52JeawHaHt?w=146&h=180&c=7&r=0&o=5&dpr=2&pid=1.7", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(255, 100, 100)", // 播放这首歌曲时的主题色
        },
        {
          name: "I Really Want to Stay At Your House", // 歌曲名字
          artist: "Rosa Walton/Hallie Coggins", // 歌曲演唱者
          // 这里不能直接解析网页云音乐的资源，这里通过一个接口以通过歌曲id直接获取音乐播放地址
          url: "https://music.163.com/song/media/outer/url?id=1496089152", // 歌曲地址（这里用外链地址）
          cover: "https://tse2-mm.cn.bing.net/th/id/OIP-C.oVAL6oT7yUYT8dC-dabiPQHaF4?w=217&h=180&c=7&r=0&o=5&dpr=2&pid=1.7", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(37, 109, 133)", // 播放这首歌曲时的主题色
        },
        {
          name: "rather do my MATH", // 歌曲名字
          artist: "Robin Gan", // 歌曲演唱者
          // 这里不能直接解析网页云音乐的资源，这里通过一个接口以通过歌曲id直接获取音乐播放地址
          url: "https://music.163.com/song/media/outer/url?id=1916213807", // 歌曲地址（这里用外链地址）
          cover: "https://www.securityondemand.com/wp-content/uploads/2020/09/math-picture.png", // 歌曲头像
          lrc: "", // 歌词
          theme: "#eee", // 播放这首歌曲时的主题色
        },
      ],
      info: {
        fixed: true, // 开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 关闭自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
        volume: 0.7, // 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
        mutex: true, // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
        lrcType: 3, //歌词模式（1、HTML模式 2、js模式 3、lrc文件模式）
      },
    }
  },
  methods: {
    // 音乐播放器
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
      ap.lrc.show();
    },
    // 弹幕函数
    initTestData () {
      let arr = [
        '加油，伙计',
        '相信自己',
        '黎明终将到来',
        '为了信仰而战！',
        '嗨！伙计',
        '别放弃'
      ]
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 1000; index++) {
          if (index % 2 === 0) {
            this.arr.push({
              direction: 'top',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          } else {
            this.arr.push({
              direction: 'default',
              content: arr[parseInt(Math.random() * arr.length)]
            })
          }
        }
      }
    },
    // 发送弹幕
    sendBarrage () {
      if (this.arr.length > 1 && this.sendContent !== '' && this.sendContent != null) {
        this.arr.unshift({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red',
            fontSize: '25px'
          },
          isJs: this.isJs
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: 'red'
          },
          isJs: this.isJs
        });
      }
      this.sendContent = null;
    },
  },
  mounted() {
    this.initAudio();
    this.initTestData();
  },
}
</script>

<style lang="scss">
.homePage{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.3s ease;
  overflow: hidden;
  // 分屏1
  .home-container {
    //overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    overflow: hidden;
  }
  // 弹幕控制样式
  .barrage-control {
    display: flex;
    margin-top: 10em;
    position: absolute;
    button {
      margin: 0 1px;
      opacity: 0.1;
      &:hover {
        opacity: 1;
      }
      i {
        font-size: 20px;
        background-color: black;
        color: #eeeeee;
      }
    }
    #sendContent {
      background-color: #000000;
      color: #eeeeee;
      opacity: 0.7;
      border: none;
      text-align: center;
      &:hover {
        opacity: 1;
      }
    }
    .option {
      background-color: black;
      color: #eeeeee;
      opacity: 0.1;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
