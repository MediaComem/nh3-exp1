var utilities = {
  static() {
    return {
      defaultImgParams: {
        token: process.env.VUE_APP_API_IMAGE_TOKEN,
        w: window.innerWidth,
        q: 70,
        o: true,
        m: "bestFit"
      }
    };
  },
  methods: {
    convertRange(value, xMax, xMin, yMax, yMin) {
      var percent = (value - yMin) / (yMax - yMin);
      return ~~(percent * (xMax - xMin) + xMin);
    },
    clamp(val, min, max) {
      return val > max ? max : val < min ? min : val;
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateImgUrl(imgId, options) {
      let urlParams = this.encodeURLParams({
        ...this.defaultImgParams,
        ...options
      });
      return `${
        process.env.VUE_APP_API_URL
      }/cockpit/image/?${urlParams}&src=${imgId}`;
    },
    encodeURLParams(obj) {
      return Object.entries(obj)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
    }
  }
};
export default utilities;
