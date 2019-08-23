<template>
  <div class="card">
    <b-progress v-if="hidebar" class="mt-2" :max="max" show-value>
      <b-progress-bar
        :value="unbondedAtoms * (100 / totalAtomsDisplay)"
        :label="`${(unbondedAtoms * (100 / totalAtomsDisplay)).toFixed(2)}%`"
        variant="success"
        animated
      ></b-progress-bar>
      <b-progress-bar
        :value="(totalAtomsDisplay - unbondedAtoms) * (100 / totalAtomsDisplay)"
        :label="`${((totalAtomsDisplay - unbondedAtoms) * (100 / totalAtomsDisplay)).toFixed(2)}%`"
        variant="warning"
        animated
      ></b-progress-bar>
    </b-progress>
    <div>
      <div class="col-md-4">
        <h3>Total {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="total-atoms__value color">{{ totalAtomsDisplay }}</h2>
      </div>
      <div class="col-md-4">
        <p class="green"></p>
        <h3>Liquid {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="color">{{ unbondedAtoms }}</h2>
      </div>
      <div class="col-md-4">
        <p class="blue"></p>
        <h3>Delegated {{ num.viewDenom(bondDenom) }} :</h3>
        <h2 class="color">{{ delegated }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import num from "scripts/num"
import { mapGetters } from "vuex"
import "bootstrap/dist/css/bootstrap.css"

export default {
  name: `tm-balance`,
  components: {},
  data() {
    return {
      num,
      lastUpdate: 0,
      value: 0,
      max: 100
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
    hidebar() {
      return this.num.atoms(this.totalAtoms) || this.num.atoms(this.liquidAtoms) !== 0
    },
    totalAtomsDisplay() {
      return this.loaded ? this.num.atoms(this.totalAtoms) : `--`
    },
    unbondedAtoms() {
      return this.loaded ? this.num.atoms(this.liquidAtoms) : `--`
    },
    delegated(){
      return this.loaded ? ((this.num.atoms(this.totalAtoms)) - (this.num.atoms(this.liquidAtoms))) : `--`
    },
    // LiquidbarValue() {
    //   if (this.num.atoms(this.totalAtoms) === 0)
    //     return 0
    //   else 
    //     return (this.num.atoms(this.liquidAtoms)) * (100 / (this.num.atoms(this.totalAtoms)))
    // },
    // DelegatedbarValue(){
    //   if (((this.num.atoms(this.totalAtoms)) - (this.num.atoms(this.liquidAtoms))) === 0)
    //     return 0
    //   else 
    //     return ((this.num.atoms(this.totalAtoms)) - (this.num.atoms(this.liquidAtoms))) * (100 / (this.num.atoms(this.totalAtoms)))
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
  height: 1.5rem !important;
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
