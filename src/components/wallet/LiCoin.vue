<template>
<div>
    
    <div class="home-top2 send-rcv" v-if="session.signedIn">
    <li :id="`li-coin--` + denomination.toLowerCase()" class="li-coin">
      <div class="li-coin__content sendbg">
        <!-- <img src="~assets/images/sendbg.png"/> -->
        <div class="li-coin__content-left">
          <div class="li-coin__icon icon">
            <img rel="preload" src="~assets/images/drop.png" />
          </div>
          <p>Fast and secure sending of funds directly from your wallet.</p>
          <!-- <span class="clralign">
          <p class="coin-denom">{{ denomination }}</p>
          <p class="coin-amount">{{ unbondedAtoms | prettyLong }}</p>
          </span>-->
        </div>
        <TmBtn
          :disabled="unbondedAtoms <= 0"
          value="Send"
          color="primary"
          class="paddingright"
          @click.native="$emit(`show-modal`, coin.denom)"
        />
      </div>
      <div class="li-coin__content recievebg">
        <div class="li-coin__content-left">
          <div class="li-coin__icon icon">
            <img rel="preload" src="~assets/images/drop.png" />
          </div>
          <p>Reliable and quick receiving of crypto funds into your wallet.</p>
          <!-- <span class="clralign">
          <p class="coin-denom">{{ denomination }}</p>
          <p class="coin-amount">{{ unbondedAtoms | prettyLong }}</p>
          </span>-->
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

      <!-- <div class="li-coin__content">
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
      </div>-->
      <Receive ref="Receive"  />
      <!-- :amount="receiveamount" -->
    </li>
  </div>
  <div class="home-top1" v-else>
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-8 col-xs-12">
      <div class="wc-wallet">
        <div class="wc-desc">
          <h1>Antlia Wallet</h1>
                    <p>If you are working inside Microsoft Word and need some filler text to test the layout of fonts</p>
                    <TmBtn value="Demo Video"/>
        </div>
      </div>
      </div>
      <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
      <div class="wc-img">
        <img rel="preload" src="~assets/images/webappex.png" />
    </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import num from "scripts/num"
import TmBtn from "common/TmBtn"
import { required, decimal } from "vuelidate/lib/validators"
import Receive from "src/ActionModal/components/Receive"
import { mapGetters } from "vuex"
import { atoms as toAtoms, prettyLong } from "../../scripts/num.js"
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
  filters: {
    toAtoms,
    prettyLong
  },
  props: {
    coin: {
      type: Object,
      required: true
    },
    proposalPage: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    tooltip: `Sending tokens is currently disabled on the Color Platform.`
  }),
  data() {
    return {
      num,
      lastUpdate: 0,
      // receiveamount: ``
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
    // amount() {
    //   return this.viewCoin.amount
    // },
    denomination() {
      return this.viewCoin.denom
    },
    unbondedAtoms() {
      return this.loaded ? num.atoms(this.liquidAtoms) : `--`
    },
    loaded() {
      return this.wallet.loaded && this.delegation.loaded
    }
  },
  validations() {
    return {
      // receiveamount: {
      //   required: x => !!x && x !== `0`,
      //   decimal
      // }
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
.home-top1 {
  background: url(~assets/images/firstbg.jpg) no-repeat;
  background-size: cover;
  padding: 3rem 5rem;
  margin: 0 0 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wc-wallet {
    margin: 0 3rem 0 0;
    /* width: 50%; */
}
.wc-wallet .tm-btn{
    width: 150px;
}
/* .wc-img{
  display: flex;
  align-content: center;
  justify-content: center;
} */
.wc-img img {
  width: 100%;
}
.send-rcv .tm-btn{
    width: 70%;
}
.home-top1 h1 {
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  margin: 1rem 0;
}
.home-top1 p {
  font-size: 1.2rem;
  color: #fff;
  margin: 0 0 1rem;
}
.home-top2 p {
  width: 97%;
}
.home-top2 {
  background: url(~assets/images/secbg.jpg) no-repeat;
  background-size: cover;
  padding: 3rem 1rem;
  margin: 0 0 1rem;
}
.sendbg {
  background: url(~assets/images/sendbg.jpg) no-repeat;
  background-size: cover;
  background-position: left;
}
.recievebg {
  background: url(~assets/images/recievebg.jpg) no-repeat;
  background-size: cover;
  background-position: right;
}
.li-coin {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--m);
  /* border: 1px solid var(--bc-dim); */
  /* padding: 1rem; */
  border-radius: 0.25rem;
}

.li-coin__icon img {
  max-height: 100%;
  max-width: 52px;
  padding: 5px;
  display: block;
  /* color: orangered !important; */
}

.icon {
  margin: 0 auto 2rem;
}

.li-coin__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  width: 40%;
  padding: 2.5rem;
  font-size: var(--m);
  text-align: center;
  border-radius: 25px;
}
.clralign {
  display: block;
}
.li-coin__content-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 1.7rem;
}

.tm-field {
  color: black !important;
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
  width: 100%;
  text-align: left;
}
.clralign {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
p.coin-amount {
  margin-bottom: 0 !important;
}
@media screen and (min-width: 421px) {
  .paddingright,
  .paddingright1 {
    outline: 0;
  }
}
@media screen and (max-width: 470px) {
  .li-coin__icon {
    display: none;
  }
  .clralign {
    display: block;
  }
  .li-coin__content-left {
    padding-bottom: 0.5rem;
    justify-content: center;
    flex-direction: column;
  }
}
@media screen and (max-width: 425px) {
  .li-coin__content {
    display: block;
  }
  .coin-denom {
    text-align: center !important;
  }
}

@media screen and (max-width: 615px) {
  .li-coin {
    padding: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .li-coin__content {
    text-align: center;
    width: 100%;
    margin: 0 0 1rem;
  }
  .height {
    height: auto !important;
  }
.send-rcv .tm-btn{
    width: 100%;
}
}
@media screen and (max-width: 991px) {
  .icon {
    display: none;
  }
}
@media (max-width: 736px) {
 .home-top1{
   padding: 2rem 1rem;
 }
}
@media (max-width: 575px) {
 .wc-wallet{
   margin: 0 0 1rem;
 }
 .home-top1 h1{
   font-size: 2rem;
 }
}


</style>
