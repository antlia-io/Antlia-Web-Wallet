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
       <div class="row header">
        <div class="col-lg-6">
          <h2>Transactions</h2>
        </div>
        <div class="col-lg-6 search-field">
          <div>
            <input type="text" name="Search" placeholder="Search" class="form-control" />
          </div>
        </div>
      </div>
      <PageTransactions />
    </template>
  </TmPage>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import PageTransactions from "./PageTransactions"
import TmPage from "common/TmPage"
import TmDataMsg from "common/TmDataMsg"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    PageTransactions,
    TmPage
  },
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`, `allTransactions`]),
    dataEmpty() {
      return this.allTransactions.length===0?this.wallet.balances.length === 0:false
    }
  },
  async mounted() {
    this.updateDelegates()
    await this.queryWalletBalances()
  },
  methods: {
    ...mapActions([`updateDelegates`, `queryWalletBalances`])
  }
}
</script>

