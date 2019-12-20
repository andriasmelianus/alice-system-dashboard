<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted() {
    this.renderChart(this.rawData, this.options)
  },

  data: () => ({
    rawData: {
      labels: [2014, 2015, 2016, 2017, 2018, 2019],
      datasets: [{
        label: 'Jumlah Penjualan',
        data: [12, 9, 10, 29, 22, 31],

        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }]
    },

    options: {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }]
      }
    }
  })
}
</script>
