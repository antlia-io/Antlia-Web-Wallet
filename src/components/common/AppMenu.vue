<template>
  <menu class="app-menu">
    <div class="app-menu-main">
      <router-link
        class="app-menu-item hide-xs"
        to="/wallet"
        exact="exact"
        title="Wallet"
        @click.native="close"
      >
        <h2 class="app-menu-title">
          Wallet
        </h2>
      </router-link>
      <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/staking/my-delegations') || (this.$route.fullPath === '/staking/validators') || (this.$route.fullPath === '/staking/validators/'+$route.params.validator)}"
        to="/staking/validators/"
        title="Staking"
        @click.native="close"
      >
        <h2 class="app-menu-title">
          Staking
        </h2>
      </router-link>
      <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/governance/'+$route.params.proposalId)}"
        to="/governance/proposals"
        title="Governance"
        @click.native="close"
      >
        <h2 class="app-menu-title">
          Governance
        </h2>
      </router-link>
      <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/blocks/'+$route.params.height)}"
        to="/"
        exact="exact"
        title="Network"
        @click.native="close"
      >
        <h2 class="app-menu-title">
          Network
        </h2>
      </router-link>
      <div class="buttons">
      <TmBtn
          value="Sign"
          color="primary"
          @click.native="showModal()"
        />
         <TmBtn
          value="Verify"
          color="primary"
          @click.native="showVerifyModal()"
        />
      </div>
    </div>
    <SignModal ref="signModal" />
    <VerifyModal ref="verifyModal" />
  </menu>
</template>

<script>
import noScroll from "no-scroll"
import { mapState, mapGetters } from "vuex"
import { atoms, viewDenom, shortDecimals } from "scripts/num.js"
import TmBtn from "common/TmBtn"
import SignModal from "src/ActionModal/components/SignModal"
import VerifyModal from "src/ActionModal/components/VerifyModal"

export default {
  name: `app-menu`,
  components: {
    TmBtn,
    VerifyModal,
    SignModal
  },
  filters: {
    atoms,
    viewDenom,
    shortDecimals
  },
  computed: {
    ...mapState([`session`]),
    ...mapGetters([`liquidAtoms`, `totalAtoms`, `bondDenom`])
  },
  methods: {
    close() {
      this.$emit(`close`)
      noScroll.off()
    },
    showModal() {
      this.$refs.signModal.open()
    },
    showVerifyModal() {
      this.$refs.verifyModal.open()
    }
  }
}
</script>

<style scoped>
.app-menu {
  z-index: var(--z-appMenu);
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100%;
}

.app-menu .app-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  margin: 0.5rem 1rem;
  font-weight: 400;
  font-size: 14px;
  color: var(--text);
  border-radius: 0.25rem;
  transition: all 0.5s ease;
}

.buttons {
  padding: 1rem
}

.app-menu-item:hover {
  background: var(--hover-bg);
}

.session-link {
  margin: 2.5rem 1rem 1rem;
}

.user-box {
  font-size: 12px;
  margin: 1rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--bc);
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-box i {
  color: var(--dim);
  font-size: var(--m);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background: var(--bc-dim);
}

.user-box i:hover {
  background: var(--bc);
  cursor: pointer;
}

.app-menu .app-menu-item--link:hover {
  color: var(--link);
}

.app-menu .app-menu-item.router-link-active {
  background: #0a73b1;
}

.active {
  background: #0a73b1
}

.app-menu .app-menu-item.router-link-active i {
  color: var(--tertiary);
}

.app-menu .app-menu-item.router-link-active h2 {
  color: var(--bright);
  font-weight: 500;
}

@media screen and (max-width: 1023px) {
  .app-menu {
    background: #232021;
    height: 100vh;
  }

  .app-menu .app-menu-item {
    padding: 0.5rem;
  }

  .app-menu-title {
    font-size: x-large;
    line-height: 1.125;
    font-weight: inherit;
    letter-spacing: 0.004em;
    color: var(--bright);
  }
}

@media screen and (min-width: 1023px) {
  .app-menu {
    width: var(--width-side);
  }
}
</style>