<template>
  <div>
    <MaintenanceBar />
    <DisconnectedBar />
    <div id="app">
      <router-view name="session" />
      <div id="app-content">
        <CookieBar />
        <AppHeader />
        <router-view />
      </div>
      <MobileMenu />
      <!-- <TmNotifications :notifications="notifications" /> -->
      <ConnectedNetwork />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppHeader from "common/AppHeader"
import MobileMenu from "common/MobileMenu"
import CookieBar from "common/CookieBar"
import ConnectedNetwork from "common/TmConnectedNetwork"
import MaintenanceBar from "common/MaintenanceBar"
import DisconnectedBar from "common/DisconnectedBar"
// import TmNotifications from "common/TmNotifications"
import store from "./vuex/store"

export default {
  name: `app`,
  components: {
    AppHeader,
    // TmNotifications,
    CookieBar,
    MaintenanceBar,
    DisconnectedBar,
    ConnectedNetwork,
    MobileMenu
  },
  computed: {
    ...mapGetters([`notifications`, `session`])
  },
  mounted(){
    if (this.$route.fullPath === '/send/colors1l37vu6ds87rx2gs5yxjx70v7uy5yewpwuyxsud')
      this.$router.push('/send') 
    if (this.$route.fullPath === '/send/colors1l37vu6ds87rx2gs5yxjx70v7uy5yewpwuyxsud/1')
      this.$router.push('/sendAmount') 
  },
  store
}
</script>

<style>
@import "./styles/app.css";
</style>
