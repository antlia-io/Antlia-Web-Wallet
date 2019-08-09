<template>
  <div class="card">
    <b-progress class="mt-2" :max="max" show-value>
      <b-progress-bar
        :value="unbondedAtoms * (100 / totalAtomsDisplay)"
        :label="`${(unbondedAtoms * (100 / totalAtomsDisplay)).toFixed(2)}%`"
        variant="success"
      ></b-progress-bar>
      <!-- <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar> -->
      <b-progress-bar
        :value="(totalAtomsDisplay - unbondedAtoms) * (100 / totalAtomsDisplay)"
        :label="
          `${(
            (totalAtomsDisplay - unbondedAtoms) *
            (100 / totalAtomsDisplay)
          ).toFixed(2)}%`
        "
        variant="warning"
      ></b-progress-bar>
    </b-progress>
    <div>
      <div class="col-md-4">
        <h3>Total {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="total-atoms__value color">
          {{ totalAtomsDisplay }}
        </h2>
      </div>
      <div class="col-md-4">
        <p class="green"></p>
        <h3>Liquid {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="color">{{ unbondedAtoms }}</h2>
      </div>
      <div class="col-md-4">
        <p class="blue"></p>
        <h3>Delegated {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="color">{{ totalAtomsDisplay - unbondedAtoms }}</h2>
      </div>
    </div>
    <div class="col-lg-4">
      <h2>Public Address : </h2>
      <Bech32 :address="session.address || ''" />
    </div>
  </div>
  <!-- <div class="header-balance">
    <div class="top">
      <div class="total-atoms top-section">
        <h3>Total {{ num.viewDenom(bondDenom) }}</h3>
        <h2 class="total-atoms__value">
          {{ totalAtomsDisplay }}
        </h2>
      </div>
      <div class="second-row">
        <div class="unbonded-atoms top-section">
          <h3>Liquid {{ num.viewDenom(bondDenom) }}</h3>
          <h2>{{ unbondedAtoms }}</h2>
        </div>
        <div v-if="rewards" class="top-section">
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
        </div>
      </div>
    </div>
    <slot />
    <ModalWithdrawRewards
      ref="ModalWithdrawRewards"
      :rewards="totalRewards"
      :denom="bondDenom"
    />
  </div> -->
</template>
<script>
import num from "scripts/num"
import Bech32 from "common/Bech32"
// import TmBtn from "common/TmBtn"
// import ModalWithdrawRewards from "src/ActionModal/components/ModalWithdrawRewards"
import { mapGetters } from "vuex"
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.css"

export default {
  name: `tm-balance`,
  components: {
    Bech32
    // TmBtn,
    // ModalWithdrawRewards
  },
  data() {
    return {
      num,
      lastUpdate: 0
      // value: 45,
      // max: 100
    }
  },
  computed: {
    ...mapGetters([
      `connected`,
      `session`,
      `wallet`,
      `delegation`,
      `liquidAtoms`,
      `lastHeader`,
      `totalAtoms`,
      `bondDenom`,
      `distribution`,
      `validatorsWithRewards`,
      `totalRewards`
    ]),
    loaded() {
      return this.wallet.loaded && this.delegation.loaded
    },
    totalAtomsDisplay() {
      return this.loaded ? this.num.atoms(this.totalAtoms) : `--`
    },
    unbondedAtoms() {
      return this.loaded ? this.num.atoms(this.liquidAtoms) : `--`
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
  watch: {
    lastHeader: {
      immediate: true,
      handler(newHeader) {
        const height = Number(newHeader.height)
        // run the update queries the first time and after every 10 blocks
        const waitedTenBlocks = height - this.lastUpdate >= 10
        if (
          this.session.signedIn &&
          (this.lastUpdate === 0 || waitedTenBlocks)
        ) {
          this.update(height)
        }
      }
    }
  },
  methods: {
    update(height) {
      this.lastUpdate = height
      this.$store.dispatch(`getRewardsFromMyValidators`)
      this.$store.dispatch(`queryWalletBalances`)
    },
    onWithdrawal() {
      this.$refs.ModalWithdrawRewards.open()
    },
    rendomValue() {
      this.value = Math.random() * this.max
    }
  }
}
</script>
<style scoped>
.mt-2.progress {
  margin: 1rem !important;
}

.header-balance {
  display: flex;
  padding: 1rem 0 2.5rem 1rem;
}

h3 {
  color: black !important;
  font-size: 1rem !important;
  display: inline;
}

.col-md-4 {
  display: inline;
}

.progress {
  height: 2rem !important;
}

h2 {
  color: black !important;
  font-size: 1rem !important;
  display: inline;
}

.displayinline {
  display: inline-flex;
}

.bg-warning {
  background-color: #0974b1 !important;
}

.green {
  background-color: #28a745;
  width: 15px;
  height: 15px;
  display: -webkit-inline-box;
}

.blue {
  background-color: #0974b1;
  width: 15px;
  height: 15px;
  display: -webkit-inline-box;
}

.color {
  color: #0a73b1 !important;
}

p {
  margin-bottom: 0 !important;
}

.total-atoms.top-section {
  padding-left: 0;
}

.header-balance .top {
  display: flex;
  flex-direction: row;
}

.top-section {
  position: relative;
  padding: 0 2rem;
}

.header-balance .top h3 {
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
}

.header-balance .top h2 {
  color: var(--bright);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 40px;
}

.withdraw-rewards {
  font-size: var(--sm);
  font-weight: 500;
}

.second-row {
  flex-direction: row;
  display: flex;
}

/* TODO fix scaling on medium sized screens and pick proper break point */
@media screen and (max-width: 550px) {
  .header-balance {
    padding: 0;
  }

  .top-section {
    padding: 0.5rem 0 1rem;
  }

  .header-balance .top {
    flex-direction: column;
    width: 100%;
  }

  .second-row {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
