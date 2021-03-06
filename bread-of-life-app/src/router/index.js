import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AttendanceChart from "../components/charts/AttendanceChart";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/rsvp",
        name: "Rsvp",
        component: () => import("../views/Rsvp.vue"),
    },
    {
        path: "/rsvp/add-person",
        name: "PersonAddForm",
        component: () => import("../components/forms/PersonAddForm.vue")
    },
    {
        path: "/rsvp/person-rsvp",
        name: "PersonRsvpForm",
        component: () => import("../components/forms/PersonRsvpForm.vue")
    },
    {
        path: "/manager",
        name: "Manager",
        component: () => import("../views/Manager.vue")
    },
    {
        path: "/manager/edit-event/:id",
        name: "EventEditForm",
        component: () => import('../components/forms/EventEditForm.vue')
    },
    {
        path: "/manager/add-event",
        name: "EventAddForm",
        component: () => import('../components/forms/EventAddForm.vue')
    },
    {
        path: "/manager/event/attendees",
        name: "EventAttendeesTable",
        component: () => import('../components/tables/EventAttendeesTable.vue')
    },
    {
        path: "/manager/edit-service/:id",
        name: "ServiceEditForm",
        component: () => import('../components/forms/ServiceEditForm.vue')
    },
    {
        path: "/manager/add-service",
        name: "ServiceAddForm",
        component: () => import('../components/forms/ServiceAddForm.vue')
    },
    {
        path: "/manager/event/chart/:id/:eventName",
        name: "AttendanceChart",
        // component: () => import('../components/AttendanceChart.vue')
        component: AttendanceChart
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;