<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  mounted() {
    this.renderChart(this.rawData, this.options)
  },

  data: () => ({
    rawData: {
      labels: [2014, 2015, 2016, 2017, 2018, 2019],
      datasets: [{
        label: 'Jumlah Penjualan',
        data: [12, 9, 10, 29, 22, 15, 31],

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },

    options: []
  })
}
</script>
