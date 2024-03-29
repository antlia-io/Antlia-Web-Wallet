<template>
<div>
  <!-- <FixedSideBar /> -->
  <div class="tm-page">
    <TmPageHeader v-if="!hideHeader" :tabs="tabs">
      <h2 v-if="title" slot="title">
        {{ title }}
      </h2>
      <h3 v-if="subtitle" slot="subtitle">
        {{ subtitle }}
      </h3>
      <slot slot="menu-body" name="menu-body">
   
        <!-- <TmBalance v-if="session.signedIn" /> -->
        <!-- <div v-if="session.signedIn" class="card">
          <h3>Your Public Color Address</h3>
          <Bech32 :address="session.address || ''" long-form />
        </div> -->
        <div v-if="sendReceive">
          <LiCoin
            v-for="coin in filteredBalances"
            :key="coin.denom"
            :coin="coin"
            class="tm-li-balance"
            @show-modal="showModal"
          />
        </div>
        <SendModal ref="sendModal" />
      </slot>
      <slot slot="header-buttons" name="header-buttons" />
    </TmPageHeader>
    <main class="tm-page-main padding0">
      <CardSignInRequired v-if="signInRequired && !session.signedIn" />
      <template v-else-if="managed">
        <TmDataConnecting v-if="!loaded && !connected" />
        <TmDataLoading v-else-if="!loaded && loading" />
        <!-- <TmDataError v-else-if="error" /> -->
        <slot v-else-if="dataEmpty" name="no-data">
          <TmDataEmpty>
            <template slot="title">
              <slot name="title" />
            </template>
            <template slot="subtitle">
              <slot name="subtitle" />
            </template>
          </TmDataEmpty>
        </slot>
        <slot v-else name="managed-body" />
      </template>
      <slot />
    </main>
  </div>
</div>
</template>

<script>
import num from "scripts/num"
import TmPageHeader from "./TmPageHeader.vue"
import TmDataLoading from "common/TmDataLoading"
import TmDataEmpty from "common/TmDataEmpty"
import LiCoin from "../wallet/LiCoin"
import CardSignInRequired from "common/CardSignInRequired"
import { mapGetters,mapActions } from "vuex"
import orderBy from "lodash.orderby"
import TmDataError from "common/TmDataError"
import SendModal from "src/ActionModal/components/SendModal"
import TmDataConnecting from "common/TmDataConnecting"
import TmBalance from "common/TmBalance"
import FixedSideBar from "common/FixedSideBar"

import Bech32 from "common/Bech32"

export default {
  name: `tm-page`,
  components: {
    TmBalance,

    LiCoin,
    SendModal,
    TmPageHeader,
    TmDataEmpty,
    TmDataLoading,
    TmDataError,
    TmDataConnecting,
    CardSignInRequired,
    Bech32,
    FixedSideBar
  },
  data: () => ({ num, showSendModal: false }),
  props: {
    hideHeader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ``
    },
    subtitle: {
      type: String,
      default: ``
    },
    managed: {
      type: Boolean,
      default: false
    },
    error: {
      type: Error,
      default: undefined
    },
    tabs: {
      type: Array,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    loaded: {
      type: Boolean,
      default: undefined
    },
    dataEmpty: {
      type: Boolean,
      default: undefined
    },
    sendReceive: {
      type: Boolean,
      default: false
    },
    signInRequired: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([`session`, `connected`,`wallet`]),
    filteredBalances() {
      var obj = [{
        amount: '0',
        denom: 'uclr'
      }]
      if(this.wallet.balances){
        return obj
      }
      else {
      return orderBy(
        this.wallet.balances,
        [`amount`, balance => num.viewDenom(balance.denom).toLowerCase()],
        [`desc`, `asc`]
      )
      }
    }
  },
  watch: {
    $route() {
      this.scrollContainer.scrollTop = 0
    }
  },
  methods: {
    ...mapActions([`updateDelegates`, `queryWalletBalances`]),
    showModal(denomination) {
      this.$refs.sendModal.open(denomination)
    }
  },
  async mounted() {
    this.updateDelegates()
    await this.queryWalletBalances()
    this.scrollContainer = this.$el.querySelector(`.tm-page-main`)
  }
}
</script>

<style>
.tm-page {
  flex: 1;
  display: flex;
  /* margin-left: 72px; */
  flex-flow: column nowrap;
  position: relative;
}

.tm-page-main {
  flex: 1;
  /* position: relative; */
  padding: 0 1rem 1rem;
}

.tm-page-title {
  color: var(--bright);
  font-size: var(--h2);
  padding: 0.5rem 1rem 1rem;
}

.tm-page-subtitle > div {
  color: var(--dim);
  font-size: var(--sm);
}

.card {
  background: white;
  border-radius: 2px;
  padding: 1rem;
  font-size: var(--m);
  margin-bottom: 1rem !important;
  /* border: 1px solid var(--bc-dim); */
}

.card h3 {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: .5rem;
  color: white !important;
}

.column {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 !important;
}

.row-unjustified {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.page-profile__section {
  margin-bottom: 3rem;
}

.page-profile__section-title {
  color: black;
  font-size: 1.75rem;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
}

.page-profile__section--between > .row {
  justify-content: space-between;
}

.page-profile__header {
  background-color: white;
}

.page-profile__header .row:first-child {
  border: 1px solid var(--bc-dim);
}

.page-profile__header .avatar {
  background: var(--app-nav);
  height: 8rem;
  width: 8rem;
  margin: 1rem;
  padding: 1rem;
}

.page-profile__header__info {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.page-profile__status-and-title {
  display: flex;
  align-items: center;
}

.page-profile__status {
  border-radius: 50%;
  display: inline-block;
  height: 0.5rem;
  width: 0.5rem;
}

.page-profile__title {
  color: black;
  display: inline-block;
  font-size: var(--h1);
  font-weight: 400;
  padding: 0 0.5rem;
  margin-bottom: .5rem;
  line-height: 1.2;
}

.page-profile__header__actions {
  display: grid;
  flex-direction: column;
}

.page-profile__header__actions button {
  margin-bottom: 0.5rem;
}

.page-profile__header__actions button:last-child {
  margin-bottom: 0;
}

.page-profile__status.red {
  background: var(--danger);
}

.page-profile__status.yellow {
  background: var(--warning);
}

.page-profile__status.green {
  background: var(--success);
}

.page-profile__status.blue {
  background: var(--primary);
}

.colored_dl {
  width: 100%;
}

.info_dl {
  padding: 1rem;
  border: 1px solid rgba(84, 85, 93, 0.15);
  background-color: white;
  text-align: center;
  /* width: 50%; */
  margin-bottom: 0 !important;
}

.info_dl dt {
  color: black;
  font-size: var(--sm);
  margin-bottom: 2px;
  font-weight: 500;
}

.info_dl dd {
  font-size: 1rem;
  line-height: 1.25rem;
  color: #0a73b1;
  font-weight: bold;
}

.footer {
  width: 100%;
  background: var(--app-fg);
  padding: 0.5rem;
  margin-top: 1rem;
}

.app-menu-item-small {
  display: inline-block;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.25rem;
  margin: 0 0.5rem;
  color: var(--dim);
  border-radius: 0.25rem;
  font-size: var(--sm);
}

.link-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.link-list li {
  display: inline;
}

@media screen and (max-width: 767px) {
  .page-profile__header__actions {
    margin-right: 0;
  }
}

@media screen and (max-width: 1023px) {
  /* .tm-page-main {
    min-height: 100vh;
  } */
  .tm-page {
    margin: 0 !important
  }
}
</style>
