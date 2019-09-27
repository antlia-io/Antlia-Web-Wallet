<template>
    <ejs-sidebar id="dockSidebar" class="hidesidebar" :enableDock='enableDock' :width='width' :dockSize='dockSize' ref="dockSidebar" :position = "position">
    <div class="header-item">
      <router-link :class="buttonState" @click="toggleClick" to="/wallet">
        <img v-if="!buttonActive" rel=preload class="header-item-logo" src="~assets/images/color-logo.png" />
        <img v-else rel=preload class="header-item-logo2" src="~assets/images/ColorWhiteplatform1.png" />
      </router-link>
    </div>
    <div class="dock">
      <ul>
        <li :class="buttonState" class="sidebar-item" id="toggle" @click="toggleClick">
          <i v-if="!buttonActive" class="material-icons">menu</i>
          <i v-else class="material-icons">close</i>
        </li>
        <li class="sidebar-item hover" @click="home()" v-on:click="active = 'home'" :class="{active:this.$route.fullPath === '/wallet'}" title="Wallet">
          <i class="material-icons">home</i>
          <span class="e-text">Wallet</span>
        </li>
        <li class="sidebar-item hover" @click="staking()" v-on:click="active = 'staking'" :class="{active:(this.$route.fullPath === '/staking/my-delegations') || (this.$route.fullPath === '/staking/validators/') || (this.$route.fullPath === '/staking/validators') || (this.$route.fullPath === '/staking/validators/'+$route.params.validator)}" title="Staking">
          <i class="material-icons">swap_horiz</i>
          <span class="e-text">Staking</span>
        </li>
        <li class="sidebar-item hover" @click="governance()" v-on:click="active = 'governance'" :class="{active:(this.$route.fullPath === '/governance/proposals') || (this.$route.fullPath === '/governance/'+$route.params.proposalId)}" title="Governance">
          <i class="material-icons">transfer_within_a_station</i>
          <span class="e-text">Governance</span>
        </li>
        <li class="sidebar-item hover" @click="network()" v-on:click="active = 'network'" :class="{active:(this.$route.fullPath === '/') || (this.$route.fullPath === '/blocks/'+$route.params.height)}" title="Network">
          <i class="material-icons">my_location</i>
          <span class="e-text">Network</span>
        </li>
      </ul>
    </div>
  </ejs-sidebar>
</template>

<script>
import { mapGetters } from "vuex"
import noScroll from "no-scroll"
import Vue from "vue";
import { SidebarPlugin } from '@syncfusion/ej2-vue-navigations';
import { ButtonPlugin,RadioButtonPlugin} from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
Vue.use(SidebarPlugin, ButtonPlugin, RadioButtonPlugin);

export default {
  name: `app-menu`,
  data: function() {
        return {
            enableDock : true,
            dockSize : '72px',
            width : '220px',
            position :'Left',
            buttonActive: false,
            active: this.$route.fullPath
        }
    },
    computed: {
    ...mapGetters([`session`]),
    buttonState() {
      return this.buttonActive ? 'button--active' : 'button--inactive';
    },
  },
  mounted() {
    this.$refs.dockSidebar.hide();
    this.$refs.dockSidebar.classList.remove('e-active');
  },
  methods: {
      toggleClick: function() {
      this.$refs.dockSidebar.toggle();
      this.buttonActive = !this.buttonActive;
    },
    home() {
      this.$router.push(`/wallet`)
    },
    staking() {
      this.$router.push(`/staking`)
    },
    governance() {
      this.$router.push(`/governance`)
    },
    network() {
      this.$router.push(`/`)
    }
  }
}
</script>

<style scoped>
 /* Content area styles */
 .title {
    text-align: center;
    font-size: 20px;
    padding: 15px;
}

.sub-title {
    text-align: center;
    font-size: 16px;
    padding: 10px;
}

.dock {
  margin-top: 2rem
}

div#dockSidebar:focus {
  outline: none
}

#wrapper .column {
    display: inline-block;
    padding: 10px;
}

.active {
  background: #0a73b1
}

#dockSidebar.e-sidebar.e-right.e-close {
    visibility: visible;
    transform: translateX(0%);
}

#dockSidebar .e-icons::before {
    font-size: 25px;
}
/* dockbar icon Style */
#dockSidebar .home::before {
    content: '\e102';
}

#dockSidebar .profile::before {
    content: '\e10c';
}

#dockSidebar .info::before {
    content: '\e11b';
}

#dockSidebar .settings::before {
    content: '\e10b';
}

.e-sidebar .expand::before,
.e-sidebar.e-right.e-open .expand::before {
    content: '\e10f';
}

.e-sidebar.e-open .expand::before,
.e-sidebar.e-right .expand::before {
    content: '\e10e';
}
/* end of dockbar icon Style */

#dockSidebar.e-close .sidebar-item {
    padding: 15px 20px 15px 20px
}

#dockSidebar.e-open .sidebar-item {
    padding: 10px 0px 10px 0;
}

#dockSidebar.e-dock.e-close span.e-text {
    display: none;
}

#dockSidebar.e-dock.e-open span.e-text {
    display: inline-block;
}

#dockSidebar li {
    list-style-type: none;
    cursor: pointer;
}

#dockSidebar ul {
    padding: 0px;
}

#dockSidebar.e-sidebar ul li.hover:hover {
    background: #0a73b1
}

#dockSidebar.e-sidebar.e-open .e-text {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 23px;
    font-size: 15px;
    color: white
}

#dockSidebar.e-sidebar.e-open .e-icons {
    margin-right: 16px;
}

#dockSidebar.e-sidebar span.e-icons {
    color: #c0c2c5;
    line-height: 2
}

#dockSidebar.e-sidebar .e-open .e-icons {
    margin-right: 16px;
}

.sidebar-item {
    text-align: center;
}

#dockSidebar.e-sidebar.e-open .sidebar-item {
    text-align: left;
    padding-left: 15px;
    color: #c0c2c5;
}

#dockSidebar.e-sidebar {
    background: #232021;
    min-height: 100vh;
    position: fixed
}
/* end of sidebar styles */

.app-header .header-item {
  padding: 1.25rem;
  font-size: 0;
}

.app-header .header-item a {
  display: inline-block;
}

i.material-icons {
  font-size: 25px;
  color: white
}

.header-item-logo {
  height: 3rem;
  margin: 0.5rem;
  vertical-align: middle;
}

.header-item-logo2 {
  height: 1.5rem;
  margin: 1rem;
}

@media screen and (max-width: 1023px) {
  .app-header .header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    color: var(--link);
    cursor: pointer;
  }
  .hidesidebar {
    display: none
  }
}
</style>