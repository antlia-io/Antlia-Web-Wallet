<template>
  
</template>

<script>
import Vue from "vue"
import VueCharts from 'vue-chartjs'
import { Doughnut, mixins  } from 'vue-chartjs'


export default {
  name: `PieGraph`,
extends: Doughnut,
  props: ["data", "options"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
    });
  }, 
  components: {
    // vueCountryRegionSelect,
    // CountrySelect
  },
  // data: () => ({
  //   country: "",
  //   region: "",
  //   result: null
  // })
}
</script>
<style scoped>

</style>

