<template>
  <div>
  
    
    <div id="app">
       <ScanQR/>
      <router-view name="session" />
      <AppHeader />
      <div id="app-content">
          <!-- <CookieBar /> -->
          <MaintenanceBar />
    <!-- <DisconnectedBar /> -->
          <div class="ratebox-displayres">
          <TmBalance/>
          </div>
        <router-view class="main-width"/>
        <div class="ratebox-displaydesk">
          <TmBalance/>
          </div>
      </div>
   
      <MobileMenu />
      <!-- <TmNotifications :notifications="notifications" /> -->
      <!-- <ConnectedNetwork /> -->
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
import TmBalance from "common/TmBalance"
// import TmNotifications from "common/TmNotifications"
import store from "./vuex/store"
import ScanQR from "./ActionModal/components/ScanQR"


export default {
  name: `app`,
  components: {
    AppHeader,
    // TmNotifications,
    CookieBar,
    MaintenanceBar,
    DisconnectedBar,
    ConnectedNetwork,
    MobileMenu,
    TmBalance
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
@import "./styles/niceCountryInput.css";
/* @import "./scripts/niceCountryInput.js"; */
</style>
