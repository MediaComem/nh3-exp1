<template>
  <div class="playUI">
    <header>
      <router-link to="/game/finish" tag="button" class="btn--highlighted">{{
        $t("navigation.goBack")
      }}</router-link>
    </header>

    <div class="flex p-4">
      <dl>
        <template v-for="rank in ranking">
          <dt :key="rank.username">{{ rank.username }}</dt>
          <dd :key="rank.score">{{ rank.score }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["ranking"])
  },
  beforeMount() {
    this.$store.dispatch("getTop10");
  }
};
</script>

<style lang="postcss" scoped>
.playUI {
  justify-content: start;
}
dl {
  @apply font-serif;
  font-size: 1.2em;
  color: #000;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
dt {
  @apply pt-4 pb-4;
  width: 50%;
}
dd {
  @apply pt-4 pb-4;
  width: 50%;
}
</style>
