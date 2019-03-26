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

      document.documentElement.style.setProperty(
        "--url",
        "url(" + this.generateImgUrl(imgId, { f: "desaturate" }) + ")"
      );
    },
    startBGImg() {
      this.setBGImg();
      this.BGImgInstance = window.setInterval(this.setBGImg, 10000);
    },
    clearBGImg() {
      clearInterval(this.BGImgInstance);
    }
  }
};
export default BGImg;
