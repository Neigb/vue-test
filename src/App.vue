<template>
  <div id="app">
    <router-view />
    <!-- <test-query-bar /> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">

export default {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tips-style {
    top: -7px;
    right: -7px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    font-size: 18px;
    color: #0188fb;
    position: absolute;
}
* {
  padding: 0;
  margin: 0;
}
.el-table th>.cell {
    position: static!important;
}

.el-table th.el-table__cell > .cell .caret-wrapper {
  display: inline-block;
}
</style>
