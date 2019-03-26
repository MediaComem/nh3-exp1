var BGImg = {
  static() {
    return {
      BGImgInstance: null
    };
  },
  methods: {
    setBGImg() {
      let randImageId = this.getRandomIntInclusive(0, this.imagesSet.length);
      let params = {
        token: process.env.VUE_APP_API_IMAGE_TOKEN,
        src: this.imagesSet[randImageId]["image"]["_id"],
        w: window.innerWidth,
        q: 70,
        o: true,
        m: "bestFit"
      };

      let url = `${
        process.env.VUE_APP_API_URL
      }/cockpit/image/?${this.encodeURLParams(params)}`;
      document.documentElement.style.setProperty("--url", "url(" + url + ")");
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
