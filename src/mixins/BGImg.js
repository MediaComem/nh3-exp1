var BGImg = {
  static() {
    return {
      BGImgInstance: null
    };
  },
  methods: {
    setBGImg(imgUrl) {
      document.documentElement.style.setProperty("--url", `url(${imgUrl})`);
    },
    preloadAndSetIMG() {
      let randImageId = this.getRandomIntInclusive(0, this.imagesSet.length);
      let imgId = this.imagesSet[randImageId]["image"]["_id"];
      let imgUrl = this.generateImgUrl(imgId, { f: "desaturate" });

      // preload img
      let preload_img = new Image();
      preload_img.src = imgUrl;
      preload_img.addEventListener("load", this.setBGImg(imgUrl));
    },
    startBGImg() {
      this.preloadAndSetIMG();
      this.BGImgInstance = window.setInterval(this.preloadAndSetIMG, 8000);
    },
    clearBGImg() {
      clearInterval(this.BGImgInstance);
    }
  }
};
export default BGImg;
