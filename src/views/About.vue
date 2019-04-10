<template functional>
  <div class="fullBG flex flex-col justify-between text-center">
    <nav class="relative">
      <router-link
        to="/"
        tag="button"
        class="btn btn--close"
        :aria-label="parent.$t('navigation.goBack')"
      ></router-link>
    </nav>
    <header>
      <h1 class="text-2xl">{{ parent.$t("page.about.mainTitle") }}</h1>
    </header>
    <aside>
      <h2>{{ parent.$t("page.about.buildBy") }}</h2>
      <p>
        <a href="https://mei.heig-vd.ch">Media Engineering Institute</a>
        <br>
        <a href="https://heig-vd.ch">HEIG-VD</a>
      </p>
      <p>2019</p>
    </aside>
    <main>
      <h2>{{ parent.$t("page.about.univers.title") }}</h2>
      <ul class="nh2-univers">
        <li>
          <h2>
            <a href="#">{{ parent.$t("page.about.univers.archive") }}</a>
          </h2>
        </li>
        <li>
          <h2>
            <a href="#">{{ parent.$t("page.about.univers.mag") }}</a>
          </h2>
        </li>
        <li>
          <h2>
            <a href="#">{{ parent.$t("page.about.univers.lab") }}</a>
          </h2>
        </li>
      </ul>
    </main>
    <footer>
      <p>{{ parent.$t("page.about.copyright") }}</p>
      <p class="slogan">{{ parent.$t("page.about.slogan") }}</p>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
h2 {
  @apply text-xl;
}
p,
h2 {
  @apply mb-4;
}
.nh2-univers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  & h2 {
    text-align: center;
    border: 2px solid config("colors.white");
    border-right: none;
    padding: 0.4em 0.3em;
    & a {
      text-decoration: none;
    }
  }
  & li:last-child h2 {
    border: 2px solid config("colors.white");
  }
}
.slogan {
  font-style: italic;
}

footer {
  margin-top: 0;
}
</style>
