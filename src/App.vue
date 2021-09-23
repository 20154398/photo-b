<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  // 生命周期-准备创建dom之前
  beforeCreate(to) {
    // 获取登录态
    const userInfo = JSON.parse(this.commonJ.getLocalStorage('wisewalkId', 1))
    if (userInfo && userInfo.token) {
      // 保存数据到store
      this.$store.commit('setToken', userInfo.token);
    } else {
      // 跳转到登录
      this.$router.push('/home');
    }
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html, body, #app{
    height: 100%;
  }

  .h100{
    height: 100%;
  }

  .border{
    border: 2px solid #ebebeb;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
