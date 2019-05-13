var utilities = {
  static() {
    return {
      defaultImgParams: {
        token: process.env.VUE_APP_API_IMAGE_TOKEN,
        w: window.innerWidth,
        q: 70,
        o: true,
        m: 'bestFit'
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
    preloadImg(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img.src);
        img.onerror = reject;
        img.src = src;

        if ('caches' in window) {
          // Has support!
          caches
            .open('preloadImg')
            .then(cache => {
              cache.add(src);
            })
            .catch(err => {
              console.log('Error in caching image', err);
            });
        }
      });
    },
    preloadAllThumb(options) {
      this.imagesToDo.forEach(media =>
        this.preloadImg(this.generateImgSrc(media.image._id, options))
      );
    },
    generateImgSrc(imgId, options) {
      let urlParams = this.encodeURLParams({
        ...this.defaultImgParams,
        ...options
      });
      return `${
        process.env.VUE_APP_API_URL
      }/cockpit/image/?${urlParams}&src=${imgId}`;
    },
    generateImgSrcSet(imgId, xDescArr, options) {
      return xDescArr
        .map(
          xDesc =>
            `${this.generateImgSrc(
              imgId,
              { w: Math.floor(window.innerWidth * xDesc) },
              options
            )} ${xDesc}x`
        )
        .join(',');
    },
    encodeURLParams(obj) {
      return Object.entries(obj)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    }
  }
};
export default utilities;
