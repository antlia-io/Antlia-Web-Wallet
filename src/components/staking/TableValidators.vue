<template>
  <div class="table-validator">
    <table class="data-table table-responsive">
      <thead>
        <PanelSort :sort="sort" :properties="properties" />
      </thead>
      <tbody>
        <LiValidator
          v-for="validator in sortedEnrichedValidators"
          :key="validator.operator_address"
          :validator="validator"
        />
      
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import num from "scripts/num"
import orderBy from "lodash.orderby"
import LiValidator from "staking/LiValidator"
import PanelSort from "staking/PanelSort"
import BN from "bignumber.js"
export default {
  name: `table-validators`,
  components: {
    LiValidator,
    PanelSort
  },
  props: {
    validators: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    num: num,
    query: ``,
    sort: {
      property: `commission`,
      order: `asc`
    },
    rollingWindow: 10000 // param of slashing period
  }),
  computed: {
    ...mapGetters([
      `committedDelegations`,
      `delegates`,
      `session`,
      `distribution`,
      `bondDenom`,
      `keybase`,
      `pool`,
      `lastHeader`
    ]),
    enrichedValidators(
      {
        validators,
        delegates: { signingInfos },
        pool,
        committedDelegations,
        keybase,
        session,
        distribution,
        rollingWindow
      } = this
    ) {
      return validators.map(v => {
        const signingInfo = signingInfos[v.operator_address]
        return Object.assign({}, v, {
          small_moniker: v.description.moniker.toLowerCase(),
          my_delegations:
            session.signedIn && committedDelegations[v.operator_address] > 0
              ? committedDelegations[v.operator_address]
              : 0,
          commission: v.commission.rate,
          voting_power: BN(v.tokens)
            .div(pool.pool.bonded_tokens)
            .toFixed(10),
          keybase: keybase[v.description.identity],
          rewards:
            session.signedIn && distribution.rewards[v.operator_address]
              ? distribution.rewards[v.operator_address][this.bondDenom]
              : 0,
          uptime: signingInfo
            ? (rollingWindow - signingInfo.missed_blocks_counter) /
              rollingWindow
            : 0
        })
      })
    },
    sortedEnrichedValidators() {
      return orderBy(
        this.enrichedValidators.slice(0),
        [this.sort.property],
        [this.sort.order]
      )
    },
    properties() {
      return [
        {
          title: `Validator List`,
          value: `small_moniker`,
          tooltip: `The validator's name`
        },
          {
          title: `Rewards`,
          value: `rewards`,
          tooltip: `Rewards you have earned from this validator`
        },
        {
          title: `Delegations`,
          value: `my_delegations`,
          tooltip: `Number of ${num.viewDenom(
            this.bondDenom
          )} you have delegated to this validator`
        },
      
        {
          title: `Voting Power`,
          value: `voting_power`,
          tooltip: `Percentage of voting shares`
        },
        {
          title: `Commission`,
          value: `commission`,
          tooltip: `Fee, that validator will charge from your rewards`
        },
        {
          title: `Uptime`,
          value: `uptime`,
          tooltip: `Ratio of blocks signed within the last 10k blocks`
        },
         {
          title: `Status`,
          value: `status`,
          tooltip: `Validator Status`
        }
      ]
    },
    yourValidators({ committedDelegations, validators, session } = this) {
      if (!session.signedIn) {
        return
      }

      return validators.filter(
        ({ operator_address }) => operator_address in committedDelegations
      )
    }
  },
  watch: {
    address: function() {
      this.session.address && this.$store.dispatch(`updateDelegates`)
    },
    lastHeader: {
      immediate: true,
      handler() {
        this.$store.dispatch(`getRewardsFromMyValidators`)
      }
    }
  },
  mounted() {
    this.$store.dispatch(`getPool`)
    this.$store.dispatch(`updateDelegates`)
    this.$store.dispatch(`getRewardsFromMyValidators`)
  }
}
</script>

