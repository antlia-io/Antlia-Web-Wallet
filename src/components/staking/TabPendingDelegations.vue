<template>
  <div>
    <TmDataConnecting v-if="!delegates.loaded && !connected" />
    <TmDataLoading v-else-if="!delegates.loaded && delegates.loading" />
    <TmDataEmpty
      v-else-if="delegates.loaded && delegates.delegates.length === 0"
    />
    <!-- <TableValidators v-else :validators="delegates.delegates" /> -->
    <div v-if="delegation.loaded && unbondingTransactions.length > 0">
      <div class="unbonding-transactions">
        <template>
          <div class="table-resposive">
           <table class="data-table">
            <thead class="main-thead">
              <PanelSort :properties="properties" />
                    </thead>
           </table>
            <div class="main-table">
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
            </div>
          </div>
        </template>
      </div>
    </div>
    
  </div>
</template>

<script>
import TableValidators from "staking/TableValidators"
import TmDataEmpty from "common/TmDataEmpty"
import TmDataLoading from "common/TmDataLoading"
import TmDataConnecting from "common/TmDataConnecting"
import { mapGetters } from "vuex"
import LiAnyTransaction from "../transactions/LiAnyTransaction"
import time from "scripts/time"
import PanelSort from "staking/PanelSort"

export default {
  name: `tab-validators`,
  components: {
    TableValidators,
    TmDataEmpty,
    TmDataLoading,
    LiAnyTransaction,
    TmDataConnecting,
    PanelSort
  },
  data: () => ({
    lastUpdate: 0,
    time
  }),
  computed: {
    ...mapGetters([
      `lastHeader`,
      `delegates`,
      `committedDelegations`,
      `connected`,
      `session`,
      `transactions`,
      `delegation`,
      `bondDenom`,
      `yourValidators`
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
        })),
          properties() {
      return [
        {
          title: `From`,
          value: `From`,
          tooltip: `Amount Sender'name`
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
  }
}
</script>
