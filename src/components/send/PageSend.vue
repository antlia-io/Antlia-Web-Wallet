<template>
  <TmPage
    :managed="true"
    :loading="wallet.loading"
    :loaded="wallet.loaded"
    :error="wallet.error"
    :data-empty="dataEmpty"
    data-title="Wallet"
    :sign-in-required="true"
    :sendReceive="sendReceive"
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
      <LiCoin
        v-for="coin in filteredBalances"
        :key="coin.denom"
        :coin="coin"
        class="tm-li-balance"
        @show-modal="showModal"
      />
      <PageTransactions />
    </template>
    <SendModalQRCode ref="sendModalQRCode" />
  </TmPage>
</template>

<script>
import num from "scripts/num"
import { mapGetters, mapActions } from "vuex"
import orderBy from "lodash.orderby"
import LiCoin from "./LiCoin"
import PageTransactions from "../wallet/PageTransactions"
import SendModalQRCode from "src/ActionModal/components/SendModalQRCode"
import TmPage from "common/TmPage"
import TmDataMsg from "common/TmDataMsg"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    LiCoin,
    PageTransactions,
    TmPage,
    SendModalQRCode
  },
  data: () => ({ num, showSendModalQRCode: false }),
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`, `allTransactions`]),
    dataEmpty() {
      return this.allTransactions.length===0?this.wallet.balances.length === 0:false
    },
    sendReceive() {
      if(this.dataEmpty == true)
        return true
    },
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
  async mounted() {
    this.updateDelegates()
    await this.queryWalletBalances()
  },
  methods: {
    ...mapActions([`updateDelegates`, `queryWalletBalances`]),
    showModal(denomination) {
      this.$refs.sendModalQRCode.open(denomination)
    }
  }
}
</script>