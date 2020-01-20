<template>
  <div class="ratebox-sidebar">
    <div class="card">
      <div class="title-logout box-header">
        <h4>Public Address</h4>
        <router-link to="/scanqr" v-if="session.signedIn">
          <!-- <i v-tooltip.bottom.end="'Sign Out'" class="material-icons">
        exit_to_app
          </i>-->
          <img src="~assets/images/logout.png" v-tooltip.bottom.end="'Scan QR Code'" />
        </router-link>
      </div>
      <div v-if="session.signedIn" class="br-top">
        <TmBtn value="Create QR Code" class="custom-btn" @click.native="showModal()" />
        <SignModal ref="signModal" />
        <div class="vadrs">
          <p>Create QR Code to verify address</p>
        </div>
        <div class="publicaddress">
          <Bech32 :address="session.address || ''" long-form />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="box-header">
        <h4>Total {{ num.viewDenom(bondDenom) }}:</h4>
      </div>
      <div class="chart-value">
        <!-- <div class="graph-set">
          <PieChart :data="chartData" :options="chartOptions"></PieChart>
          </div> -->

        <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
        <p class="total-atoms__value color">{{ totalAtomsDisplay | prettyLong }}</p>
      </div>
    </div>
    <!-- <b-progress v-if="hidebar" class="mt-2" :max="max" show-value>
      <b-progress-bar
        :value="((num.atoms(liquidAtoms)) *100 ) / (num.atoms(totalAtoms))"
        :label="`${(((num.atoms(liquidAtoms)) *100 ) / (num.atoms(totalAtoms))).toFixed(2)}%`"
        variant="success"
        animated
      ></b-progress-bar>
      <b-progress-bar
        :value="((num.atoms(oldBondedAtoms))*100) / (num.atoms(totalAtoms))"
        :label="`${(((num.atoms(oldBondedAtoms))*100) / (num.atoms(totalAtoms))).toFixed(2)}%`"
        variant="warning"
        animated
      ></b-progress-bar>
      <b-progress-bar
        :value="((num.atoms(oldUnbondingAtoms))*100) / (num.atoms(totalAtoms))"
        :label="`${(((num.atoms(oldUnbondingAtoms))*100) / (num.atoms(totalAtoms))).toFixed(2)}%`"
        variant="danger"
        animated
      ></b-progress-bar>
    </b-progress>-->

    <div class="card">
      <div class="box-header">
        <h4>
          <!-- <p class="green"></p> -->
          Liquid {{ num.viewDenom(bondDenom) }}:
        </h4>
      </div>
      <div class="chart-value">
        <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
        <p class="total-atoms__value color">{{ unbondedAtoms | prettyLong }}</p>
      </div>
    </div>

    <div class="card">
      <div class="box-header">
        <h4>
          <!-- <p class="blue"></p> -->
          Delegated {{ num.viewDenom(bondDenom) }}:
        </h4>
      </div>
      <div class="chart-value">
        <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
        <p class="total-atoms__value color">{{ delegated | prettyLong }}</p>
      </div>
    </div>

    <div class="card">
      <div class="box-header">
        <h4>
          <!-- <p class="purple"></p> -->
          Pending {{ num.viewDenom(bondDenom) }}:
        </h4>
      </div>
      <div class="chart-value">
        <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
        <p class="total-atoms__value color">{{ unbondingAtoms | prettyLong }}</p>
      </div>
    </div>

  
      <div v-if="rewards" class="card  display">
        <div class="box-header">
          <h4 class="margintop">Available Rewards:</h4>
        </div>
        <div class="chart-value">
          <img class="chart-set" src="~assets/images/chart_donut_pie.png" />
          <div class="reward-withdraw">
            <p>{{ rewards }}</p>
            <TmBtn
              v-if="session.signedIn"
              id="withdraw-btn"
              value="Withdraw"
              :to="''"
              type="anchor"
              color="primary"
              class="withdrawbtn"
              @click.native="readyToWithdraw && onWithdrawal()"
            />
          </div>
       <!-- :disabled="!readyToWithdraw" -->
      </div>
    </div>
    <ModalWithdrawRewards ref="ModalWithdrawRewards" :rewards="totalRewards" :denom="bondDenom" />
  </div>
</template>
<script>
import num from "scripts/num"
import { mapGetters } from "vuex"
import { atoms as toAtoms, prettyLong } from "../../scripts/num.js"
import ModalWithdrawRewards from "src/ActionModal/components/ModalWithdrawRewards"
import TmBtn from "./TmBtn"
import Bech32 from "./Bech32"
import "bootstrap/dist/css/bootstrap.css"
import SignModal from "src/ActionModal/components/SignModal"
// import PieChart from "./common/PieChart.js";

export default {
  name: `tm-balance`,
  components: { 
    TmBtn, 
    ModalWithdrawRewards, 
    Bech32, 
    SignModal, 
    // PieChart
     },
      data() {
    return {
       num,
      lastUpdate: 0,
      value: 0,
      max: 100,
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5]
          }
        ]
      }
    };
  },
  // data() {
  //   return {
  //     num,
  //     lastUpdate: 0,
  //     value: 0,
  //     max: 100
  //   }
  // },
  filters: {
    toAtoms,
    prettyLong
  },
  computed: {
    ...mapGetters([
      `connected`,
      `session`,
      `wallet`,
      `oldBondedAtoms`,
      `delegation`,
      `liquidAtoms`,
      `lastHeader`,
      `totalAtoms`,
      `bondDenom`,
      `distribution`,
      `validatorsWithRewards`,
      `totalRewards`,
      `oldUnbondingAtoms`,
      `committedDelegates`,
      `delegates`
    ]),
    loaded() {
      return this.wallet.loaded && this.delegation.loaded
    },
    hidebar() {
      return (
        this.num.atoms(this.totalAtoms) ||
        this.num.atoms(this.liquidAtoms) !== 0
      )
    },
    totalAtomsDisplay() {
      return this.loaded ? this.num.atoms(this.totalAtoms) : `--`
    },
    unbondedAtoms() {
      return this.loaded ? this.num.atoms(this.liquidAtoms) : `--`
    },
    unbondingAtoms() {
      return this.loaded ? this.num.atoms(this.oldUnbondingAtoms) : `--`
    },
    delegated() {
      return this.loaded ? this.num.atoms(this.oldBondedAtoms) : `--`
    },
    readyToWithdraw() {
      return this.totalRewards > 0
    },
    rewards() {
      if (!this.distribution.loaded) {
        return `--`
      }
      const rewards = this.totalRewards
      return this.num.fullDecimals(
        this.num.atoms(rewards && rewards > 10 ? rewards : 0)
      )
    }
    // LiquidbarValue() {
    //   if (this.num.atoms(this.totalAtoms) === 0)
    //     return 0
    //   else
    //     return (((this.num.atoms(this.liquidAtoms)) * 100) / (this.num.atoms(this.totalAtoms)))
    // }
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
      this.$store.dispatch(`updateDelegates`)
      this.totalAtoms
      this.oldBondedAtoms
      this.oldUnbondingAtoms
      this.committedDelegations
      this.delegates
    },
    onWithdrawal() {
      this.$refs.ModalWithdrawRewards.open()
    },
    showModal() {
      this.$refs.signModal.open()
    },

    signOut() {
      this.$store.dispatch(`signOut`)
      localStorage.setItem(`qraddress`, undefined)
      localStorage.setItem(`qramount`, undefined)
    }
  },
  mounted() {
    this.totalAtoms
    this.oldBondedAtoms
    this.oldUnbondingAtoms
    this.committedDelegations
    this.delegates
  }
}
</script>
<style scoped>
.card {
  background: #1c2340;
  padding: 0;
}
.card h4 {
  font-size: 1rem;
  font-weight: 600;
}
.br-top {
  border-top: 1px solid #3c466c;
  padding: 1rem;
}
.vadrs {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 0 1rem;
}
.vadrs p {
  color: #848688 !important;
  font-size: 10px;
  text-align: center;
  padding: 1rem;
  border-bottom: 1px solid #3c466c;
}
.card p {
  color: #fff;
  font-weight: 600;
}
.mt-2.progress {
  margin: 1rem !important;
}
.box-header {
  padding: 0.7rem 1rem;
}
.title-logout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
}
.title-logout img {
  width: 20px;
}
.chart-value {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #3c466c;
  padding: 1rem;
}
.chart-set {
  width: 50px;
  margin: 0 1rem 0 0;
  display: block;
}
.header-balance {
  display: flex;
  padding: 1rem 0 2.5rem 1rem;
}
.reward-withdraw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
}

.margintop {
  margin-top: 0.2rem !important;
}

h3 {
  color: white !important;
  font-size: 1rem !important;
  display: inline;
  /* line-height: 1.2; */
}

.topleft {
  margin-top: 0.2rem;
  margin-left: 0.3rem;
}

.textalign {
  text-align: left;
}

.withdrawbtn {
  width: 30% !important;
}

.col-md-4 {
  display: inline;
}

.progress {
  height: 1.5rem !important;
}

h2 {
  color: white !important;
  font-size: 1rem !important;
  display: inline;
  margin-bottom: 0.5rem;
  overflow: hidden;
  font-weight: 500;
}
 .ratebox-sidebar {
    width: 100%;
    padding: 1rem 1rem 1rem 0;
  }
  /* @media (min-width: 1920px){
  .ratebox-sidebar {
    width: 25rem;
    padding: 1rem 1rem 1rem 0;
  }
}
@media (min-width: 1440px) and (max-width: 1680px) {
  .ratebox-sidebar {
    width: 20rem;
    padding: 1rem 1rem 1rem 0;
  }
} */


@media (max-width: 1300px) {
  .ratebox-sidebar {
    width: 100%;
    padding: 1rem 1rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .card{
    width: 32%;
  }
}
@media (max-width: 991px) {
  .card{
    width: 49%;
  }
}
@media (max-width: 575px) {
  .card{
    width: 100%;
  }
}
.displayinline {
  display: inline-flex;
}

.bg-warning {
  background-color: #0974b1 !important;
}

.bg-danger {
  background-color: #9569ec !important;
}

.green {
  background-color: #28a745;
  width: 15px;
  height: 15px;
  display: -webkit-inline-box;
  margin: 0 5px 0 0;
}

.blue {
  background-color: #0974b1;
  width: 15px;
  height: 15px;
  display: -webkit-inline-box;
  margin: 0 5px 0 0;
}

.purple {
  background-color: #9569ec;
  width: 15px;
  height: 15px;
  display: -webkit-inline-box;
  margin: 0 5px 0 0;
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

@media screen and (max-width: 867px) {
  .col-md-4 {
    display: flex;
    max-width: none;
  }
}

@media screen and (max-width: 768px) {
  .display {
    display: block;
  }
}

@media screen and (max-width: 575px) {
  .alignment {
    text-align: left;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
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

@media screen and (max-width: 320px) {
  .withdrawbtn {
    margin-left: 0rem !important;
  }
}
</style>
