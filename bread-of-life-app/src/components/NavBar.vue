<template>
    <div class="top-nav">
        <img alt="BOL Logo" src="../assets/bol_logo.png" />
        <li class="nav-item">
            <router-link to="/about">ABOUT</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/">HOME</router-link>
        </li>
    </div>
</template>

<style scoped>
    .top-nav {
        background-color: #ffffff;
        overflow: hidden;
        min-height: 80px;
        max-height: 80px;
    }
    .nav-item {
        display: table-cell;
        float: right;
        vertical-align: middle;
    }
    .top-nav a {
        float: right;
        display: table-cell;
        color: #000000;
        text-align: center;
        vertical-align: middle;
        padding: 14px 16px;
        text-decoration: none;
        font-family: "Roboto",sans-serif;
        font-weight: 600;
        font-size: 16px;
    }
    .top-nav a:hover {
        color: #F99929
    }
    .top-nav a:focus {
        color: #23A455
    }
    img {
        float: left;
        max-width: 10%;
        max-height: 10%;
        object-fit: cover;
    }
</style>
