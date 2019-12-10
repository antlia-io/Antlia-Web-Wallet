<template>
  <TmPage
    :managed="true"
    :loading="transactions.loading"
    :loaded="transactions.loaded"
    :error="transactions.error"
    :data-empty="dataEmpty"
    data-title="Transactions"
    :sign-in-required="true"
    :hide-header="true"
    :footer="false"
    id="transactionscss"
    class="finishmarginleft"
  >
    <DataEmptyTx slot="no-data" />
    <template slot="managed-body">
      <div class="row ptb">
        <h1>TRANSACTIONS</h1>
      </div>
      <div class="row">
        <div class="col-lg-12">
     <LiAnyTransaction
        v-for="tx in orderedTransactions"
        :key="tx.txhash"
        :validators="delegates.delegates"
        :validators-url="validatorURL"
        :proposals-url="governanceURL"
        :transaction="tx"
        :address="session.address"
        :bonding-denom="bondDenom"
        :unbonding-time="
          time.getUnbondingTime(tx, delegation.unbondingDelegations)
        "
      />
        </div>
      </div>
 
      <br />
    </template>
  </TmPage>
</template>

<script>
import shortid from "shortid"
import { mapGetters } from "vuex"
import orderBy from "lodash.orderby"
import DataEmptyTx from "common/TmDataEmptyTx"
import TmPage from "common/TmPage"
import LiAnyTransaction from "transactions/LiAnyTransaction"
import time from "scripts/time"

export default {
  name: `page-transactions`,
  components: {
    LiAnyTransaction,
    DataEmptyTx,
    TmPage
  },
  data: () => ({
    shortid: shortid,
    sort: {
      property: `height`,
      order: `desc`
    },
    validatorURL: `/staking/validators`,
    governanceURL: `/governance`,
    time
  }),
  computed: {
    ...mapGetters([
      `transactions`,
      `allTransactions`,
      `session`,
      `bondDenom`,
      `delegation`,
      `delegates`
    ]),
    orderedTransactions() {
      return orderBy(
        this.allTransactions.map(t => {
          t.height = parseInt(t.height)
          return t // TODO what happens if block height is bigger then int?
        }),
        [this.sort.property],
        [this.sort.order]
      )
    },
    dataEmpty() {
      return this.orderedTransactions.length === 0
    }
  },
  updated(){
    this.refreshTransactions()
  },
  watch: {
    "session.signedIn": {
      immediate: true,
      handler() {
        this.refreshTransactions()
      }
    }
  },
  methods: {
    async refreshTransactions({ $store, session } = this) {
      if (session.signedIn) {
        await $store.dispatch(`getAllTxs`)
      }
    }
  }
}
</script>
<style>
h1 {
  color: black;
  width: 100%;
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
  font-family: sans-serif;
  font-size: 2.5rem;
}
.ptb{
  padding: 1rem 0;
}
.row {
  background: white;
  text-align: center;
}

.finishmarginleft {
  margin: 0
}

#transactionscss .padding0 {
  padding: 0;
  background: #fff;
  margin-bottom: 3rem
}

#transactionscss .hidesidebar{
  display: none
}

#transactionscss .tm-page {
  margin-left: 0 !important
}

@media screen and (max-width: 767px) {
  h1 {
    font-size: 2rem
  }
}

@media screen and (max-width: 512px) {
  h1 {
    font-size: 1.5rem
  }
}

</style>
