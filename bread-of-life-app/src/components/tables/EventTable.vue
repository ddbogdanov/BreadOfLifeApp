<template>
    <section class="event-section">
        <h2>Events</h2>
        <el-container class="table-container" >
            <el-main class="main-table-container">

                <el-table :data="eventsData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                          class="main-table" max-height="500" :default-sort="{prop: 'date', order: 'descending'}" @expand-change="getServicesByEvent">

                    <el-table-column type="expand">
                        <el-table :data="servicesData" style="padding-left: 45px" max-height="200px">
                            <el-table-column prop="serviceName" label="Service(s)"></el-table-column>
                        </el-table>
                    </el-table-column>
                    <el-table-column prop="date" label="Date" sortable :formatter="dateFormatter" width="100"></el-table-column>
                    <el-table-column label="Event Info" class="column">
                        <el-table-column prop="name" label="Event Name"></el-table-column>
                        <el-table-column prop="location" label="Location"></el-table-column>
                    </el-table-column>
                    <el-table-column align="right">
                        <template #header>
                            <el-row>
                                <el-input v-model="search" size="mini" placeholder="Type to search"/>
                            </el-row>
                            <el-row justify="end" style="padding-top: 10px;">
                                <el-button size="mini" type="primary" @click="$router.push({name: 'EventAddForm'})" style="width: 123px">Add Event</el-button>
                            </el-row>
                        </template>
                        <template #default="scope">
                            <el-button size="mini" @click="$router.push({name: 'AttendanceChart', params: {id: scope.row.eventId, eventName: scope.row.name}})">Chart</el-button>
                            <el-button size="mini" @click="$router.push({name: 'EventAttendeesTable', params: {id: scope.row.eventId}})">View Attendees</el-button>
                            <el-button size="mini" type="success" plain @click="$router.push({name: 'EventEditForm', params: {id: scope.row.eventId}})"> Edit </el-button>
                            <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </section>
</template>

<script>
    import axios from "axios";
    import moment from 'moment';
    export default {
        data() {
            return {
                eventsData: [],
                servicesData: [],
                search: '',
            }
        },
        created() {
            this.fetchEventsData()
        },
        methods: {
            fetchEventsData() {
                let apiUrl =  process.env.VUE_APP_BASE_API_URL + "/events/find-all"

                axios.get(apiUrl).then(res => {
                    this.eventsData = res.data
                }).catch(error => {
                    console.log(error)
                });
            },
            getServicesByEvent(row, expandedRows) { //triggered when an expandChange is detected. Provides row and expandedRows that tell us the state of the table, and the row that is expanded
                this.checkExpandedOnlyOne(row, expandedRows)
                let apiUrl = process.env.VUE_APP_BASE_API_URL + "/event/services/find-all/" + row.eventId

                axios.get(apiUrl).then(res => {
                    this.servicesData = res.data
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },
            dateFormatter(row) { //date formatter for date column
                return moment(row.date).format('MM-DD-YYYY');
            },
            handleDelete(index, row) {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/' + row.eventId

                if(window.confirm("Are you sure you want to delete this event?")) {
                    axios.delete(apiUrl).then(() => {
                        this.eventsData.splice(index, 1)
                    }).catch(error => {
                        alert(error);
                    });
                }
            },

            checkExpandedOnlyOne(row, expanded) { //make sure only one row is expanded at a time since data is loaded dynamically for each expansion
                if(document.getElementsByClassName('el-table__expand-icon--expanded').length > 0)
                    if(expanded)
                        document.getElementsByClassName('el-table__expand-icon--expanded')[0].click()
            }
        }
    }
</script>

<style scoped>
    .event-section {
        background-color: #6197C4;
        color: #000000;
        width: 100%;
        padding-top: 1rem;
        min-height: 50vh;
    }
    .table-container {
        min-height:100%;
        max-height: 100%;
    }
    .main-table {
        display: inline-block;
        width: 80%;
    }
</style>