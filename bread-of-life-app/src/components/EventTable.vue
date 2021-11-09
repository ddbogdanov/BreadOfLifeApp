<template>
    <section class="event-section">
        <h2>Events</h2>
        <el-container class="table-container" >
            <el-main class="main-table-container">

                <el-table :data="eventsData.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                          class="main-table" max-height="500" :default-sort="{prop: 'date', order: 'descending'}" @expand-change="getServicesByEvent">

                    <el-table-column type="expand">
                        <el-table :data="servicesData" style="padding-left: 45px">
                            <el-table-column prop="serviceName" label="Service(s)"></el-table-column>
                        </el-table>
                    </el-table-column>
                    <el-table-column prop="date" label="Date" sortable :formatter="dateFormatter"></el-table-column>
                    <el-table-column label="Event Info" class="column">
                        <el-table-column prop="name" label="Event Name"></el-table-column>
                        <el-table-column prop="location" label="Location"></el-table-column>
                    </el-table-column>
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="mini" placeholder="Type to search"/>
                        </template>
                        <template #default="scope">
                            <el-button size="mini" @click="$router.push({name: 'EventEditForm', params: {id: scope.row.eventId}})"> Edit </el-button>
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
                search: '',

                servicesData: []
            }
        },
        created() {
            this.getEvents()
        },
        methods: {
            getEvents() {
                let apiUrl =  process.env.VUE_APP_BASE_API_URL + "/events/find-all"

                axios.get(apiUrl).then(res => {
                    this.eventsData = res.data
                }).catch(error => {
                    console.log(error)
                });
            },
            getServicesByEvent(row, expandedRows) {
                this.checkExpandedOnlyOne(row, expandedRows)
                let apiUrl = process.env.VUE_APP_BASE_API_URL + "/event/services/find-all/" + row.eventId

                axios.get(apiUrl).then(res => {
                    this.servicesData = res.data
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },
            dateFormatter(row) {
                return moment(row.date).format('MM-DD-YYYY');
            },


            handleEdit(index, row) {
                alert("Editing: " + index.toString() + row.toString());
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

            checkExpandedOnlyOne(row, expanded) {
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
        color: #FFFFFF;
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
        width: 70%;
    }
</style>