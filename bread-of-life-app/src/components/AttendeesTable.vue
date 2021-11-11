<template>
    <section class="attendees-section">
        <h1>Attendees</h1>
        <el-container class="table-container">
            <el-main>
                <el-table :data="persons.filter((data) => !search || data.lastName.toLowerCase().includes(search.toLowerCase()))"
                          class="main-table" max-height="500" :default-sort="{prop: 'lastName', order: 'descending'}">

                    <el-table-column type="expand" #default="scope">
                        <el-table :data="persons[(scope.$index)+1].events" style="padding-left: 45px" max-height="200px">
                            <el-table-column prop="eventName" label="Event Name"></el-table-column>
                            <el-table-column prop="receiveVaccine" label="Receive Vaccine?"></el-table-column>
                            <el-table-column prop="vaccinePreference" label="Vaccine Preference"></el-table-column>
                            <el-table-column prop="requireAdditionalSupport" label="Addt'l. Support?"></el-table-column>
                            <el-table-column prop="referral" label="Referral"></el-table-column>
                        </el-table>
                    </el-table-column>
                    <el-table-column>
                        <template #header style="max-width: 50px">
                            <el-row justify="space-around" align="center">
                                <el-col :span="2" >
                                    <label style="display: inline">Personal Info</label>
                                </el-col>
                                <el-col :span="6" style="margin-right:auto;">
                                    <el-input v-model="search" size="mini" placeholder="Search last name"/>
                                </el-col>
                            </el-row>
                        </template>
                        <el-table-column prop="firstName" label="First Name"></el-table-column>
                        <el-table-column prop="lastName" label="Last Name"></el-table-column>
                        <el-table-column prop="phoneNumber" label="Phone Number"></el-table-column>
                        <el-table-column prop="zipCode" label="Zipcode"></el-table-column>
                        <el-table-column prop="numChildren" label="# Children"></el-table-column>
                        <el-table-column prop="receivedVaccine" label="Received Vaccine?" width="180"></el-table-column>
                        <el-table-column prop="elderly" label="Elderly?"></el-table-column>
                        <el-table-column prop="veteran" label="Veteran?"></el-table-column>
                        <el-table-column prop="ethnicity" label="Ethnicity"></el-table-column>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </section>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            persons: [ ],
            search: '',
        }
    },
    created() {
        this.fetchPersons()
    },
    methods: {
        fetchPersons() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/find-all'

            axios.get(apiUrl).then((res) => {
                this.persons = res.data
            }).catch(error => {
                alert(error)
            })
        }
    }
}
</script>

<style scoped>
.attendees-section {
    background-color: #FBCB93;
    color: #000000;
    width: 100%;
    min-height: 50vh;
    padding:1px;
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