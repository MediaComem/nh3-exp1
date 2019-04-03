<template>
  <p class="textStats text-grey-lighter">{{ renderText }}</p>
</template>

<script>
export default {
  props: ["yearSelected", "yearCorrect", "yearBegin", "stats", "yearsInterval"],
  computed: {
    yearsDiff() {
      return Math.abs(parseInt(this.yearCorrect) - this.yearSelected);
    },
    idxPeriodCorrect() {
      return Math.floor(
        (this.yearCorrect - this.yearBegin) / this.yearsInterval
      );
    },
    percentCorrect() {
      return (
        Math.floor(
          this.stats.countPerPeriod.data[this.idxPeriodCorrect] /
            this.stats.total
        ) * 100
      );
    },
    percentLess10() {
      let idxDecade = 10 / this.yearsInterval;
      let sumCount = this.getSumWithinRange(
        this.stats.countPerPeriod.data,
        this.idxPeriodCorrect,
        idxDecade
      );

      return Math.floor((sumCount / this.stats.total) * 100);
    },
    percentMore100() {
      let idxCentury = 100 / this.yearsInterval;
      let sumCount = this.getSumOutsideRange(
        this.stats.countPerPeriod.data,
        this.idxPeriodCorrect,
        idxCentury
      );

      return Math.floor((sumCount / this.stats.total) * 100);
    },
    renderText() {
      switch (true) {
        case this.yearsDiff === 0:
          return this.$tc("game.summary.stats.perfect", this.percentCorrect, {
            percent: this.percentCorrect
          });
          break;

        case this.yearsDiff < 10:
          return this.$tc("game.summary.stats.less10Y", this.percentLess10, {
            percent: this.percentLess10
          });
          break;

        case this.yearsDiff < 30:
          return this.$t("game.summary.stats.less30Y", {
            yearsDiff: this.yearsDiff
          });
          break;

        case this.yearsDiff < 50:
          return this.$t("game.summary.stats.less50Y", {
            yearsDiff: this.yearsDiff
          });
          break;

        case this.yearsDiff < 100:
          return this.$t("game.summary.stats.less100Y", {
            yearsDiff: this.yearsDiff
          });
          break;

        case this.yearsDiff > 100:
          return this.$tc("game.summary.stats.more100Y", this.percentMore100, {
            percent: this.percentMore100
          });
          break;

        default:
          return "";
      }
    }
  },
  methods: {
    getSumWithinRange(arrPeriod, idxStart, idxRangeEnd) {
      let sumCount = 0;

      // Direction yearBegin
      for (let i = idxStart; i >= idxStart - idxRangeEnd; i--) {
        if (arrPeriod[i] !== undefined) {
          sumCount += arrPeriod[i];
        }
      }

      // Direction yearEnd
      for (let i = idxStart; i <= idxStart - idxRangeEnd; i++) {
        if (arrPeriod[i] !== undefined) {
          sumCount += arrPeriod[i];
        }
      }

      return sumCount;
    },
    getSumOutsideRange(arrPeriod, idxStart, idxRangeEnd) {
      let sumCount = 0;

      // Direction yearBegin
      for (let i = idxStart - idxRangeEnd; i >= 0; i--) {
        if (arrPeriod[i] !== undefined) {
          sumCount += arrPeriod[i];
        }
      }

      // Direction yearEnd
      for (let i = idxStart + idxRangeEnd; i <= arrPeriod.length; i++) {
        if (arrPeriod[i] !== undefined) {
          sumCount += arrPeriod[i];
        }
      }

      return sumCount;
    }
  }
};
</script>