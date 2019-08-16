<template>
  <TmPage
    :managed="true"
    :loading="wallet.loading"
    :loaded="wallet.loaded"
    :error="wallet.error"
    :data-empty="dataEmpty"
    data-title="Wallet"
    :sign-in-required="true"
  >
    <TmDataMsg
      id="account_empty_msg"
      slot="no-data"
      icon="account_balance_wallet"
    >
      <div slot="title">
        Account empty
      </div>
      <div slot="subtitle">
        This account doesn't have anything in it&nbsp;yet.
      </div>
    </TmDataMsg>
    <template slot="managed-body">
      <!-- <template slot="address">
        <div class="card">
          <h3>Your Public Color Address</h3>
          <Bech32 :address="session.address || ''" long-form />
        </div>
      </template> -->
      <LiCoin
        v-for="coin in filteredBalances"
        :key="coin.denom"
        :coin="coin"
        class="tm-li-balance"
        @show-modal="showModal"
      />
      <PageTransactions />
    </template>
    <SendModal ref="sendModal" />
  </TmPage>
</template>

<script>
import num from "scripts/num"
import { mapGetters, mapActions } from "vuex"
import orderBy from "lodash.orderby"
import LiCoin from "./LiCoin"
import PageTransactions from "./PageTransactions"
import SendModal from "src/ActionModal/components/SendModal"
// import Bech32 from "common/Bech32"
import TmPage from "common/TmPage"
import TmDataMsg from "common/TmDataMsg"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    LiCoin,
    PageTransactions,
    TmPage,
    SendModal,
    // Bech32
  },
  data: () => ({ num, showSendModal: false }),
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`]),
    dataEmpty() {
      return this.wallet.balances.length === 0
    },
    filteredBalances() {
      return orderBy(
        this.wallet.balances,
        [`amount`, balance => num.viewDenom(balance.denom).toLowerCase()],
        [`desc`, `asc`]
      )
    }
  },
  async mounted() {
    this.updateDelegates()
    await this.queryWalletBalances()
  },
  methods: {
    ...mapActions([`updateDelegates`, `queryWalletBalances`]),
    showModal(denomination) {
      this.$refs.sendModal.open(denomination)
    }
  }
}
</script>

