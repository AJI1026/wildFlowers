<template>
  <div class="error-container">
    <div id="container">
      <div class="content">
        <h2>404</h2>
        <h4>Opps! Page not found</h4>
        <p>The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
        <a href="#" @click="backToHome">Back To Home</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error-container',
    data() {
      return{
      }
    },
    methods: {
      move() {
        let container = document.getElementById('container')
        container.addEventListener('mousemove', function (e) {
          let x = - e.clientX/5,
              y = - e.clientY/5;
          container.style.backgroundPositionX = x + 'px'
          container.style.backgroundPositionY = y + 'px'
        })
      },
      backToHome() {
        this.$router.go(-1)
      }
    },
    created() {
      this.$nextTick(this.move)
    }
  }
</script>

<style lang="scss">
  .error-container {
    height: 100vh;
    background: linear-gradient(45deg, #8500ff, #5acaff);
    font-family: 'Poppins', sans-serif;
    #container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("../../assets/p404.png"), #151729;
      box-shadow: 0 15px 30px rgba(0,0,0,.5);
    }
    .content {
      max-width: 600px;
      text-align: center;
      h2 {
        font-size: 10vw;
        color: #fff;
        line-height: 1.2em;
      }
      h4 {
        position: relative;
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #111;
        background: #fff;
        font-weight: 300;
        padding: 10px 20px;
        display: inline-block;
      }
      p {
        color: #fff;
        font-size: 1.2em;
      }
      a {
        position: relative;
        display: inline-block;
        padding: 10px 25px;
        background: #ff0562;
        color: #fff;
        text-decoration: none;
        margin-top: 25px;

      }
    }
  }
</style>

