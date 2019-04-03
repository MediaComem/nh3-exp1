
<template>
  <bar-chart class="roundStats" :data="datacollection" :options="options"></bar-chart>
</template>

<script>
import BarChart from "./BarChart.js";

export default {
  props: ["labels", "charData"],
  components: {
    BarChart
  },
  data() {
    return {
      datacollection: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: "rgb(255, 0, 90)",
            hoverBackgroundColor: "rgb(255, 0, 90)",
            data: this.charData
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [
            {
              display: false,
              barPercentage: 0.9,
              categoryPercentage: 0.9
            }
          ],
          yAxes: [
            {
              display: false,
              minBarLength: 3
            }
          ]
        }
      }
    };
  }
};
</script>



