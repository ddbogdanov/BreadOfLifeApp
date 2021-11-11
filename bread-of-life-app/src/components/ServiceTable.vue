<template>
    <section class="service-section">
        <div class="service-table-container">
            <h1>Services</h1>
            <el-container class="table-container">
                <el-main>
                    <el-table :data="servicesData.filter((data) => !search || data.serviceName.toLowerCase().includes(search.toLowerCase()))"
                              class="main-table" max-height="500" :default-sort="{prop: 'serviceName', order: 'descending'}">

                        <el-table-column type="expand">
                            <template #default="props">
                                <p style="padding-left: 65px"><b>Description:</b> {{props.row.description}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serviceName" label="Service Name" sortable></el-table-column>
                        <el-table-column align="right">
                            <template #header>
                                <el-row justify="end">
                                    <el-col :span="16">
                                        <el-input v-model="search" size="mini" placeholder="Type to search"/>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button size="mini" type="primary" @click="$router.push({name: 'ServiceAddForm'})"> Add Service </el-button>
                                    </el-col>
                                </el-row>
                            </template>
                            <template #default="scope">
                                <el-button size="mini" type="success" plain @click="$router.push({name: 'ServiceEditForm', params: {id: scope.row.serviceId}})"> Edit </el-button>
                                <el-button size="mini" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            servicesData: [],
            search: '',
        }
    },
    created() {
        this.fetchServicesData()
    },
    methods: {
        fetchServicesData() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/find-all'

            axios.get(apiUrl).then((res) => {
                this.servicesData = res.data
            }).catch(error => {
                alert(error)
            })
        },
        handleDelete(index, row) {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/' + row.serviceId

            if(window.confirm("Are you sure you want to delete this service? " +
                "This is a DANGEROUS action - please first make sure this service is not in use in any events.")) {
                axios.delete(apiUrl).then(() => {
                    this.servicesData.splice(index, 1)
                }).catch(error => {
                    alert(error);
                });
            }
        },
    }
}
</script>

<style scoped>
.service-section {
    background-color: #C2C0BC;
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
    width: 50%;
}
</style>