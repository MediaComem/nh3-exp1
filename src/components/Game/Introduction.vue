<template>
  <div class="introduction">
    <h3>{{ $t("game.introduction.title") }}</h3>
    <p>{{ $t("game.introduction.description") }}</p>
    <ol>
      <li v-for="step of $t('game.introduction.steps')" v-bind:key="step">
        {{ step }}
      </li>
    </ol>
  </div>
</template>

<style lang="postcss">
.introduction {
  color: red;
  @apply font-serif p-4;
  & ol {
    padding-top: 5%;
    padding-left: 20px;
  }
}
</style>
