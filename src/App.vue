<template>
  <div id="app">
    <router-view :ok="ok" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import '@arcgis/core/assets/esri/themes/dark/main.css';

export default {
  name: "App",
  provide () {
    return {
      reload: this.reload,
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  data() {
    return {
      ok: false,
      isRouterAlive: true
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#app > div {
  height: 100%;
}
.home-container {
  height: 100%;
}
.content-container {
  height: 100%;
  overflow-x: hidden;
  text-align: center;
  background-color: #f7f4f4;
  overflow-y: auto;
}
.map-container {
  height: calc(100%);
  position: relative;
}
@media only screen and (max-width: 377px) {
  .map-container {
    height: calc(100%);
  }
}
@media only screen and (max-width: 320px) {
  .map-container {
    height: calc(100%);
  }
}
.map-container div,
.thd-map div {
  background-color: transparent;
}
</style>
