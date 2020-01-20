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
      <div>
     
      
<div class="table-resposive">
           <table class="data-table">
            <thead class="main-thead">
              <PanelSort :properties="properties" />
             <!-- <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th> -->
            </thead>
           </table>
            <!-- <tbody> -->
              <!-- <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
                <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
               <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
                <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr> -->
              <div class="main-table">
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
              <!-- <LiTransaction/> -->
            <!-- </tbody> -->
          <!-- </table> -->
          <!-- <LiAnyTransaction
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
          /> -->
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
// import LiTransaction from "transactions/LiTransaction"
import time from "scripts/time"
import PanelSort from "staking/PanelSort"

export default {
  name: `page-transactions`,
  components: {
    LiAnyTransaction,
    // LiTransaction,
    DataEmptyTx,
    TmPage,
    PanelSort
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
    },
     properties() {
      return [
        {
          title: `To`,
          value: `Sent to`,
          tooltip: `Amount receiver'name`
        },
        {
          title: `Hash ID`,
          value: `Hash ID`,
          tooltip: `Validator's Hash ID`
        },
        {
          title: `Amount`,
          value: `Amount`,
          tooltip: `Amount sent to this validator`
        },

        {
          title: `Type`,
          value: `Type`,
          tooltip: `Transactions Type`
        },
        {
          title: `Block`,
          value: `Block`,
          tooltip: `Numbers of block`
        },
        {
          title: `Network Fee`,
          value: `Network Fee`,
          tooltip: `Network Fee`
        },
        {
          title: `Time`,
          value: `Time`,
          tooltip: `Validator Time`
        }
      ]
    }
    
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
h2 {
  color: white;
  font-weight: 500;
  line-height: 1.2;
  font-size: 1.5rem;
  text-transform: uppercase;
}
.ptb {
  padding: 1rem 0;
}
.header {
  background: #131d49;
  padding: 1rem;
  align-items: center;
}
.search-field {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.search-field .form-control {
  border-radius: 2rem;
}
.finishmarginleft {
  margin: 0;
}
table .main-thead th{
  width: 14.3%;
}

#transactionscss .padding0 {
  padding: 0;
  margin-bottom: 3rem;
}

#transactionscss .table-resposive {
    display: block;
    width: 100%;
    overflow-x: scroll;
}

#transactionscss .hidesidebar {
  display: none;
}

#transactionscss .tm-page {
  margin-left: 0 !important;
}
@media screen and (max-width: 767px) {
  h1 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 512px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
