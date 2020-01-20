<template>
  <menu class="app-menu">
    <div class="app-menu-main">
        <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/my-delegations') || (this.$route.fullPath === '/validators') || (this.$route.fullPath === '/validators/') || (this.$route.fullPath === '/pending-delegations') || (this.$route.fullPath === '/staking/validators/'+$route.params.validator)}"
        to="/"
        title="My Wallet"
        @click.native="close"
      >
       <i class="material-icons">
        home
      </i>
        <span class="app-menu-title">
          My Wallet
        </span>
      </router-link>
      <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/wallet') || (this.$route.fullPath === '/send') || (this.$route.fullPath === '/sendAmount')}"
        to="/wallet"
        exact="exact"
        title="Transactions"
        @click.native="close"
      >
        <i class="material-icons">
        swap_horiz
      </i>
        <span class="app-menu-title">
          Transactions
        </span>
      </router-link>
        <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/governance/'+$route.params.proposalId)}"
        to="/governance/proposals"
        title="Proposals"
        @click.native="close"
      >
        <i class="material-icons">
        assignment
      </i>
        <span class="app-menu-title">
          Proposals
        </span>
      </router-link>
            <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/settings') || (this.$route.fullPath === '/send') || (this.$route.fullPath === '/sendAmount')}"
        to="/settings"
        exact="exact"
        title="Settings"
        @click.native="close"
      >
        <i class="material-icons">
        build
      </i>
        <span class="app-menu-title">
          Settings
        </span>
      </router-link>
            <router-link
        class="app-menu-item hide-xs"
             :class="{active: (this.$route.fullPath === '/help')}"
        to="/help"
        exact="exact"
        title="Help"
        @click.native="close"
      >
        <i class="material-icons">
        info
      </i>
        <span class="app-menu-title">
          Help
        </span>
      </router-link>
            <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/whatsnew')}"
        to="/whatsnew"
        exact="exact"
        title="What's New"
        @click.native="close"
      >
        <i class="material-icons">
        fiber_new
      </i>
        <span class="app-menu-title">
          What's New
         </span>
      </router-link>
    
     
      <!-- <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/sign')}"
        to="/sign"
        exact="exact"
        title="Sign/Verify"
        @click.native="close"
      >
        <i class="material-icons">
        exit_to_app
      </i>
        <span class="app-menu-title">
          Sign/Verify
        </span>
      </router-link> -->
      <!-- <li
        v-if="totalAtomsDisplay === 0 && session.signedIn"
        class="app-menu-item hide-xs"
        title="Get Coins"
        @click="close() & getFaucet()"
      >
        <i class="material-icons">
        exit_to_app
      </i>
        <span class="app-menu-title">
          Get Coins
        </span>
      </li>
       <router-link
        class="app-menu-item hide-xs"
        :class="{active: (this.$route.fullPath === '/blocks/'+$route.params.height)}"
        to="/"
        exact="exact"
        title="Network"
        @click.native="close"
      >
        <i class="material-icons">
        exit_to_app
      </i>
        <span class="app-menu-title">
          Network
        </span>
      </router-link> -->
        <!-- <div class="buttons">
      <TmBtn
        v-if="!session.signedIn"
          class="joinbtn"
          value="Join Wallet"
          color="primary"
          @click.native="showModal()"
        /> 
      </div> -->
          <ToolBar />
      <div class="explorer-link">
        <a href="https://www.antlia.io/" target="_blank" rel=”noopener”>Go to Explorer</a>
      </div>
      <!-- <div class="buttons">
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
      </div> -->
    </div>
    <!-- <SignModal ref="signModal" />
    <VerifyModal ref="verifyModal" /> -->
  </menu>
</template>

<script>
import noScroll from "no-scroll"
import { mapState, mapGetters } from "vuex"
import Vue from "vue";
import { atoms, viewDenom, shortDecimals } from "scripts/num.js"
import TmBtn from "common/TmBtn"
import config from '../../config';
import axios from "axios";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import SignModal from "src/ActionModal/components/SignModal"
import VerifyModal from "src/ActionModal/components/VerifyModal"
import ToolBar from "common/ToolBar"
Vue.use(VueToast);

export default {
  name: `app-menu`,
  components: {
    TmBtn,
    VerifyModal,
    SignModal,
    ToolBar,
  },
  filters: {
    atoms,
    viewDenom,
    shortDecimals
  },
  computed: {
    ...mapState([`session`]),
    ...mapGetters([`session`,`liquidAtoms`,`wallet`, `totalAtoms`, `bondDenom`]),
    totalAtomsDisplay() {
      return atoms(this.totalAtoms)
    },
  },
  mounted() {
    this.totalAtoms
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
    },
    getFaucet() {
      var address = JSON.stringify({
        address: this.wallet.address
      });
      axios
      .post(config.faucet,address)
      .then(() => {
        this.$toast.open({
          message: `Tokens Successfully Sent to ${this.wallet.address}`,
          type: 'success',
          position: 'top-right'
        })
      })
      .catch(err => {
          this.$toast.open({
          message: `Error occured while sending tokens to ${this.wallet.address}`,
          type: 'error',
          position: 'top-right'
        })
        });
    },
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
.app-menu-main{
  overflow-y: auto;
}
.app-menu .app-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1rem 1rem 2rem;
  margin: 0;
  color: #fff; 
  transition: all 0.5s ease;
}

.buttons {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 1rem auto;
}
.tm-btn{
  font-weight: 600 !important;
}
.app-menu .material-icons{
  font-size:24px;
  font-weight: 600;
  margin: 0 1rem 0 0;
  color: #fff !important;
}

.app-menu-item:hover {
  /* background: var(--hover-bg); */
  background: #2c3255;
  
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

/* .app-menu .app-menu-item--link:hover {
  color: var(--link);
} */

.app-menu .app-menu-item .router-link-active {
  background: #2c3255;
}

.active {
  background: #2c3255;
}

.app-menu .app-menu-item .router-link-active i {
  color: var(--tertiary);
}

.app-menu .app-menu-item .router-link-active span {
  /* color: var(--bright); */
  color: #fff !important;
  font-weight: 600 !important;
  font-size: 14px;
  margin-bottom: 0 !important;
}
.explorer-link{
  display: none;
}
@media screen and (max-width: 1023px) {
  .app-menu {
    height: 100vh;
  }
.explorer-link{
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
.app-menu .app-menu-item {
  padding: 1rem;
}

  /* .app-menu-title {
    font-size: x-large;
    line-height: 1.125;
    font-weight: 600;
    letter-spacing: 0.004em;
    color: var(--bright);
  } */
}

/* @media screen and (min-width: 1023px) {
  .app-menu {
    width: var(--width-side);
  }
} */
</style>