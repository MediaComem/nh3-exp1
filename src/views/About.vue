<template functional>
  <div class="fullBG flex flex-col justify-between text-center">
    <div class="relative">
      <router-link to="/" tag="button" class="btn btn--close"></router-link>
    </div>
    <h2>{{ parent.$t("page.about.mainTitle") }}</h2>
    <section>
      <h3>{{ parent.$t("page.about.buildBy") }}</h3>
      <p>
        <a href="https://mei.heig-vd.ch">Media Engineering Institute</a>
        <br>
        <a href="https://heig-vd.ch">HEIG-VD</a>
      </p>
      <p>2019</p>
    </section>
    <section>
      <h3>{{ parent.$t("page.about.univers.title") }}</h3>
      <ul class="nh3-univers">
        <li>
          <h3>
            <a href="#">{{ parent.$t("page.about.univers.archive") }}</a>
          </h3>
        </li>
        <li>
          <h3>
            <a href="#">{{ parent.$t("page.about.univers.mag") }}</a>
          </h3>
        </li>
        <li>
          <h3>
            <a href="#">{{ parent.$t("page.about.univers.lab") }}</a>
          </h3>
        </li>
      </ul>
    </section>
    <footer>
      <p>{{ parent.$t("page.about.copyright") }}</p>
      <p class="slogan">{{ parent.$t("page.about.slogan") }}</p>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
p,
h3 {
  @apply mb-4;
}
.nh3-univers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  & h3 {
    text-align: center;
    border: 2px solid config("colors.white");
    border-right: none;
    padding: 0.4em 0.3em;
    & a {
      text-decoration: none;
    }
  }
  & li:last-child h3 {
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
