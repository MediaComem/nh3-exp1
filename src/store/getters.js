export default {
  imagesDoneLastGame: state => {
    return state.roundDone
      .filter(image => image.gameNumber === state.game.number)
      .map(a => ({
        ...state.imagesSet.find(b => a.id === b.id),
        ...a
      }));
  },
  imagesDone: state => {
    return state.imagesSet.filter(image =>
      state.roundDone.find(score => score.id === image.id)
    );
  },
  imagesToDo: state => {
    return state.imagesSet.filter(
      image => !state.roundDone.find(score => score.id === image.id)
    );
  }
};
