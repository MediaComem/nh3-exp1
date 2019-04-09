export default {
  imagesDoneLastGame: state => {
    return state.roundDone
      .filter(
        image =>
          image.gameNumber === state.game.number - 1 &&
          image.replayCount === state.replayCount
      )
      .map(a => ({
        ...state.imagesSet.find(b => a.idnh === b.idnh),
        ...a
      }));
  },
  imagesDone: state => {
    return state.imagesSet.filter(image =>
      state.roundDone.find(
        score =>
          score.idnh === image.idnh && score.replayCount === state.replayCount
      )
    );
  },
  imagesToDo: state => {
    return state.imagesSet.filter(
      image =>
        !state.roundDone.find(
          score =>
            score.idnh === image.idnh && score.replayCount === state.replayCount
        )
    );
  }
};
