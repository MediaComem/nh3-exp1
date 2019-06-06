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

<script>
export default {
  metaInfo() {
    return {
      title: this.$t("title")
    };
  }
};
</script>

<script>
import vhCheck from "vh-check";

export default {
  mounted() {
    vhCheck("vh-offset");
  }
};
</script>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";
</style>
