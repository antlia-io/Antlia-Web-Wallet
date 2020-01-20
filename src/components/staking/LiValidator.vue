<template>
  <tr class="data-table__row li-validator" :data-moniker="validator.description.moniker">
    <td>
      <div class="data-table__row__info">
        <img
          v-if="validator.keybase && validator.keybase.avatarUrl"
          :src="validator.keybase.avatarUrl"
          class="data-table__row__info__image"
        />
        <img
          v-else
          class="data-table__row__info__image data-table__row__info__image--no-img"
          src="~assets/images/antlia.svg"
        />

        <div class="data-table__row__info__container">
          <router-link
            :to="{
            name: 'validator',
            params: { validator: validator.operator_address }
          }"
            class="data-table__row__info__container__name"
          >{{ validator.description.moniker }}</router-link>
          <div class="data-table__row__info__container__description">
            <Bech32 :address="validator.operator_address" />
          </div>
        </div>
      </div>
    </td>
    <td class="li-validator__rewards">
      {{
      validator.rewards
      ? num.fullDecimals(num.atoms(validator.rewards))
      : `--`
      }}
    </td>
    <td class="li-validator__delegated-steak">
      {{
      validator.my_delegations
      ? num.fullDecimals(num.atoms(validator.my_delegations))
      : `--`
      }}
    </td>

    <td class="li-validator__voting-power">
      <span>
        <!-- {{num.fullDecimals(num.atoms(validator.tokens))}} -->
        <p>{{ validator.tokens ? percentOfVotingPower : `--` }}</p>&nbsp;
        <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
      </span>
    </td>
    <td
      class="li-validator__commission"
    >{{ validator.commission ? num.percent(validator.commission) : `--` }}</td>
    <td class="li-validator__uptime">{{ validator.uptime ? num.percent(validator.uptime) : `--` }}</td>
    <td class="li-validator__uptime">
      <!-- <span
          v-tooltip.top="status"
          :class="statusColor"
          class="data-table__row__info__container__status"
      />-->
      <div class="status-show">
        <!-- <span class="st-icon deactive-status">
          <i class="material-icons">clear</i>
          <p>Deactive</p>
        </span>-->
        <span class="st-icon active-status">
          <i class="material-icons">check</i>
          <p>Active</p>
        </span>
      </div>
    </td>
    <td class="delegate-btn">
      <div>
        <TmBtn
          id="delegation-btn"
          :disabled="!connected || !session.signedIn"
          :value="connected ? 'Delegate' : 'Connecting...'"
          class="outline dbtn"
          @click.native="onDelegation"
        />
      </div>
    </td>
    <td class="undelegate-btn">
      <div>
        <TmBtn
          id="undelegation-btn"
          :disabled="!connected || !session.signedIn"
          :value="connected ? 'Undelegate' : 'Connecting...'"
          class="outline undbtn"
          @click.native="onUndelegation"
        />
      </div>
    </td>
    <!-- <div class="dm-btn-div">
    <div class="dm-btn">
      <div class="delegate-btn">
         <TmBtn
        id="delegation-btn"
        :disabled="!connected || !session.signedIn"
        :value="connected ? 'Delegate' : 'Connecting...'"
        color="secondary"
        class="outline"
        @click.native="onDelegation"
    />
    </div>
      <div class="undelegate-btn">
        <TmBtn
        id="undelegation-btn"
        :disabled="!connected || !session.signedIn"
        :value="connected ? 'Undelegate' : 'Connecting...'"
        color="secondary"
        class="outline"
        @click.native="onUndelegation"
    />
      </div>
    </div>
    </div>-->
    <DelegationModal
      ref="delegationModal"
      :from-options="delegationTargetOptions()"
      :to="validator.operator_address"
      :validator="validator"
      :denom="bondDenom"
    />
    <UndelegationModal
      ref="undelegationModal"
      :maximum="Number(myBond)"
      :to="session.signedIn ? session.address : ``"
      :validator="validator"
      :denom="bondDenom"
    />
  </tr>
</template>

<script>
import { mapGetters } from "vuex"
import num, { atoms, viewDenom, fullDecimals } from "scripts/num"
import { calculateTokens } from "scripts/common"
import Bech32 from "common/Bech32"
import BN from "bignumber.js"
import { formatBech32 } from "src/filters"
import isEmpty from "lodash.isempty"
import TmBtn from "common/TmBtn"
import DelegationModal from "src/ActionModal/components/DelegationModal"
import UndelegationModal from "src/ActionModal/components/UndelegationModal"

export default {
  name: `li-validator`,
  components: {
    Bech32,
    TmBtn,
    DelegationModal,
    UndelegationModal
  },
  filters: {
    atoms,
    viewDenom,
    // shortDecimals,
    fullDecimals,
    formatBech32
  },
  props: {
    validator: {
      type: Object,
      required: true
    }
  },
  data: () => ({ num }),
  computed: {
    ...mapGetters([
      `delegates`,
      `distribution`,
      `session`,
      `lastHeader`,
      `pool`,
      `bondDenom`,
      `connected`,
      `delegation`,
      `committedDelegations`,
      `keybase`,
      `liquidAtoms`
    ]),
    // validator() {
    //   const validator = this.delegates.delegates.find(
    //     v => this.$route.params.validator === v.operator_address
    //   )
    //   if (validator) {
    //     validator.keybase = this.keybase[validator.description.identity]
    //     validator.signing_info = this.delegates.signingInfos[
    //       validator.operator_address
    //     ]
    //   }

    //   return validator
    // },
    status() {
      // status: jailed
      if (this.validator.jailed)
        return `This validator has been jailed and is not currently validating`

      // status: inactive
      if (parseFloat(this.validator.status) === 0)
        return `This validator does not have enough voting power and is inactive`

      // status: active
      return `This validator is actively validating`
    },
    statusColor() {
      // status: jailed
      if (this.validator.jailed) return `red`

      // status: inactive
      if (parseFloat(this.validator.status) === 0) return `yellow`

      // status: active
      return `green`
    },
    percentOfVotingPower() {
      return num.percent(
        BN(this.validator.tokens)
          .div(this.pool.pool.bonded_tokens)
          .toFixed(4)
      )
    },
    myBond() {
      if (!this.validator) return 0
      return num.atoms(
        calculateTokens(
          this.validator,
          this.committedDelegations[this.validator.operator_address] || 0
        )
      )
    }
  },
  methods: {
    onDelegation() {
      this.$refs.delegationModal.open()
    },
    onUndelegation() {
      this.$refs.undelegationModal.open()
    },
    delegationTargetOptions(
      { session, liquidAtoms, committedDelegations, $route, delegates } = this
    ) {
      if (!session.signedIn) return []

      //- First option should always be your wallet (i.e normal delegation)
      const myWallet = [
        {
          address: session.address,
          maximum: Math.floor(liquidAtoms),
          key: `My Wallet - ${formatBech32(session.address, false, 20)}`,
          value: 0
        }
      ]
      const bondedValidators = Object.keys(committedDelegations)
      if (isEmpty(bondedValidators)) {
        return myWallet
      }
      //- The rest of the options are from your other bonded validators
      //- We skip the option of redelegating to the same address
      const redelegationOptions = bondedValidators
        .filter(address => address != $route.params.validator)
        .map((address, index) => {
          const delegate = delegates.delegates.find(function(validator) {
            return validator.operator_address === address
          })
          return {
            address: address,
            maximum: Math.floor(committedDelegations[address]),
            key: `${delegate.description.moniker} - ${formatBech32(
              delegate.operator_address,
              false,
              20
            )}`,
            value: index + 1
          }
        })
      return myWallet.concat(redelegationOptions)
    }
  }
}
</script>



