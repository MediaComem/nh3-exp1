<template>
  <div class="introduction">
    <h3>{{ $t("page.play.introduction.title") }}</h3>
    <p>{{ $t("page.play.introduction.description") }}</p>
    <ol>
      <li v-for="step of $t('page.play.introduction.steps')" v-bind:key="step">
        {{ step }}
      </li>
    </ol>
  </div>
</template>

<style lang="postcss">
.introduction {
  color: red;
  @apply font-serif;
  padding: 1em;
  & ol {
    padding-top: 5%;
    padding-left: 20px;
  }
}
</style>
