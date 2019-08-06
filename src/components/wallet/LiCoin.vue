<template>
  <li :id="`li-coin--` + denomination.toLowerCase()" class="li-coin">
    <div class="li-coin__icon">
      <img src="~assets/images/cosmos-logo.png" />
    </div>
    <div class="li-coin__content">
      <div class="li-coin__content-left">
        <div col-lg-4 style="float: left">
          <p class="coin-denom">
            {{ denomination }}
          </p>
          <p class="coin-amount">
            {{ amount }}
          </p>
        </div>
        <div col-lg-4 style="float: right">
          <!-- disable send on the hub until send is enabled -->
          <TmBtn
            v-if="!lastHeader || lastHeader.chain_id === 'cosmoshub-1'"
            v-tooltip.left="tooltip"
            value="Send"
            color="primary"
          />
          <!-- here we use the unconverted denom, as the SendModal
          checks for balances based on the actual denom -->
          <TmBtn
            v-else
            value="Send"
            color="primary"
            @click.native="$emit(`show-modal`, coin.denom)"
          />
        </div>
      </div>
      <!-- <div v-if="rewards">
        <h3>Available Rewards</h3>
          <h2>{{ rewards }}</h2>
          <TmBtn
            id="withdraw-btn"
            :disabled="!readyToWithdraw"
            class="withdraw-rewards"
            :value="'Withdraw'"
            :to="''"
            type="anchor"
            size="sm"
            @click.native="readyToWithdraw && onWithdrawal()"
          />
      </div> -->
    </div>
    <ModalWithdrawRewards
      ref="ModalWithdrawRewards"
      :rewards="totalRewards"
      :denom="bondDenom"
    />
  </li>
</template>

<script>
import num from "scripts/num"
import TmBtn from "common/TmBtn"
import ModalWithdrawRewards from "src/ActionModal/components/ModalWithdrawRewards"
import { mapGetters } from "vuex"
export default {
  name: `li-coin`,
  components: {
    TmBtn,
    ModalWithdrawRewards
  },
  props: {
    coin: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    tooltip: `Sending tokens is currently disabled on the Cosmos Hub.`
  }),
  computed: {
    ...mapGetters([`lastHeader`, `validatorsWithRewards`, `totalRewards` ]),
    viewCoin() {
      return num.createDisplayCoin(this.coin, 6)
    },
    amount() {
      return this.viewCoin.amount
    },
    denomination() {
      return this.viewCoin.denom
    },
    // only be ready to withdraw of the validator rewards are loaded and the user has rewards to withdraw
    // the validator rewards are needed to filter the top 5 validators to withdraw from
    readyToWithdraw() {
      return this.totalRewards > 0
    },
    rewards() {
      if (!this.distribution.loaded) {
        return `--`
      }
      const rewards = this.totalRewards
      return this.num.shortDecimals(
        this.num.atoms(rewards && rewards > 10 ? rewards : 0)
      )
    }
  },
  methods: {
    onWithdrawal() {
      this.$refs.ModalWithdrawRewards.open()
    },
  }
}
</script>

<style scoped>
.li-coin {
  display: flex;
  align-items: center;
  font-size: var(--m);
  margin-bottom: 0.5rem;
  border: 1px solid var(--bc-dim);
  background: white;
  padding: 1rem;
}

.li-coin__icon img {
  max-height: 100%;
  max-width: 52px;
  border: 0.5px solid;
  border-radius: 50%;
  display: block;
  color: orangered !important;
}

.li-coin__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black !important;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
  font-size: var(--m);
}

.li-coin__content__left {
  display: flex;
  flex-direction: column;
}

.coin-denom {
  font-size: var(--lg);
  color: black;
  font-weight: 500;
  margin-bottom: 0 !important;
}

p.coin-amount {
  margin-bottom: 0 !important;
}

.withdraw-rewards {
  font-size: var(--sm);
  font-weight: 500;
}

@media screen and (max-width: 425px) {
  .li-coin__icon {
    display: none;
  }

  .li-coin__content-left {
    padding-bottom: 0.5rem;
  }
}
</style>
