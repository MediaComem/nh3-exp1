<template>
  <div class="fullBG flex flex-col justify-between text-center">
    <nav class="relative">
      <router-link to="/" tag="button" class="btn btn--close" :aria-label="$t('navigation.goBack')"></router-link>
    </nav>
    <header>
      <h1 class="text-2xl normal-case">{{ $t("page.about.mainTitle") }}</h1>
    </header>
    <!-- <aside>
      <h2>
        <a
          :href="$t('page.about.lab.url')"
          target="_blank"
          rel="noopener noreferrer"
        >{{ $t("page.about.testOtherExp") }}</a>
      </h2>
    </aside>-->
    <!--     <main>
      <h2>{{ $t("page.about.univers.title") }}</h2>
      <ul class="nh2-univers">
        <li>
          <a :href="$t('page.about.univers.archive.url')" target="_blank" rel="noopener noreferrer">
            <img
              :alt="$t('page.about.univers.archive.title')"
              :src="publicPath + '/img/' + $t('page.about.univers.archive.logo')"
            >
          </a>
        </li>
        <li class="universMag hidden">
          <a :href="$t('page.about.univers.mag.url')" target="_blank" rel="noopener noreferrer">
            <img
              :alt="$t('page.about.univers.mag.title')"
              :src="publicPath + '/img/' + $t('page.about.univers.mag.logo')"
            >
          </a>
        </li>
      </ul>
    </main>-->
    <aside>
      <h3>{{ $t("page.about.buildBy") }}</h3>
      <p>
        <a
          href="https://mei.heig-vd.ch"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-1"
        >Media Engineering Institute</a>
      </p>
      <p>
        <a href="https://heig-vd.ch" target="_blank" rel="noopener noreferrer">HEIG-VD</a>
      </p>
    </aside>
    <footer>
      <p>{{ $t("page.about.copyright") }}</p>
      <p class="slogan">{{ $t("page.about.slogan") }}</p>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>


<style lang="postcss" scoped>
nav {
  height: 32px;
}
h2 {
  @apply text-xl;
}
p,
h2 {
  @apply mb-4;
}
aside h3 {
  @apply text-sm;
}
.nh2-univers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  & li {
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    background: white;
  }
  & h2 {
    text-align: center;
    padding: 0.4em 0.3em;
    & a {
      text-decoration: none;
    }
  }
  & img {
    padding: 0.1rem;
    height: 50px;
  }
  & .universMag img {
    padding: 0.3rem;
  }
}
.slogan {
  font-style: italic;
}

footer {
  margin-top: 0;
}
</style>
