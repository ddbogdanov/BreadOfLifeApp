<template>
    <EventTable/>
    <ServiceTable/>
    <AttendeesTable/>
</template>

<script>
    import EventTable from "@/components/tables/EventTable.vue"
    import ServiceTable from "@/components/tables/ServiceTable.vue"
    import AttendeesTable from "@/components/tables/AttendeesTable.vue";

    export default {
        name: "Manager",
        components: {
            EventTable,
            ServiceTable,
            AttendeesTable,
        }
    }
</script>

