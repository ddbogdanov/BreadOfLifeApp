<template>
  <form @submit=AddPersonToEvent>
      <label>First Name:</label>
      <input type="text" required v-model = "persondet2.firstName">
    <label>Last Name:</label> 
      <input type="text" required v-model = "persondet2.lastName">
      <label>Event ID:</label>
      <input type="Number" required v-model = "eventdet.eventID">
         <div>
      <input type="radio" value="1" v-model="eventdet.receiveVaccine" name="receiveVaccine">
      <label>Yes</label>
      <input type="radio" value="0" v-model="eventdet.receiveVaccine" name="receiveVaccine">
      <label>No</label>
        </div>
        <div>
      <label>Vaccine Preference</label>
      <input type="String" required v-model = "eventdet.vacccinePreference">
        </div>
        <div>
      <label>Additional Support</label>
      <input type="String" required v-model = "eventdet.additionalSupport">
        </div>
        <div>
      <label>Referral</label>
      <input type="String" required v-model = "eventdet.references">
        </div>
  </form>
</template>

<script>
export default {

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