<template>
    <EventTable/>
    <ServiceTable/>
</template>

<script>
    import EventTable from "@/components/EventTable.vue"
    import ServiceTable from "@/components/ServiceTable.vue"
    export default {
        name: "Manager",
        components: {
            EventTable,
            ServiceTable,
        }
    }
</script>

