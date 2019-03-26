<template>
  <div class="fullBG flex flex-col justify-between text-center about">
    <div class="relative">
      <router-link to="/" tag="button" class="btn btn--close"></router-link>
    </div>
    <h2>{{ $t("page.about.title") }}</h2>
    <section>
      <h3>{{ $t("page.about.buildBy") }}</h3>
      <p>
        <a href="https://mei.heig-vd.ch">Media Engineering Institute</a>
        <br />
        <a href="https://heig-vd.ch">HEIG-VD</a>
      </p>
      <p>2019</p>
    </section>
    <section>
      <h3>{{ $t("page.about.univers.title") }}</h3>
      <ul class="nh3-univers">
        <li>
          <h3>
            <a href="#">{{ $t("page.about.univers.archive") }}</a>
          </h3>
        </li>
        <li>
          <h3>
            <a href="#">{{ $t("page.about.univers.mag") }}</a>
          </h3>
        </li>
        <li>
          <h3>
            <a href="#">{{ $t("page.about.univers.lab") }}</a>
          </h3>
        </li>
      </ul>
    </section>
    <footer>
      <p>{{ $t("page.about.copyright") }}</p>
      <p class="slogan">{{ $t("page.about.slogan") }}</p>
    </footer>
  </div>
</template>

<style lang="postcss">
.about p,
.about h3 {
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
    border: 2px solid #fff;
    border-right: none;
    padding: 0.4em 0.3em;
    & a {
      text-decoration: none;
    }
  }
  & li:last-child h3 {
    border: 2px solid #fff;
  }
}
.slogan {
  font-style: italic;
}

.btn--close {
  position: absolute;
  right: 0;
  width: 32px;
  height: 32px;
  background: #fff;
}

.btn--close:hover {
  opacity: 1;
}

.btn--close:before,
.btn--close:after {
  position: absolute;
  top: 4px;
  left: 15px;
  content: " ";
  height: 24px;
  width: 2px;
  @apply bg-red-light;
}

.btn--close:before {
  transform: rotate(45deg);
}

.btn--close:after {
  transform: rotate(-45deg);
}
</style>
