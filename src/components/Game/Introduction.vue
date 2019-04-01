<template functional>
  <div class="introduction">
    <h3>{{ parent.$t("game.introduction.title") }}</h3>
    <p>{{ parent.$t("game.introduction.description") }}</p>
    <ol>
      <li v-for="step of parent.$t('game.introduction.steps')" v-bind:key="step">{{ step }}</li>
    </ol>
  </div>
</template>

<style lang="postcss">
.introduction {
  color: config("colors.red-light");
  text-align: left;
  @apply font-serif p-4;
  & ol {
    padding-top: 5%;
    padding-left: 20px;
  }
}
</style>
