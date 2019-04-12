export default () => {
  return {
    // By default check navigator lang
    lang: navigator.language.split('-')[0] || navigator.userLanguage.split('-')[0],
    loading: false,
    user: {
      name: null,
      id: null,
      firstTime: true
    },
    replayCount: 0, // Number of times the player has finish the all imagesSet and restarted to play
    round: {
      yearSelected: 0,
      media: {
        author: null,
        title: null,
        year: null,
        rights: null,
        idnh: null,
        image: {
          _id: null
        }
      },
      stats: {
        yearsInterval: 5,
        countPerPeriod: {
          data: [],
          labels: []
        },
        total: null
      }
    },
    game: {
      running: false,
      number: 0,
      chrono: {
        currentVal: 0, //sec
        currentBonus: 0, //sec
        timesUp: false,
        running: false,
        instance: null
      }
    },
    imagesSet: [],
    roundDone: [],
    score: {
      last: null,
      submitted: false
    },
    ranking: [],
    options: {
      timeline: {
        begin: 1818,
        end: new Date().getFullYear()
      },
      chronoInit: 30, //sec
      imagesSetLimit: 200, //pictures
      rankingLimit: 10, // Get top 10
      dpiRange: [0.5, 1, 1.5, 2, 2.5, 3, 4],
      bonus: {
        exact: 6, //sec
        rangeMinYearsDiff: 1, // At ... year difference(s) you get ...
        rangeMinValue: 3, // ... sec in bonus.
        rangeMaxYearsDiff: 15, // At ... year difference(s) you get ...
        rangeMaxValue: 1 // ... sec in bonus.
      }
    }
  };
};