<template>
  <div id="app">
    <transition name="fade">
      <div v-if="isOffline" id="offlineOverlay">
        <main>
          <h2>{{ $t("navigation.offline.title") }}</h2>
          <p>{{ $t("navigation.offline.description") }}</p>
        </main>
      </div>
    </transition>
    <router-view/>
  </div>
</template>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";
</style>
