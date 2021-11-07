<template>
    <div class="manager">
        <h1>Manager type stuff goes here</h1>
        <section>
            <h2>Events</h2>
            <div>
                <el-container>
                    <el-aside>
                        <el-menu>
                            <el-menu-item-group>
                                <el-sub-menu index="1">
                                    <template #title>Group 1</template>
                                    <el-menu-item index="1-1">Option 1</el-menu-item>
                                </el-sub-menu>
                            </el-menu-item-group>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <el-table :data="eventsData">
                            <el-table-column prop="name" label="Event Name" width="150"></el-table-column>
                            <el-table-column prop="location" label="Location" width="150"></el-table-column>
                            <el-table-column prop="date" label="Date" width="150" :formatter="dateFormatter"></el-table-column>
                        </el-table>
                    </el-main>
                </el-container>
            </div>
        </section>
    </div>
</template>

<script>
    // import RsvpRelatedComponent from "@/components/RsvpRelatedComponent.vue";
    import axios from "axios";
    import moment from 'moment';
    //v-slot="row"
    export default {
        name: "Manager",

        data() {
            return {
                eventsData: []
            }
        },
        created() {
            this.getEvents();
        },
        methods: {
            getEvents() {
                let apiUrl =  process.env.VUE_APP_BASE_API_URL + "/events/find-all"
                axios.get(apiUrl).then(res => {
                    this.eventsData = res.data;
                }).catch(error => {
                    console.log(error)
                });
            },
            dateFormatter(row) {
                return moment(row.date).format('MM-DD-YYYY hh:mm A');
            }
        }
    }
</script>