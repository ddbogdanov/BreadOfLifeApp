<template>
    <canvas ref="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
    props: {
        label: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    async mounted() {
        alert("In PieChart.vue\n\n\n\n" + this.chartData)
        alert("In piechart.vue/labels\n\n\n\n" + this.label)
        await new Chart(this.$refs.myChart, {
            type: 'doughnut',
            data: {
                labels: this.label,
                datasets: [
                    {
                        label: 'Attendance',
                        backgroundColor: 'rgba(144,238,144 , 0.9 )',
                        data: this.chartData,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }
}
</script>