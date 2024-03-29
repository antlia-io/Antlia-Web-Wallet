<template>
  <div>
    <CardSignInRequired v-if="!session.signedIn" />
    <div v-else-if="delegation.loaded && yourValidators.length > 0">
      <TableValidators :validators="yourValidators" />
    </div>
    <TmDataConnecting v-else-if="!delegation.loaded && !connected" />
    <TmDataLoading v-else-if="!delegation.loaded && delegation.loading" />
    <TmDataMsg
      v-else-if="yourValidators.length === 0"
      icon="sentiment_dissatisfied"
    >
      <div slot="title">
        No Active Delegations
      </div>
      <div slot="subtitle">
        Looks like you haven't delegated any {{ num.viewDenom(bondDenom) }}
        yet. Head over to the
        <router-link :to="{ name: 'Validators' }">
          validator list
        </router-link>
        to make your first delegation!
      </div>
    </TmDataMsg>
    <!-- <div v-if="delegation.loaded && unbondingTransactions.length > 0" class="undelegations">
      <h3 class="tab-header transactions">
        Pending Undelegations
      </h3>
      <div class="unbonding-transactions">
        <template>
          <LiAnyTransaction
            v-for="tx in unbondingTransactions"
            :key="tx.txhash"
            :validators="yourValidators"
            :validators-url="`/staking/validators`"
            :proposals-url="`/governance`"
            :transaction="tx"
            :address="session.address"
            :bonding-denom="bondDenom"
            :unbonding-time="
              time.getUnbondingTime(tx, delegation.unbondingDelegations)
            "
          />
          <br />
        </template>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import num from "scripts/num"
import LiAnyTransaction from "../transactions/LiAnyTransaction"
import TmDataMsg from "common/TmDataMsg"
import CardSignInRequired from "common/CardSignInRequired"
import TmDataLoading from "common/TmDataLoading"
import TableValidators from "staking/TableValidators"
import TmDataConnecting from "common/TmDataConnecting"
import time from "scripts/time"

export default {
  name: `tab-my-delegations`,
  components: {
    TableValidators,
    TmDataMsg,
    TmDataConnecting,
    TmDataLoading,
    LiAnyTransaction,
    CardSignInRequired
  },
  data: () => ({
    unbondTransactions: `Transactions currently in the undelegation period`,
    validatorURL: `/staking/validators`,
    time,
    num,
    lastUpdate: 0
  }),
  computed: {
    ...mapGetters([
      `transactions`,
      `delegates`,
      `delegation`,
      `committedDelegations`,
      `bondDenom`,
      `connected`,
      `session`,
      `lastHeader`
    ]),
    yourValidators(
      {
        committedDelegations,
        delegates: { delegates },
        session: { signedIn }
      } = this
    ) {
      return (
        signedIn &&
        delegates.filter(
          ({ operator_address }) => operator_address in committedDelegations
        )
      )
    },
    unbondingTransactions: ({ transactions, delegation } = this) =>
      transactions.staking &&
      transactions.staking
        .filter(transaction => {
          // Checking the type of transaction
          if (transaction.tx.value.msg[0].type !== `color/MsgUndelegate`)
            return false

          // getting the unbonding time and checking if it has passed already
          const unbondingEndTime = time.getUnbondingTime(
            transaction,
            delegation.unbondingDelegations
          )

          if (unbondingEndTime && unbondingEndTime >= Date.now()) return true
        })
        .map(transaction => ({
          ...transaction,
          unbondingDelegation:
            delegation.unbondingDelegations[
              transaction.tx.value.msg[0].value.validator_address
            ]
        }))
  },
  watch: {
    "session.signedIn": function() {
      this.loadStakingTxs()
    }
  },
  async mounted() {
    this.loadStakingTxs()
  },
  methods: {
    async loadStakingTxs() {
      if (this.session.signedIn) {
        await this.$store.dispatch(`getAllTxs`)
      }
    }
  }
}
</script>
<style>
.tab-header {
  color: black;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
  background-color: white;
  margin: 0 !important;
}

.info-button {
  color: #0a73b1;
}

.undelegations {
  background: white;
  padding: 1rem;
  margin: 0 0 3rem;
}

.unbonding-transactions .tm-li-tx::before {
  position: absolute;
  width: 2rem;
  text-align: right;
  color: var(--dim);
  left: 0;
}
</style>
