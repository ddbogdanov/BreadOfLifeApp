<template>
    <div class="rsvp">
        <el-row class="form" justify="space-between">
            <el-col>
                <h1>Hi there</h1>
                <h1>Have you registered with us before?</h1>
                <el-row align="center" justify="space-between" style="margin-top: 4rem;">
                    <el-col :span="24">
                        <el-button type="success" round plain style="width: 12rem; font-size:2rem;  font-family: Roboto Light,sans-serif;"
                                   @click="$router.push({name: 'PersonRsvpForm'})">Yes</el-button>
                        <el-button round style="width: 12rem; font-size:2rem; font-family: Roboto Light,sans-serif"
                                   @click="$router.push({name: 'PersonAddForm'})">No</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .rsvp {
        background-color: #6197C4;
        color: #FFFFFF;
        font-family: "Roboto Light",sans-serif;
        width: 100%;
        padding-top: 1rem;
        height: 87.9vh;

        position: relative;
    }
    .form {
        position: absolute;
        top: 25%;
        left: 35%;
    }
</style>
