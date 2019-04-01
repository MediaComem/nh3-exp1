export default {
  imagesDoneLastGame: state => {
    return state.roundDone
      .filter(image => image.gameNumber === state.game.number - 1)
      .map(a => ({
        ...state.imagesSet.find(b => a.idnh === b.idnh),
        ...a
      }));
  },
  imagesDone: state => {
    return state.imagesSet.filter(image =>
      state.roundDone.find(score => score.idnh === image.idnh)
    );
  },
  imagesToDo: state => {
    return state.imagesSet.filter(
      image => !state.roundDone.find(score => score.idnh === image.idnh)
    );
  }
};
