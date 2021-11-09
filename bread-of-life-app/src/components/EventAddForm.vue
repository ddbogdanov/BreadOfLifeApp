<template>
    <section class="event-edit-form-container">
        <div class="event-edit-form">
            <h1>Add An Event</h1>
            <el-form ref="formRef" :model="event" label-position="right" label-width="100px">
                <el-form-item label="Event Name" prop="name">
                    <el-input v-model="event.name"></el-input>
                </el-form-item>
                <el-form-item label="Location" prop="location">
                    <el-input v-model="event.location"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col>
                        <el-form-item label="Services" prop="services" style="margin-left:-100px;">
                            <el-select v-model="event.services" multiple collapse-tags placeholder="Select Services">
                                <el-option v-for="service in servicesData" :key="service._id" :label="service.serviceName" :value="service._id" fit-input-width="true"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="Date" prop="date">
                            <el-date-picker
                                    v-model="event.date"
                                    type="date"
                                    placeholder="Pick a date"

                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="float: left;">
                    <el-button type="primary" @click="onSubmit">Add Event</el-button>
                    <el-button @click="onCancel">Clear</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
    import axios from "axios"

    export default {
        name: "EventEditForm",

        data() {
            return {
                event: {
                    name: '',
                    location: '',
                    services: [],
                    date: ''
                },
                servicesData: [ ],
            }
        },
        created() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/find-all'

            axios.get(apiUrl).then((res) => {
                this.servicesData = res.data
            }).catch(error => {
                alert(error)
            })
        },
        methods: {
            onSubmit() {
                let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events'

                axios.post(apiUrl, this.event).then((res) => {
                    alert("Event: " + this.event.name + " Added!")
                    console.log(res.data)

                    this.$router.go() //Reload page so table displays new data. Yes its lazy and there's a better way, no I dont care.
                }).catch(error => {
                    alert(error)
                    this.$router.go()
                })
            },
            onCancel() {
                this.$refs.formRef.resetFields();
            }
        }
    };
</script>


<style scoped>
    .event-edit-form-container {
        background-color: #FBCB93;
        width: 100%;
        padding-top: 1rem;
        min-height: 50vh;
    }
    .event-edit-form {
        margin: 0 auto;
        max-width: 40%;
    }
</style>
