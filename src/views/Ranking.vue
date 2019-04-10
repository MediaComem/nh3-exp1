<template>
  <div class="gameUI gameUI--scroll">
    <header>
      <router-link to="/game/finish" tag="button" class="btn--highlighted">
        {{
        $t("navigation.goBack")
        }}
      </router-link>
    </header>

    <main class="flex p-4" :class="{ 'mb-custom': displayForm }">
      <dl>
        <template v-for="(rank, i) in ranking">
          <dt
            :key="i + 'dt'"
            :class="{ 'font-bold': (rank.username === username) }"
          >{{ rank.username }}</dt>
          <dd :key="i + 'dd'" :class="{ 'font-bold': (rank.score === lastScore) }">{{ rank.score }}</dd>
        </template>
      </dl>
    </main>
    <transition name="fade">
      <section v-if="displayForm" class="formTop10">
        <h3 class="text-red">{{ $t('page.ranking.title')}}</h3>
        <p class="text-red">{{ $t('page.ranking.description')}}</p>
        <form @submit="submitScore">
          <input type="text" v-model="username" minlength="1" maxlength="20">
          <input type="submit" :value="$t('page.ranking.submit')">
        </form>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["ranking", "lastScore", "lastScoreSubmitted", "user"]),
    displayForm() {
      return this.canScoreEnterTop10 && !this.$store.state.lastScoreSubmitted;
    },
    canScoreEnterTop10() {
      let ranking = this.$store.state.ranking;
      let lastScore = this.$store.state.lastScore;
      return lastScore >= ranking[ranking.length - 1].score;
    },
    username: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.$store.commit("SET_USER_NAME", value);
      }
    }
  },
  created() {
    this.$store.dispatch("getTop10");
  },
  methods: {
    submitScore(e) {
      e.preventDefault();
      this.$store.dispatch("storeScoreTop10").then(res => {
        this.$store.dispatch("getTop10");
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.gameUI {
  justify-content: start;
}
dl {
  @apply font-serif text-grey;
  font-size: 1.2em;
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
.formTop10 {
  @apply p-8 bg-white;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -10px 54px -33px rgba(143, 143, 143, 0.5);
  width: 100%;
  & form {
    @apply pt-4 pb-4 flex justify-between;
    & input[type="text"] {
      @apply font-serif p-2;
      border: 1px solid rgba(143, 143, 143, 0.5);
      width: 100%;
    }
    & input[type="submit"] {
      @apply ml-4 text-white bg-red p-3 pr-4 pl-4;
      border: 0;

      & :hover {
        @apply bg-red-dark;
      }
    }
  }
}
.mb-custom {
  margin-bottom: 12rem;
}
</style>
