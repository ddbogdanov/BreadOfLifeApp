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
        colors: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    async mounted() {
        await new Chart(this.$refs.myChart, {
            type: 'doughnut',
            data: {
                labels: this.label,
                datasets: [
                    {
                        label: 'Attendance',
                        backgroundColor: this.colors,
                        data: this.chartData,
                    }
                ]
            },
        })
    },
}
</script>