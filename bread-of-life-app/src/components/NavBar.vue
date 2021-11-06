<template>
    <nav class="top-nav">
        <div>
            <a href="./">
                <img class="logo" alt="BOL Logo" src="../assets/bol_logo.png" />
            </a>
        </div>
        <ul class="nav-list">
            <li class="nav-item">
                <router-link to="/">HOME</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/manager">MANAGERS</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/rsvp">RSVP</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/about">ABOUT</router-link>
            </li>
        </ul>
    </nav>
    <router-view/>
</template>

<style scoped>
    .top-nav {
        background-color: #ffffff;
        color: #000000;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 1.3rem;

        font-family: "Roboto",sans-serif;
        font-weight: 600;
        font-size: 1rem;
    }

    .logo {
        height: 70px;
    }
    .nav-list {
        list-style-type: none;
        margin-left:auto;
    }
    .nav-list .nav-item {
        display: inline-block;
        padding: .5rem 1rem;
    }

    .top-nav a {
        color: #000000;
        text-decoration: none;
    }
    .top-nav a:hover {
        color: #F99929
    }
    .top-nav a.router-link-active {
        color: #23A455
    }
</style>
