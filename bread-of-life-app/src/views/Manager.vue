<template>
    <EventTable/>
    <EventAddForm/>
</template>

<script>
    import EventTable from "@/components/EventTable.vue";
    import EventAddForm from "@/components/EventAddForm.vue"
    export default {
        name: "Manager",
        components: {
            EventTable,
            EventAddForm,
        }
    }
</script>

