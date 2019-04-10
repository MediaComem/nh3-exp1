export default () => {
  return {
    // By default check navigator lang
    lang:
      navigator.language.split('-')[0] || navigator.userLanguage.split('-')[0],
    user: {
      name: null,
      id: null
    },
    loading: false,
    firstTime: true,
    round: {
      year: {
        begin: new Date().getFullYear() - 200,
        end: new Date().getFullYear(),
        selected: 0
      },
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
        init: 60, //sec
        bonus: 15, //sec
        penalty: -1, //sec
        penaltyCoefficient: 3, // penalty per year
        currentVal: 0, //sec
        currentBonusPenalty: 0, //sec
        timesUp: false,
        running: false,
        instance: null
      }
    },
    replayCount: 0, // Number of times the player has finish the all imagesSet and restarted to play
    imagesSetLimit: 3,
    imagesSet: [],
    roundDone: [],
    lastScore: null,
    lastScoreSubmitted: false,
    ranking: [],
    rankingLimit: 10, // Get top 10
    dpiRange: [0.5, 1, 1.5, 2, 2.5, 3, 4]
  };
};
