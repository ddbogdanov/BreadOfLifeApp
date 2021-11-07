<template>
  <form>
    <label>First Name:</label>
      <input type="String" required v-model = "firstName">
    <label>Last Name:</label> 
      <input type="String" required v-model = "lastName">
    <label>Phone Number:</label>
      <input type="Number" required v-model = "phoneNumber">
    <label>Zip Code:</label>
    <input type="Number" required v-model = "zipCode">
    <label>Received Vaccine?</label>
    <div>
      <input type="radio" value=True v-model="receiveVaccine" name="receiveVax">
      <label>Yes</label>
      <input type="radio" value=False v-model="receiveVaccine" name="receiveVax">
      <label>No</label>
    </div>
    <label>num of Children?</label>
    <input type="Number" required v-model = "numChildren" >
    <label>Elderly?</label>
    <div >
      <input type="radio" value=True v-model="elderly" name="elderly" >
      <label>Yes</label>
      <input type="radio" value=False v-model="elderly" name="elderly" >
      <label>No</label>
    </div>
    <label>Veteran?</label>
   <div>
      <input type="radio" value=True v-model="veteran" name="veteran">
      <label>Yes</label>
      <input type="radio" value=False v-model="veteran" name="veteran">
      <label>No</label>
    </div>
    <label>Ethnicity</label>
    <select v-model=ethnicity>
      <option value=Asian>Asian</option>
      <option value=African>African American</option>
      <option value=White>White</option>
      <option value=Hispanic>Hispanic</option>
      <option value=Islander>Pacific Islander</option>
    </select>
    
  </form>
</template>

<script>
export default {
    data(){
        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            zipCode: '',
            receiveVaccine: '',
            numChildren: '',
            elderly: '',
            veteran: '',
            ethnicity: ''
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