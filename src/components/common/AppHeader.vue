<template>
  <ejs-sidebar id="dockSidebar" :enableDock='enableDock' :width='width' :dockSize='dockSize' ref="dockSidebar" :position = "position">
    <div class="header-item">
      <router-link to="/">
        <img class="header-item-logo" src="~assets/images/logo.png" />
      </router-link>
    </div>
    <div class="dock">
      <ul>
        <li class="sidebar-item" id="toggle" @click="toggleClick">
          <i class="material-icons">menu</i>
          <!-- <i v-else class="material-icons">close</i> -->
        </li>
        <li class="sidebar-item hover" @click="home()" title="Wallet">
          <i class="material-icons">home</i>
          <span class="e-text">Wallet</span>
        </li>
        <li class="sidebar-item hover" @click="staking()" title="Staking">
          <i class="material-icons">search</i>
          <span class="e-text">Staking</span>
        </li>
        <li class="sidebar-item hover" @click="governance()" title="Governance">
          <i class="material-icons">transfer_within_a_station</i>
          <span class="e-text">Governance</span>
        </li>
        <li class="sidebar-item hover" @click="network()" title="Network">
          <i class="material-icons">my_location</i>
          <span class="e-text">Network</span>
        </li>
      </ul>
    </div>
  </ejs-sidebar>
  <!-- <nav class="app-header" :class="{ mobile: !desktop }">
    <div class="container">
      <div class="header-item">
        <router-link to="/">
          <img class="header-item-logo" src="~assets/images/logo.png" />
        </router-link>
        <template v-if="!desktop">
          <div v-if="open" class="close-menu" @click="close()">
            <i class="material-icons mobile-menu-action">close</i>
          </div>
          <div v-if="!open" class="open-menu" @click="show()">
            <i class="material-icons mobile-menu-action">menu</i>
          </div>
        </template>
      </div>
      <AppMenu v-if="open || desktop" @close="close" />
    </div>
  </nav> -->
</template>

<script>
import { mapGetters } from "vuex"
import noScroll from "no-scroll"
// import AppMenu from "common/AppMenu"
import Vue from "vue";
import { SidebarPlugin } from '@syncfusion/ej2-vue-navigations';
import { ButtonPlugin,RadioButtonPlugin} from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
Vue.use(SidebarPlugin, ButtonPlugin, RadioButtonPlugin);

export default {
  name: `app-header`,
  // components: { AppMenu },
  data: function() {
        return {
            enableDock : true,
            dockSize : '72px',
            width : '220px',
            position :'Left'
        }
    },
  // data: () => ({
  //   open: false,
  //   desktop: false
  // }),
  computed: {
    ...mapGetters([`session`])
  },
  mounted() {
    // this.watchWindowSize()
    // window.onresize = this.watchWindowSize
    this.$refs.dockSidebar.hide();
    this.$refs.dockSidebar.classList.remove('e-active');
  },
  // updated() {
  //   this.watchWindowSize()
  //   window.onresize = this.watchWindowSize
  // },
  methods: {
    // close() {
    //   this.open = false
    //   noScroll.off()
    // },
    toggleClick: function() {
      this.$refs.dockSidebar.toggle();
    },
    home() {
      this.$router.push(`/`)
    },
    staking() {
      this.$router.push(`/staking`)
    },
    governance() {
      this.$router.push(`/governance`)
    },
    network() {
      this.$router.push(`/network`)
    },
    // show() {
    //   this.open = true
    //   noScroll.on()
    // },
    // watchWindowSize() {
    //   const w = Math.max(
    //     document.documentElement.clientWidth,
    //     window.innerWidth || 0
    //   )

    //   if (w >= 1024) {
    //     this.close()
    //     this.desktop = true
    //     return
    //   } else {
    //     this.desktop = false
    //   }
    // }
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

#wrapper .column {
    display: inline-block;
    padding: 10px;
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
    padding: 5px 20px 15px 20px
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
    /* border-bottom: 1px #e5e5e58a solid; */
}

#dockSidebar.e-sidebar.e-open .sidebar-item {
    text-align: left;
    padding-left: 15px;
    color: #c0c2c5;
}

#dockSidebar.e-sidebar {
    /* z-index: var(--z-appHeader); */
    background: #232021;
    /* overflow: hidden; */
    min-height: 100vh;
    position: relative
}
/* end of sidebar styles */

.app-header {
  z-index: var(--z-appHeader);
  position: relative;
  background: #232021;
  min-height: 100vh;
  width: 7.5%;
}

.mobile-menu-action {
  font-size: 1.5rem !important;
}

.app-header > .container {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 !important;
}

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

/* i.material-icons:hover {
  color: #0a73b1
} */

.header-item-logo {
  height: 3rem;
  margin: 0.5rem;
}

@media screen and (max-width: 1023px) {
  .app-header {
    width: 100%;
    min-height: 0;
  }

  .container {
    background: #232021;
  }

  .app-header .header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    color: var(--link);
    cursor: pointer;
  }

  .header-item-logo {
    height: 2.5rem;
  }
}
</style>
