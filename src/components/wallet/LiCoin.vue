<template>
  <li :id="`li-coin--` + denomination.toLowerCase()" class="li-coin">
    <div class="li-coin__icon icon">
      <img rel=preload src="~assets/images/color.svg" />
    </div>
    <div class="li-coin__content br">
      <div class="li-coin__content-left">
        <p class="coin-denom">
          {{ denomination }}
        </p>
        <p class="coin-amount">
          {{ amount }}
        </p>
      </div>
      <!-- disable send on the hub until send is enabled -->
      <TmBtn
        v-if="!lastHeader || lastHeader.chain_id === 'cosmoshub-1'"
        v-tooltip.left="tooltip"
        value="Send"
        class="paddingright"
        color="primary"
      />
      <!-- here we use the unconverted denom, as the SendModal
          checks for balances based on the actual denom -->
      <TmBtn
        v-else
        value="Send"
        color="primary"
        class="paddingright"
        @click.native="$emit(`show-modal`, coin.denom)"
      />
      
    </div>
    <div class="li-coin__content">
      <div class="li-coin__content-left">
          <TmFormGroup
            :error="$v.receiveamount.$error && $v.receiveamount.$invalid"
            class="action-modal-form-group"
            field-id="receiveamount"
          >
            <TmField
              id="receiveamount"
              ref="receiveamount"
              v-model="receiveamount"
              class="tm-field"
              placeholder="Amount"
              type="number"
              @keyup.enter.native="enterPressed"
            />
            <TmFormMsg
              v-if="$v.receiveamount.$error && (!$v.receiveamount.required || receiveamount === 0)"
              name="Amount"
              type="required"
            />
            <TmFormMsg
              v-else-if="$v.receiveamount.$error && !$v.receiveamount.decimal"
              name="Amount"
              type="numeric"
            />
          </TmFormGroup>
      </div>
      <TmBtn
            id="receive-btn"
            :value="'Receive'"
            :to="''"
            type="anchor"
            color="primary"
            class="paddingright1"
            @click.native="receive()"
          />
    </div>
    <Receive
      ref="Receive"
      :amount="receiveamount"
    />
  </li>
</template>

<script>
import num from "scripts/num"
import TmBtn from "common/TmBtn"
import { required, decimal } from "vuelidate/lib/validators"
import Receive from "src/ActionModal/components/Receive"
import { mapGetters } from "vuex"
import TmFormGroup from "src/components/common/TmFormGroup"
import TmField from "src/components/common/TmField"
import TmFormMsg from "src/components/common/TmFormMsg"

export default {
  name: `li-coin`,
  components: {
    TmBtn,
    Receive,
    TmFormGroup,
    TmField,
    TmFormMsg
  },
  props: {
    coin: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    tooltip: `Sending tokens is currently disabled on the Color Platform.`
  }),
  data() {
    return {
      num,
      lastUpdate: 0,
      receiveamount: 0,
    }
  },
  computed: {
    ...mapGetters([
      `connected`,
      `session`,
      `wallet`,
      `delegates`,
      `delegation`,
      `liquidAtoms`,
      `lastHeader`,
      `totalAtoms`,
      `oldBondedAtoms`,
      `bondDenom`,
      `distribution`,
      `validatorsWithRewards`,
      `totalRewards`
    ]),
    viewCoin() {
      return num.createDisplayCoin(this.coin, 6)
    },
    amount() {
      return this.viewCoin.amount
    },
    denomination() {
      return this.viewCoin.denom
    },
    loaded() {
      return this.wallet.loaded && this.delegation.loaded
    }
  },
  validations() {
    return {
      receiveamount: {
        required: x => !!x && x !== `0`,
        decimal
      }
    }
  },
  methods: {
    update(height) {
      this.lastUpdate = height
      this.$store.dispatch(`getRewardsFromMyValidators`)
      this.$store.dispatch(`queryWalletBalances`)
    },
    receive() {
      this.$refs.Receive.open()
    }
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
  /* padding: 1rem; */
  border-radius: 0.25rem;
}

.li-coin__icon img {
  max-height: 100%;
  max-width: 52px;
  padding: 5px;
  border: 0.5px solid;
  display: block;
  color: orangered !important;
}

.icon{
  margin-left: .2rem
}

.li-coin__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black !important;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  font-size: var(--m);
}

.li-coin .br{
  border-right: 1px #cccccc solid;
}


.li-coin__content__left {
  display: flex;
  flex-direction: column;
}

.tm-field {
  color: black !important
}

.top-section {
  position: relative;
  padding: 0 2rem;
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
@media screen and (min-width: 421px) {
.paddingright {
  padding-right: 2rem;
  outline: 0
}

.paddingright1 {
  padding-right: 1.5rem;
  outline: 0
}
}
@media screen and (max-width: 470px) {
  .li-coin__icon {
    display: none;
  }

  .li-coin__content-left {
    padding-bottom: 0.5rem;
  }
}
@media screen and (max-width: 587px) {
  .li-coin__content {
    display: block
  }
}

@media screen and (max-width: 420px) {
    .li-coin {
    padding: .5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .li-coin .br{
  border-right: none;
    border-bottom: 1px #cccccc solid;
}
  .li-coin__content {
    padding-left: 1rem;
    text-align: center;
  }
    .height {
    height: auto !important;
  }
    .paddingright{
  padding-right: 0 !important;
}
      .paddingright1 {
  padding-right: 0 !important;
}
}
</style>
