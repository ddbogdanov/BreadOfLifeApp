<template>
    <EventTable/>
    <ServiceTable/>
    <AttendeesTable/>
</template>

<script>
    import EventTable from "@/components/EventTable.vue"
    import ServiceTable from "@/components/ServiceTable.vue"
    import AttendeesTable from "@/components/AttendeesTable.vue";

    export default {
        name: "Manager",
        components: {
            EventTable,
            ServiceTable,
            AttendeesTable,
        }
    }
</script>

