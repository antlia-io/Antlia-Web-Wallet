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
    <PageSign />
    <template slot="managed-body">
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
import TmPage from "common/TmPage"
import TmDataMsg from "common/TmDataMsg"
import PageSign from "../sign/PageSign"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    LiCoin,
    PageSign,
    PageTransactions,
    TmPage,
    SendModal
  },
  data: () => ({ num, showSendModal: false }),
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`, `allTransactions`]),
    dataEmpty() {
      return this.allTransactions.length===0?this.wallet.balances.length === 0:false
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

