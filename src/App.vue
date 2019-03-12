<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  overscroll-behavior: none; /* Remove pull to refresh on chrome 63+ */
  overflow: hidden;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
body::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}
#app > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; /* If you need to support browser without CSS var support (<= IE11) */
  height: calc(100vh - var(--vh-offset, 0px)); /* enable vh fix */
}
</style>
