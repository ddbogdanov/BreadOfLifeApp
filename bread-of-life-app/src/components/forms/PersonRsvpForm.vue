<template>
    <section class="person-rsvp-form-container">
        <div class="person-rsvp-form">

            <div v-if="!haveFound">
                <h1 style="font-family: Roboto Light">First: Let's find you</h1>
                <el-form :inline="true" ref="formRef" :model="person" :rules="findRules">
                    <el-form-item label="First Name" prop="firstName">
                        <el-input v-model="person.firstName"></el-input>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="lastName">
                        <el-input v-model="person.lastName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onFindPerson">Find</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="haveFound && haveLoaded">
                <h1 style="font-family: Roboto Light">Now, Let's RSVP!</h1>
                <el-form ref="rsvpFormRef" :model="eventRsvp" label-position="top" :rules="rsvpRules">
                    <el-form-item label="Which of these events are you planning on attending?" required style="margin-top: 50px;">
                        <el-radio-group v-model="eventRadioIndex" style="float:left;">
                            <el-radio border label="0">{{upcomingEvents[0].name}} | {{formatDate(upcomingEvents[0].date)}}</el-radio>
                            <el-radio border label="1">{{upcomingEvents[1].name}} | {{formatDate(upcomingEvents[1].date)}}</el-radio>
                            <el-radio border label="2">{{upcomingEvents[2].name}} | {{formatDate(upcomingEvents[1].date)}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Do you want to receive the COVID vaccine?" prop="receiveVaccine" required style="margin-top: 50px;">
                        <el-radio-group v-model="eventRsvp.receiveVaccine" style="float:left;">
                            <el-radio border label="true">Yes</el-radio>
                            <el-radio border label="false">No</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Which vaccine would you prefer (if any)?" prop="vaccinePreference" required style="margin-top: 50px;">
                        <el-radio-group v-model="eventRsvp.vaccinePreference" style="float:left;">
                            <el-radio border label="Moderna">Moderna</el-radio>
                            <el-radio border label="Pfizer">Pfizer</el-radio>
                            <el-radio border label="Johnson & Johnson">Johnson & Johnson</el-radio>
                            <el-radio border label="None/No Preference">No Preference/None</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Do you require any additional support?" prop="requireAdditionalSupport" required style="margin-top: 50px;">
                        <el-radio-group v-model="eventRsvp.requireAdditionalSupport" style="float:left;">
                            <el-radio border label="true">Yes</el-radio>
                            <el-radio border label="false">No</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="How did you hear about us? (Type to add your own entry)" style="margin-top: 50px;">
                        <el-select v-model="eventRsvp.referral" filterable allow-create style="float: left;">
                            <el-option
                                    v-for="referral in referrals"
                                    :key="referral.name"
                                    :label="referral.name"
                                    :value="referral.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right; margin-top: 100px">
                        <el-button type="primary" @click="onSubmit" style="width:10rem;">RSVP</el-button>
                        <el-button @click="onCancel">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from "axios"
import moment from "moment";

export default {
    name: "PersonRsvpForm",

    data() {
        return {
            person: { },
            eventRsvp: { },
            upcomingEvents: [],
            referrals: [
                {
                    name: 'Facebook'
                },
                {
                    name: 'Instagram'
                },
                {
                    name: 'Twitter'
                },
                {
                    name: 'Word of Mouth'
                },
                {
                    name: 'KMAZ 102.5fm'
                },
            ],
            eventRadioIndex: '',
            haveFound: false,
            haveLoaded: false,

            findRules: {
                firstName: [
                    {
                        required: true,
                        message: 'First Name is required',
                        trigger: 'change'
                    }
                ],
                lastName: [
                    {
                        required: true,
                        message: 'Last Name is required',
                        trigger: 'change'
                    }
                ]
            },
            rsvpRules: {
                vaccinate: [
                    {
                        required: true,
                        message: 'Please select a preference',
                        trigger: 'change',
                    },
                ],
                vaccinePreference: [
                    {
                        required: true,
                        message: 'Please select a preference',
                        trigger: 'change',
                    }
                ],
                additionalSupport: [
                    {
                        required: true,
                        message: 'Please select a preference',
                        trigger: 'change',
                    }
                ],
            }
        }
    },
    created() {
       this.fetchUpcomingEvents()
    },
    methods: {
        fetchUpcomingEvents() {
            let apiUrl = process.env.VUE_APP_BASE_API_URL + '/events/get-most-recent'

            axios.get(apiUrl).then((res) => {
                this.upcomingEvents = res.data
                this.haveLoaded = true
            }).catch(e => {
                alert(e)
            })
        },

        onFindPerson() {
            this.$refs.formRef.validate((valid) => {
                if(valid) {
                    let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/' + this.person.firstName + '/' + this.person.lastName

                    axios.get(apiUrl).then((res) => {
                        if (res.data[0] != null) {
                            this.person = res.data[0]
                            ElMessage({
                                message: 'Found!',
                                type: 'success'
                            })
                            this.haveFound = true
                        } else {
                            ElMessage({
                                message: 'Looks like we couldn\'t find you. Make sure you registered first!',
                                type: 'warning'
                            })
                        }
                    }).catch(e => {
                        ElMessage.error('Something went wrong\n\n' + e)
                    })
                }
                else {
                    console.log('Form Validation Failed')
                    return false
                }
            })
        },
        onSubmit() {
            this.$refs.rsvpFormRef.validate((valid) => {
                if(valid) {
                    this.eventRsvp.eventId = this.upcomingEvents[this.eventRadioIndex].eventId
                    this.eventRsvp.eventName = this.upcomingEvents[this.eventRadioIndex].name

                    let apiUrl = process.env.VUE_APP_BASE_API_URL + '/person/add-event/' + this.person.personId

                    axios.put(apiUrl, this.eventRsvp).then((res) => {
                        ElMessage({
                            message: 'RSVP Successful',
                            type: 'success'
                        })
                        console.log(res)
                        this.$router.push('/')
                    }).catch(e => {
                        console.log(e)
                        ElMessage.error('Something went wrong')
                    })
                }
                else {
                    console.log('RSVP Validation Failed')
                    return false
                }
            })
        },
        onCancel() {
            this.$refs.formRef.resetFields()
            this.$router.push('/rsvp')
        },

        formatDate(date) {
            return moment(date).format('MM-DD-YYYY')
        }
    }
}
</script>

<style scoped>
    .person-rsvp-form-container {
        background-color: #FFFFFF;
        color: #000000;
        width: 100%;
        padding-top: 1rem;
    }
    .person-rsvp-form {
        margin: 0 auto;
        max-width: 50%;
    }
</style>