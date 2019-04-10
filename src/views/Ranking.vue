<template>
  <div class="gameUI gameUI--scroll">
    <header>
      <router-link to="/game/finish" tag="button" class="btn--highlighted">
        {{
        $t("navigation.goBack")
        }}
      </router-link>
      <h1 class="hidden">{{ $t('navigation.ranking')}}</h1>
    </header>

    <main class="flex p-4" :class="{ 'mb-custom': displayForm }">
      <dl>
        <template v-for="(rank, i) in ranking">
          <dt
            :key="i + 'dt'"
            :class="{ 'font-bold': (rank.username === username) }"
          >{{ rank.username }}</dt>
          <dd :key="i + 'dd'" :class="{ 'font-bold': (rank.score === score.last) }">{{ rank.score }}</dd>
        </template>
      </dl>
    </main>
    <transition name="fade">
      <aside v-if="displayForm" class="formTop">
        <h2 class="text-red">{{ $t('page.ranking.title')}}</h2>
        <p class="text-red">{{ $t('page.ranking.description')}}</p>
        <form @submit="submitScore">
          <input
            type="text"
            v-model.trim="username"
            minlength="1"
            maxlength="20"
            :aria-label="$t('accessibility.inputUsername')"
          >
          <input type="submit" :value="$t('page.ranking.submit')">
        </form>
      </aside>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      canScoreEnterTop: false
    };
  },
  created() {
    this.getTop().then(res => {
      // If ranking is not empty
      if (this.ranking.length === this.options.rankingLimit) {
        this.canScoreEnterTop =
          this.score.last >= this.ranking[this.ranking.length - 1].score;
      } else if (this.score.last === null) {
        this.canScoreEnterTop = false;
      } else {
        this.canScoreEnterTop = true;
      }
    });
  },
  computed: {
    ...mapState(["ranking", "options", "score", "user"]),
    displayForm() {
      return this.canScoreEnterTop && !this.$store.state.score.submitted;
    },
    username: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.SET_USER_NAME(value);
      }
    }
  },
  methods: {
    ...mapMutations(["SET_USER_NAME"]),
    ...mapActions(["getTop", "storeScoreTop"]),
    submitScore(e) {
      e.preventDefault();
      this.storeScoreTop().then(res => {
        this.getTop();
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
.formTop {
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
