<template>
  <form>
    <label>First Name:</label>
      <input type="text" required v-model = "persondet.firstName">
    <label>Last Name:</label> 
      <input type="text" required v-model = "persondet.lastName">
    <label>Phone Number:</label>
      <input type="Number" pattern="^\d{3}-\d{3}-\d{4}$" v-model = "persondet.phoneNumber" placeholder="XXX-XXX-XXXX" aria-describedby="phoneHelpBlock" required>
      <small id="phoneHelpBlock" class="form-text text-muted">
                            10 digit phone number should be entered with dashes
                    </small>
                    <br>
    <label>Zip Code:</label>
    <input type="Number" required v-model = "persondet.zipCode">
    <label>Received Vaccine?</label>
    <div>
      <input type="radio" v-bind:value="true" v-model="persondet.receivedVaccine" name="receivedVaccine">
      <label>Yes</label>
      <input type="radio" v-bind:value="false" v-model="persondet.receivedVaccine" name="receivedVaccine">
      <label>No</label>
    </div>
    <div>
    <label>num of Children?</label>
    <input type="Number" required v-model = "persondet.numChildren">
    </div>
    <label>Elderly?</label>
    <div>
      <input type="radio" v-bind:value="true" v-model="persondet.elderly" name="elderly">
      <label>Yes</label>
      <input type="radio" v-bind:value="false" v-model="persondet.elderly" name="elderly">
      <label>No</label>
    </div>
    <label>Veteran?</label>
   <div>
      <input type="radio" v-bind:value="true" v-model="persondet.veteran" name="veteran">
      <label>Yes</label>
      <input type="radio" v-bind:value="false" v-model="persondet.veteran" name="veteran">
      <label>No</label>
    </div>
    <div>
    <label>Ethnicity</label>
    <select v-model="persondet.ethnicity">
      <option value=Asian>Asian</option>
      <option value=African>African American</option>
      <option value=White>White</option>
      <option value=Hispanic>Hispanic</option>
      <option value=Islander>Pacific Islander</option>
    </select>
    </div>
    <div>
      <button @click="signmeUp">Post</button>
      </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
          persondet:{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            zipCode: '',
            receivedVaccine: '',
            numChildren: '',
            elderly: '',
            veteran: '',
            ethnicity: ''
          }
        }
    },
    methods: {
      signmeUp(){
        let apiURL='http://localhost:3000/person'

          alert(JSON.stringify(this.persondet))
        axios.post(apiURL, this.persondet).then((res) => {
            alert("posted")
            console.log(res.data)
            this.$router.push('/rsvp')
          //   this.persondet={
          //       firstName:'',
          //       lastName:'',
          //       phoneNumber:'',
          //       zipCode:'',
          //       receiveVaccine: null,
          //       numChildren:'',
          //       elderly: null,
          //       veteran: null,
          //       ethnicity:''
          // }
        }).catch(error => {
            alert(error);
        });
        }
      }
 }

</script>

<style>
form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color: #aaa;
    display:inline-block;
    margin:25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input, select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
</style>