var BGImg = {
  static() {
    return {
      BGImgInstance: null
    };
  },
  methods: {
    setBGImg() {
      let randImageId = this.getRandomIntInclusive(0, this.imagesSet.length);
      let imgId = this.imagesSet[randImageId]["image"]["_id"];
      let imgUrl = this.generateImgSrc(imgId, { f: "desaturate" });

      this.preloadImg(imgUrl).then(() => this.changeBGURL(imgUrl));
    },
    changeBGURL(imgUrl) {
      document.documentElement.style.setProperty("--url", `url(${imgUrl})`);
    },
    isBGURLEmpty() {
      return document.documentElement.style.getPropertyValue("--url") === "";
    },
    startBGImg() {
      if (this.isBGURLEmpty()) {
        this.setBGImg();
      }

      this.BGImgInstance = window.setInterval(this.setBGImg, 8000);
    },
    clearBGImg() {
      clearInterval(this.BGImgInstance);
    }
  }
};
export default BGImg;
