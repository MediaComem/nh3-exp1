<template>
  <div id="app">
    <router-view/>
    <div id="preloadImg"></div>
  </div>
</template>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";

#preloadImg {
  display: none;
}
</style>
