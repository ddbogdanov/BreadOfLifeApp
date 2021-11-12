<template>
    <section class="person-add-form-container">
        <div class="person-add-form">
            <h1 style="font-family: Roboto Light">REGISTER</h1>
            <el-form ref="formRef" :model="person" label-position="right" label-width="auto">
                <el-row justify="middle">
                    <el-col :span="12">
                        <el-form-item label="First Name" prop="firstName">
                            <el-input v-model="person.firstName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Last Name" prop="lastName">
                            <el-input v-model="person.lastName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Phone Number" prop="phoneNumber">
                    <el-input v-model="person.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="Zip Code" prop="zipCode">
                    <el-input v-model="person.zipCode"></el-input>
                </el-form-item>
                <el-row justify="space-between">
                    <el-col :span="9">
                        <el-form-item label="COVID Vaccinated?" prop="receivedVaccine" style="float: left">
                            <el-radio-group v-model="person.receivedVaccine" >
                                <el-radio-button label=true>Yes</el-radio-button>
                                <el-radio-button label=false>No</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="Elderly?" prop="elderly" style="float: left" label-width="50">
                            <el-radio-group v-model="person.elderly">
                                <el-radio-button label=true>Yes</el-radio-button>
                                <el-radio-button label=false>No</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="Veteran?" prop="veteran" style="float: left"  label-width="50">
                            <el-radio-group v-model="person.veteran">
                                <el-radio-button label=true>Yes</el-radio-button>
                                <el-radio-button label=false>No</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="Num. Children?">
                    <el-input-number v-model="person.numChildren" :min="0" style="float: left"></el-input-number>
                </el-form-item>
                <el-form-item label="Ethnicity" prop="ethnicity" style="float: left">
                    <el-select v-model="person.ethnicity" clearable placeholder="Ethnicity">
                        <el-option
                                v-for="ethnicity in ethnicities"
                                :key="ethnicity.ethnicity"
                                :label="ethnicity.ethnicity"
                                :value="ethnicity.ethnicity"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="onSubmit">Register</el-button>
                    <el-button @click="onCancel">Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "PersonAddForm",
    data() {
        return {
            person: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                zipCode: '',
                receivedVaccine: '',
                numChildren: '',
                elderly: '',
                veteran: '',
                ethnicity: '',
            },
            ethnicities: [
                {
                    ethnicity: 'American Indian or Alaska Native'
                },
                {
                    ethnicity: 'Asian'
                },
                {
                    ethnicity: 'Black or African American'
                },
                {
                    ethnicity: 'Hispanic or Latino'
                },
                {
                    ethnicity: 'Native Hawaiian or Other Pacific Islander'
                },
                {
                    ethnicity: 'White'
                }
            ]
        }
    },
    methods: {
        onSubmit() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person'

            axios.post(apiUrl, this.person).then((res) => {
                alert("Thanks!")
                console.log(res.data)

                this.$router.push('/rsvp')
            }).catch(e => {
                alert(e)
            })
        },
        onCancel() {
            this.$refs.formRef.resetFields();
            this.$router.push('/rsvp')
        }
    }
}
</script>

<style scoped>
    .person-add-form-container {
        color: #000000;
        width: 100%;
        padding-top: 1rem;
    }
    .person-add-form {
        margin: 0 auto;
        max-width: 40%;
    }
</style>