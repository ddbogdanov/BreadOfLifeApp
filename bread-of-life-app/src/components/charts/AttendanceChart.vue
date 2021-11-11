<template>
    <div class="container">
        <el-row align="middle">
            <el-col :span="4" :pull="1">
                <el-button type="danger" :icon="Back" round plain @click="$router.back()">Go Back</el-button>
            </el-col>
            <el-col :span="16">
                <h1>Attendance By ZIP Code</h1>
                <h1>For Event: {{this.$route.params.eventName}}</h1>
            </el-col>
        </el-row>
        <PieChart v-if="!loading" :label="labels" :colors="colors" :chart-data="attendanceData"></PieChart>
    </div>
</template>

<script>
    import PieChart from './PieChart.vue'
    import randomColor from "randomcolor" //Gets random colors that look somewhat nice together
    import axios from "axios"

    export default {
        data: () => {
            return {
                labels: [],
                colors: [],
                attendanceData: [],
                loading: false,
            }
        },
        components: {
            PieChart,
        },
        created() {
            this.fetchChartData()
        },
        methods: {
            async fetchChartData() {
                this.loading = true

                let apiUrlZips = process.env.VUE_APP_BASE_API_URL + '/person/get-unique-zipcodes'

                axios.get(apiUrlZips).then((res) => {
                    for(const zipcode of res.data) {
                        let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/attendance/'
                            + this.$route.params.id + '/'
                            + zipcode
                        axios.get(apiUrl).then((resp) => {
                            if(resp.data.length === 0) {
                                //alert("NO DATA FOR ZIPCODE: " + zipcode)
                                console.log("NO DATA FOR ZIPCODE: " + zipcode)
                            }
                            else {
                                //alert(JSON.stringify(resp.data[0].RSVPs))
                                this.labels.push(zipcode)
                                this.colors.push(randomColor({luminosity: 'bright', hue: 'blue'}))
                                this.attendanceData.push(resp.data[0].RSVPs)

                                //alert("FULL DATA:\n\n\n\n" + JSON.stringify(this.labels) + '\n\n\n\n' + JSON.stringify(this.attendanceData))
                                if(res.data[res.data.length-1] === zipcode) { //On last iteration tell the app we're done loading. A bit hacky but i dont feel like making a counter hopefully this works
                                    this.loading = false
                                }
                            }
                        }).catch(error => {
                            alert(error)
                        })
                    }
                }).catch(error => {
                    alert(error)
                })
            },
        }
    }
</script>










<!--// for(const zipcode of zipcodeData) {-->
<!--//     alert(zipcode)-->
<!--//     this.labels.push(zipcode)-->
<!--//-->
<!--//     let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/attendance/'-->
<!--//         + this.$route.params.id + '/'-->
<!--//         + zipcode-->
<!--//     const { zipAttendance } = await axios.get(apiUrl)-->
<!--//     alert(JSON.stringify(zipAttendance))-->
<!--//-->
<!--//     this.attendanceData.push(zipAttendance)-->
<!--// }-->


<!--<script>-->
<!--import PieChart from "./PieChart.vue"-->
<!--import axios from "axios"-->

<!--export default {-->
<!--    name: 'EventChart',-->
<!--    components: { PieChart },-->

<!--    data: () => ({-->
<!--        loaded: false,-->
<!--        chartdata: null,-->
<!--        uniqueZipcodes: [],-->
<!--    }),-->
<!--    async mounted() {-->
<!--        this.loaded = false-->
<!--        try {-->
<!--            // this.fetchUniqueZipcodes().then(() => {-->
<!--            //     alert("THEN!!!!!")-->
<!--            //     this.fetchAttendance().then(() => {-->
<!--            //         alert("AGAIN THEN!!!")-->
<!--            //         this.loaded = true-->
<!--            //         alert(JSON.stringify(this.uniqueZipcodes))-->
<!--            //         alert(JSON.stringify(this.chartData))-->
<!--            //     })-->
<!--            // })-->
<!--            await this.fetchUniqueZipcodes()-->
<!--            alert("MOUNTED" + JSON.stringify(this.uniqueZipcodes))-->
<!--            // const { attendancelist } = await this.fetchAttendance()-->
<!--            // this.chartdata = attendancelist-->
<!--        } catch(e) {-->
<!--            alert("CATCH" + e)-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        async fetchUniqueZipcodes() {-->
<!--            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/get-unique-zipcodes'-->

<!--            axios.get(apiUrl).then((res) => {-->
<!--                this.uniqueZipcodes = res.data-->
<!--                alert(JSON.stringify(this.uniqueZipcodes))-->
<!--            }).catch(error => {-->
<!--                alert(error)-->
<!--            })-->
<!--        },-->
<!--        async fetchAttendance() {-->
<!--            alert("fetching attendance")-->
<!--            for(const zipcode in this.uniqueZipcodes) {-->
<!--                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/attendance/'-->
<!--                    + this.$route.params.id + '/'-->
<!--                    + zipcode-->

<!--                axios.get(apiUrl).then((result) => {-->
<!--                    this.chartData.push(result.data)-->
<!--                }).catch(error => {-->
<!--                    alert(error)-->
<!--                })-->
<!--            }-->
<!--        },-->
<!--    }-->
<!--    // data() {-->
<!--    //     return {-->
<!--    //         loaded: false,-->
<!--    //         chartData: null,-->
<!--    //         uniqueZipcodes: []-->
<!--    //     }-->
<!--    // },-->
<!--    // mounted() {-->
<!--    //     this.loaded = false-->
<!--    //     this.fetchUniqueZipcodes()-->
<!--    //     this.fetchAttendance()-->
<!--    //     this.loaded = true-->
<!--    // },-->
<!--    // methods: {-->
<!--    //     fetchUniqueZipcodes() {-->
<!--    //         let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/get-unique-zipcodes'-->
<!--    //-->
<!--    //         axios.get(apiUrl).then((res) => {-->
<!--    //             this.uniqueZipcodes = res.data-->
<!--    //         }).catch(error => {-->
<!--    //             alert(error)-->
<!--    //         })-->
<!--    //     },-->
<!--    //     fetchAttendance() {-->
<!--    //         for(const zipcode in this.uniqueZipcodes) {-->
<!--    //             alert("fetching attendance")-->
<!--    //             let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/attendance/'-->
<!--    //                 + this.$route.params.id + '/'-->
<!--    //                 + zipcode-->
<!--    //-->
<!--    //             axios.get(apiUrl).then((result) => {-->
<!--    //                 this.chartData.push(result.data)-->
<!--    //             }).catch(error => {-->
<!--    //                 alert(error)-->
<!--    //             })-->
<!--    //         }-->
<!--    //     },-->
<!--    // }-->
<!--}-->
<!--</script>-->