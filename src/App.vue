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
      <TmNotifications :notifications="notifications" />
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
import TmNotifications from "common/TmNotifications"
import store from "./vuex/store"

export default {
  name: `app`,
  components: {
    AppHeader,
    TmNotifications,
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
    var fullpath = this.$route.fullPath
    var fullPatharray = this.$route.fullPath.split('/')
    var address = fullPatharray[2];
    var amount = fullPatharray[3];
    if (this.$route.fullPath.includes('send/colors') && amount === undefined)
      {
        this.$router.push('/send') 
      }
    else if (this.$route.fullPath.includes('send/colors') && amount !== undefined)
      this.$router.push('/sendAmount') 
    
    localStorage.setItem('qraddress',address),
    localStorage.setItem('qramount',amount)
  },
  store
}
</script>

<style>
@import "./styles/app.css";
</style>
