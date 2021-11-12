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

                axios.get(apiUrlZips).then((res) => { //Get a list of unique zipcodes
                    for(const zipcode of res.data) { //Loop through returned zipcodes
                        let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/attendance/' //Construct a url based off of the current zipcode
                            + this.$route.params.id + '/'
                            + zipcode
                        axios.get(apiUrl).then((resp) => { //Use that ^ url to fetch attendance by zipcode
                            if(resp.data.length === 0) { //if resp has no entires that means no rsvps have been made to this event from this zipcode
                                //alert("NO DATA FOR ZIPCODE: " + zipcode)
                                console.log("NO DATA FOR ZIPCODE: " + zipcode)
                            }
                            else {
                                //alert(JSON.stringify(resp.data[0].RSVPs))
                                this.labels.push(zipcode)
                                this.colors.push(randomColor({luminosity: 'bright', hue: 'blue'})) //use randomcolor to create a new color - within a palette - for the new entry
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