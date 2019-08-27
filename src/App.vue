<template>
  <div>
    <!-- <MaintenanceBar /> -->
    <lazy-component />
    <!-- <DisconnectedBar /> -->
    <lazy-component2 />
    <div id="app">
      <router-view name="session" />
      <AppHeader />
      <div id="app-content">
        <!-- <CookieBar /> -->
        <lazy-component1 />
        <router-view />
      </div>
      <TmNotifications :notifications="notifications" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppHeader from "common/AppHeader"
// import CookieBar from "common/CookieBar"
// import MaintenanceBar from "common/MaintenanceBar"
// import DisconnectedBar from "common/DisconnectedBar"
import TmNotifications from "common/TmNotifications"
import store from "./vuex/store"
const lazyComponent = () => import('common/MaintenanceBar.vue')
const lazyComponent1 = () => import('common/CookieBar.vue')
const lazyComponent2 = () => import('common/DisconnectedBar.vue')

export default {
  name: `app`,
  components: {
    AppHeader,
    lazyComponent,
    lazyComponent1,
    lazyComponent2,
    TmNotifications,
    // CookieBar,
    // MaintenanceBar,
    // DisconnectedBar
  },
  computed: {
    ...mapGetters([`notifications`, `session`])
  },
  store
}
</script>

<style>
@import "./styles/app.css";
</style>
