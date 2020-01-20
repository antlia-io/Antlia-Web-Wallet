<template>
  <menu>
    <router-link
      :class="{active: (this.$route.fullPath === '/validators/') || (this.$route.fullPath === '/validators') || (this.$route.fullPath === '/send') || (this.$route.fullPath === '/sendAmount')}"
      to="/"
      exact="exact"
      title="My Wallet"
    >
      <i class="material-icons">home</i>
      <h2 class="app-menu-title">
        My Wallet
      </h2>
    </router-link>
    <router-link
      :class="{active: (this.$route.fullPath === '/staking/my-delegations') || (this.$route.fullPath === '/staking/pending-delegations') || (this.$route.fullPath === '/staking/validators/') || (this.$route.fullPath === '/staking/validators') || (this.$route.fullPath === '/staking/validators/'+$route.params.validator)}"
      to="/staking/my-delegations" 
      title="Transactions"
    >
      <i class="material-icons">
        swap_horiz
      </i>
      <h2 class="app-menu-title">
        Transactions
      </h2>
    </router-link>
    <router-link
      :class="{active: (this.$route.fullPath === '/governance/proposals') || (this.$route.fullPath === '/governance/'+$route.params.proposalId)}"
      to="/governance/proposals" 
      title="Proposals"
    >
       <i class="material-icons">
        assignment
      </i>
      <h2 class="app-menu-title">
        Proposals
      </h2>
    </router-link>
    <router-link

      to="/settings"
      exact="exact"
      title="Settings"
    >
       <i class="material-icons">
        build
      </i>
      <h2 class="app-menu-title">
        Settings
      </h2>
    </router-link>
     <!-- v-if="totalAtomsDisplay === 0 && session.signedIn"
      @click.native="getFaucet" -->
    <router-link
     
      title="Help"
      to="/help"
    >
       <i class="material-icons">
        info
      </i>
      <h2 class="app-menu-title">
        Help
      </h2>
    </router-link>
     <!-- :class="{active: (this.$route.fullPath === '/') || (this.$route.fullPath === '/blocks/'+$route.params.height)}" -->
    <router-link
     
      to="/whatsnew"
      exact="exact"
      title=" What's New"
    >
     <i class="material-icons">
        fiber_new
      </i>
      <h2 class="app-menu-title">
        What's New
      </h2>
    </router-link>
  </menu>
</template>

<script>
import { mapGetters } from "vuex"
import Vue from "vue";
import num from "scripts/num"
import config from '../../config';
import axios from "axios";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
Vue.use(VueToast);

export default {
  name: `mobile-menu`,
  data: function() {
        return {
            active: this.$route.fullPath,
            num
        }
    },
  computed: {
    ...mapGetters([`session`,`totalAtoms`,`wallet`]),
    totalAtomsDisplay() {
      return this.num.atoms(this.totalAtoms)
    },
  },
  mounted() {
    this.totalAtoms
  },
  methods: {
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
  },
}
</script>

<style scoped>
menu {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  z-index: calc(var(--z-appHeader) - 2);
  background: #1c2340;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}

menu a {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.4rem;
  width: 25%;
  color: white !important
}

menu a i {
  font-size: 18px;
}

.active {
  background: #2c3255;
  color: white !important
}

.mobile-menu-item.router-link-active {
  color: var(--tertiary);
}

menu a:not(.router-link-active) {
  color: var(--bright) !important;
}

menu a h2 {
  padding-top: 2px;
  font-size: 8px;
  font-weight: 500;
}

i.material-icons {
    margin: 0
}

@media screen and (min-width: 668px) {
  menu {
    display: none;
  }
}
@media screen and (max-width: 414px) {
 menu a h2{
    display: none;
  }
}
</style>