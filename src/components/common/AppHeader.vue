<template>
  <nav :class="{ mobile: !desktop }">
      <div>
        <div class="header-item" :class="{ open: open }">
          <template v-if="!desktop">
            <a href="https://wallet.testnet.color-platform.rnssol.com">
            <img
              class="header-item-logo"
              src="~assets/images/ColorWhiteplatform1.png"
            /></a>
            <div v-if="open" class="close-menu" @click="close()">
              <i class="material-icons mobile-menu-action">close</i>
            </div>
            <div v-if="!open" class="open-menu" @click="show()">
              <i class="material-icons mobile-menu-action">menu</i>
            </div>
            <AppMenu v-if="open || desktop" @close="close" />
          </template>
        </div>
        <FixedSideBar v-if="open || desktop" @close="close" />
      </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex"
import noScroll from "no-scroll"
import AppMenu from "common/AppMenu"
import FixedSideBar from "common/FixedSideBar"

export default {
  name: `app-header`,
  components: { AppMenu , FixedSideBar},
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
  background: var(--app-nav);
  min-height: 100vh;
  width: var(--width-side);
}

.header-item.open {
  background: #232021;
}

.mobile-menu-action {
  font-size: 1.5rem !important;
}

.app-header > .container {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
}

/* .header-item {
  padding: 1.25rem;
  font-size: 0;
} */

.header-item a {
  display: inline-block;
}

.close-menu, .open-menu {
  float: right
}

/* .header-item-logo {
  height: 2rem;
  margin: 0.5rem;
  vertical-align: middle;
} */

@media screen and (max-width: 1023px) {
  .app-header {
    width: 100%;
    min-height: 0;
  }
  .container {
    background: var(--app-fg-dark);
    position: fixed;
    width: 100%;
  }
  .header-item {
    /* display: flex;
    align-items: center; */
    justify-content: space-between;
    padding: 1rem;
    background: #232021;
    color: var(--link);
    cursor: pointer;
  }
  .header-item-logo {
    height: 1.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .app-header > .container {
    position: fixed;
  }
}
</style>
