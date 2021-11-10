<template>
    <div class="service-edit-form">
        <h1>Edit Service</h1>
        <el-form ref="formRef" :model="service" label-position="right" label-width="100px">
            <el-form-item label="Service Name" prop="serviceName">
                <el-input v-model="service.serviceName"></el-input>
            </el-form-item>
            <el-form-item label="Service Description" prop="description">
                <el-input v-model="service.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Submit Edits</el-button>
                <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ServiceEditForm",
    data() {
        return {
            service: { },
        }
    },
    created() {
        this.fetchServiceData()
    },
    methods: {
        fetchServiceData() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/' + this.$route.params.id

            axios.get(apiUrl).then((res) => {
                this.service = res.data[0]
            }).catch(error => {
                alert(error)
            })
        },
        onSubmit() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/' + this.$route.params.id

            axios.put(apiUrl, this.service).then((res) => {
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
    }
}
</script>