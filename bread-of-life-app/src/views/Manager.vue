<template>
    <EventTable/>
    <EventAddForm/>
    <ServiceTable/>
</template>

<script>
    import EventTable from "@/components/EventTable.vue"
    import EventAddForm from "@/components/EventAddForm.vue"
    import ServiceTable from "@/components/ServiceTable.vue"
    export default {
        name: "Manager",
        components: {
            EventTable,
            EventAddForm,
            ServiceTable,
        }
    }
</script>

