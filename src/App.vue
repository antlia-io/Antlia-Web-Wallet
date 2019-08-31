<template>
  <div>
    <MaintenanceBar />
    <DisconnectedBar />
    <div id="app">
      <router-view name="session" />
      <AppHeader />
      <div id="app-content">
        <CookieBar />
        <router-view />
      </div>
      <TmNotifications :notifications="notifications" />
      <ConnectedNetwork />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppHeader from "common/AppHeader"
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
    ConnectedNetwork
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
