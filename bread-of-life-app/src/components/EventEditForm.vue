<template>
    <div class="event-edit-form">
        <h1>Edit Event</h1>
        <el-form ref="formRef" :model="event" label-position="right" label-width="100px">
            <el-form-item label="Event Name" prop="name">
                <el-input v-model="event.name"></el-input>
            </el-form-item>
            <el-form-item label="Location" prop="location">
                <el-input v-model="event.location"></el-input>
            </el-form-item>
            <el-form-item label="Services" prop="services">
                <el-select v-model="event.services" multiple collapse-tags placeholder="Select Services" style="width: 100%">
                    <el-option v-for="service in servicesData" :key="service._id" :label="service.serviceName" :value="service._id" fit-input-width="true"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Date" prop="date">
                <el-date-picker
                        v-model="event.date"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Submit Edits</el-button>
                <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios"

    export default {
        name: "EventEditForm",

        data() {
            return {
                event: { },
                servicesData: [ ]
            }
        },
        created() {
            this.fetchEventsData()
            this.fetchServicesData()
        },
        methods: {
            onSubmit() {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/' + this.$route.params.id

                axios.put(apiUrl, this.event).then((res) => {
                    console.log(res)
                    this.$router.push('/manager')
                }).catch(error => {
                    alert(error)
                })
            },
            onCancel() {
                this.$refs.formRef.resetFields()
                this.$router.push('/manager')
            },

            fetchEventsData() {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/' + this.$route.params.id

                axios.get(apiUrl).then((res) => {
                    this.event = res.data[0]
                }).catch(error => {
                    alert(error)
                })
            },
            fetchServicesData() {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/find-all'

                axios.get(apiUrl).then((res) => {
                    this.servicesData = res.data
                }).catch(error => {
                    alert(error)
                })
            }
        }
    };
</script>


<style scoped>
    .event-edit-form {
        margin: 0 auto;
        max-width: 40%
    }
</style>