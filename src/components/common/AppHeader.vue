<template>
  <nav class="app-header" :class="{ mobile: !desktop }">
    <div class="container-fluid">
      <div class="header-item">
        <router-link to="/">
          <img class="header-item-logo" src="~assets/images/antlia.svg" />
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
     <div class="explorer-link">
        <a href="https://www.antlia.io/" target="_blank" rel=”noopener”>Go to Explorer</a>
      </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex"
import noScroll from "no-scroll"
import AppMenu from "common/AppMenu"
export default {
  name: `app-header`,
  components: { AppMenu },
  data: () => ({
    open: false,
    desktop: false
  }),
  computed: {
    ...mapGetters([`session`])
  },
  mounted() {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  },
  updated() {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  },
  methods: {
    close() {
      this.open = false
      noScroll.off()
    },
    show() {
      this.open = true
      noScroll.on()
    },
    watchWindowSize() {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )

      if (w >= 1024) {
        this.close()
        this.desktop = true
        return
      } else {
        this.desktop = false
      }
    }
  }
}
</script>

<style scoped>
.app-header {
  z-index: var(--z-appHeader);
  position: relative;
  /* background: var(--app-nav); */
  background: #1c2340;
  /* min-height: 100vh; */
  /* width: var(--width-side); */
  width: 15rem;
  height: 100%;
  position: fixed;
  top: 0;
}
.explorer-link{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3255;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
}
.explorer-link a{
 font-size: 16px;
 color: #fff;
 font-weight: 600; 
 text-align: center;
 text-transform: uppercase;
}
.mobile-menu-action {
  font-size: 2.5rem !important;
  color: white;
}

.app-header > .container-fluid {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
}

.app-header .header-item {
  padding: 2rem 1.25rem;
  display: flex;
  justify-content: center;
}

.app-header .header-item a {
  display: inline-block;
}

.header-item-logo {
  height: 3rem;
}

@media screen and (max-width: 1023px) {
  .explorer-link{
    display: none !important;
  }
  .app-header {
    width: 100%;
    height: auto;
    box-shadow: 0 1px 10px #000;
  }

  .container {
    background: var(--app-nav);
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
