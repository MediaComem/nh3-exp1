<template>
  <div class="playUI">
    <header>
      <router-link to="/" tag="button" class="btn--highlighted">
        {{ $t("navigation.stop") }}
      </router-link>
    </header>

    <div class="flex justify-center">
      <h3 class="text-red">{{ $t("game.noMore.title") }}</h3>
      <p>{{ $t("game.noMore.description") }}</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.playUI {
  justify-content: start;
}
</style>
