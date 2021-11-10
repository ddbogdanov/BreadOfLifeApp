<template>
    <div class="service-add-form">
        <h1>Edit Service</h1>
        <el-form ref="formRef" :model="service" label-position="right" label-width="100px">
            <el-form-item label="Service Name" prop="serviceName">
                <el-input v-model="service.serviceName"></el-input>
            </el-form-item>
            <el-form-item label="Service Description" prop="description">
                <el-input v-model="service.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Submit</el-button>
                <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ServiceAddForm",
    data() {
        return {
            service: { },
        }
    },
    methods: {
        onSubmit() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/service/'

            axios.post(apiUrl, this.service).then((res) => {
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

<style scoped>
.service-add-form {
    margin: 0 auto;
    max-width: 40%
}
</style>