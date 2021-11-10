<template>
    <section class="attendees-section">
        <h1>Attendees</h1>
        <el-button type="danger" :icon="Back" round plain @click="$router.back()">Go Back</el-button>
        <el-container class="table-container">
            <el-main>
                <el-table :data="attendees.filter((data) => !search || data.lastName.toLowerCase().includes(search.toLowerCase()))"
                          class="main-table" max-height="500" :default-sort="{prop: 'lastName', order: 'descending'}" @expand-change="fetchRsvpData">

                    <el-table-column type="expand">
                        <el-table :data="rsvpData" style="padding-left: 45px" max-height="200px">
                            <el-table-column prop="receiveVaccine" label="Receive Vaccine?"></el-table-column>
                            <el-table-column prop="vaccinePreference" label="Vaccine Preference"></el-table-column>
                            <el-table-column prop="requireAdditionalSupport" label="Addt'l. Support?"></el-table-column>
                            <el-table-column prop="referral" label="Referral"></el-table-column>
                        </el-table>
                    </el-table-column>
                    <el-table-column label="Personal Info">
                        <el-table-column prop="firstName" label="First Name"></el-table-column>
                        <el-table-column prop="lastName" label="Last Name"></el-table-column>
                        <el-table-column prop="phoneNumber" label="Phone Number"></el-table-column>
                        <el-table-column prop="zipCode" label="Zipcode"></el-table-column>
                        <el-table-column prop="numChildren" label="# Children"></el-table-column>
                        <el-table-column prop="receivedVaccine" label="Received Vaccine?"></el-table-column>
                        <el-table-column prop="elderly" label="Elderly?"></el-table-column>
                        <el-table-column prop="veteran" label="Veteran?"></el-table-column>
                        <el-table-column prop="ethnicity" label="Ethnicity"></el-table-column>
                    </el-table-column>
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="mini" placeholder="Search last name"/>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </section>
</template>

<script>
    import axios from "axios"
    import { Back } from "@element-plus/icons"

    export default {
        data() {
            return {
                attendees: [],
                rsvpData: [],
                search: '',
                Back
            }
        },
        created() {
            this.fetchAttendees()
        },
        methods: {
            fetchAttendees() {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/event/attendance/' + this.$route.params.id

                axios.get(apiUrl).then((res) => {
                    this.attendees = res.data
                }).catch(error => {
                    console.log(error)
                })
            },
            fetchRsvpData(row, expandedRows) {
                this.checkExpandedOnlyOne(row, expandedRows)

                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/get-event-rsvp/' + row.personId + "/" + this.$route.params.id
                axios.get(apiUrl).then((res) => {
                    this.rsvpData = res.data
                }).catch(error => {
                    console.log(error)
                })
            },

            checkExpandedOnlyOne(row, expanded) {
                if(document.getElementsByClassName('el-table__expand-icon--expanded').length > 0)
                    if(expanded)
                        document.getElementsByClassName('el-table__expand-icon--expanded')[0].click()
            }
        }
    }
</script>

<style scoped>
    .attendees-section {
        background-color: #6197C4;
        color: #000000;
        width: 100%;
        padding-top: 1rem;
        height: 100vh;
    }
    .table-container {
        min-height:100%;
        max-height: 100%;
    }
    .main-table {
        display: inline-block;
        width: 90%;
    }
</style>