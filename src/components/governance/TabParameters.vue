<template>
  <div>
    <div class="parameters__details parameters__section">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <div class="create-proposal">
            <div class="cp-content">
              <img src="~assets/images/drop.png" />
              <p>Fast and secure sending of funds directly from your wallet.</p>
              <TmBtn
                id="propose-btn"
                slot="header-buttons"
                :disabled="!connected || !session.signedIn"
                :value="connected ? 'Create Proposal' : 'Connecting...'"
                color="primary"
                @click.native="onPropose"
              />
              <ModalPropose ref="modalPropose" :denom="depositDenom" />
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-8">
          <div class="proposal-values">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 value-boxOne">
                <div class="value-box">
                  <h2>
                    {{
                    governanceParameters.parameters.deposit.min_deposit
                    ? minimumDeposit
                    : `--`
                    }}
                  </h2>
                  <p>
                    Minimum deposit required
                    for a proposal to enter in voting period
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 value-boxTwo">
                <div class="value-box">
                  <h2>
                    {{
                    governanceParameters.parameters.tallying.threshold
                    ? `${parseFloat(
                    governanceParameters.parameters.tallying.threshold
                    ) * 100} %`
                    : `--`
                    }}
                  </h2>
                  <p>
                    Percentage of "YES" votes
                    required for proposal to pass
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 value-boxThree">
                <div class="value-box">
                  <h2>
                    {{
                    governanceParameters.parameters.tallying.quorum
                    ? `${parseFloat(
                    governanceParameters.parameters.tallying.quorum
                    ) * 100} %`
                    : `--`
                    }}
                  </h2>
                  <p>
                    Percentage of tokens required to vote on
                    a proposal to be considered valid
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 value-boxFour">
                <div class="value-box">
                  <h2>
                    {{
                    governanceParameters.parameters.tallying.quorum
                    ? `${parseFloat(
                    governanceParameters.parameters.tallying.quorum
                    ) * 100} %`
                    : `--`
                    }}
                  </h2>
                  <p>Proposal Votes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <dl class="info_dl col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <dt>
            Minimum Deposit
            <i id="tooltip-target-1" class="material-icons info-button">info_outline</i>
            <b-tooltip target="tooltip-target-1" triggers="hover">{{depositTooltips.min_deposit}}</b-tooltip>
          </dt>
          <dd>
            {{
            governanceParameters.parameters.deposit.min_deposit
            ? minimumDeposit
            : `--`
            }}
          </dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>
            Threshold
            <i id="tooltip-target-2" class="material-icons info-button">info_outline</i>
            <b-tooltip target="tooltip-target-2" triggers="hover">{{tallyingTooltips.threshold}}</b-tooltip>
          </dt>
          <dd>
            {{
            governanceParameters.parameters.tallying.threshold
            ? `${parseFloat(
            governanceParameters.parameters.tallying.threshold
            ) * 100} %`
            : `--`
            }}
          </dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>
            Quorum
            <i id="tooltip-target-3" class="material-icons info-button">info_outline</i>
            <b-tooltip target="tooltip-target-3" triggers="hover">{{tallyingTooltips.quorum}}</b-tooltip>
          </dt>
          <dd>
            {{
            governanceParameters.parameters.tallying.quorum
            ? `${parseFloat(
            governanceParameters.parameters.tallying.quorum
            ) * 100} %`
            : `--`
            }}
          </dd>
      </dl>-->
      <!-- <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>
              Maximum Deposit Period
              <i
                v-tooltip.top="depositTooltips.max_deposit_period"
                class="material-icons info-button"
              >
                info_outline
              </i>
            </dt>
            <dd>
              {{
                governanceParameters.parameters.deposit.max_deposit_period
                  ? depositPeriodInDays + ` days`
                  : `--`
              }}
            </dd>
      </dl>-->
      <!-- </div> -->
      <!-- <div class="row">
          
      </div>-->
      <!-- <div class="row"> -->
      <!-- <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>
              Veto
              <i
                v-tooltip.top="tallyingTooltips.veto"
                class="material-icons info-button"
              >
                info_outline
              </i>
            </dt>
            <dd>
              {{
                governanceParameters.parameters.tallying.veto
                  ? `${parseFloat(
                      governanceParameters.parameters.tallying.veto
                    ) * 100} %`
                  : `--`
              }}
            </dd>
      </dl>-->
      <!-- <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>
              Voting Period
              <i
                v-tooltip.top="votingTooltips.voting_period"
                class="material-icons info-button"
              >
                info_outline
              </i>
            </dt>
            <dd>
              {{
                governanceParameters.parameters.voting.voting_period
                  ? votingPeriodInDays + ` days`
                  : `--`
              }}
            </dd>
      </dl>-->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import num, { atoms } from "../../scripts/num.js"
import ModalPropose from "src/ActionModal/components/ModalPropose"
import TmBtn from "common/TmBtn"

export default {
  name: `tab-staking-parameters`,
  data: () => ({
    atoms,
    depositTooltips: {
      description: `Governance deposit parameters for the Color Platform`,
      min_deposit: `Minimum deposit required for a proposal to enter in voting period`,
      max_deposit_period: `Deposits must reach "minimum deposit" threshold in this period of time`
    },
    tallyingTooltips: {
      description: `Tally parameters for governance in the Color Platform`,
      threshold: `Percentage of "Yes" votes required for proposal to pass`,
      veto: `Percentage of "No With Veto" votes required for proposal to be vetoed`,
      quorum: `Percentage of tokens required to vote on a proposal to be considered valid`
    },
    votingTooltips: {
      description: `Voting parameters for governance in Color Platform`,
      voting_period: `Length of voting period for proposals on Color Platform`
    }
  }),
  components: {
    ModalPropose,
    TmBtn
  },
  computed: {
    ...mapGetters([
      `session`,
      `governanceParameters`,
      `proposals`,
      `depositDenom`,
      `connected`
    ]),
    minimumDeposit() {
      const coin = num.createDisplayCoin(
        this.governanceParameters.parameters.deposit.min_deposit[0]
      )
      return `${coin.amount} ${coin.denom}`
    },
    depositPeriodInDays() {
      return (
        parseInt(
          this.governanceParameters.parameters.deposit.max_deposit_period
        ) /
        (10 ** 9 * 60 * 60 * 24)
      )
    },
    votingPeriodInDays() {
      return (
        parseInt(this.governanceParameters.parameters.voting.voting_period) /
        (10 ** 9 * 60 * 60 * 24)
      )
    }
  },
  methods: {
    onPropose() {
      this.$refs.modalPropose.open()
    }
  },
  async mounted() {
    this.$store.dispatch(`getGovParameters`)
  }
}
</script>
<style>
/* .parameters__details > .row > .column {
  flex: 1;
} */

.parameters__section {
  background: url(~assets/images/secbg.jpg) no-repeat;
  background-size: cover;
  padding: 3rem 1rem;
  margin: 0 0 1rem;
}

/* .parameters__section h3 {
  padding: 0.5rem 1rem;
  font-size: var(--h3);
  font-weight: 500;
} */
.create-proposal {
  background: url(~assets/images/createproposal.jpg) no-repeat;
  background-size: cover;
  background-position: right;
  border-radius: 25px;
  padding: 2rem 1rem;
}
.create-proposal .tm-btn{
  display: block;
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
}
.create-proposal img {
  margin: 0 auto 1rem;
  display: block;
}
.create-proposal p {
  width: 95%;
  margin: 0 auto 1rem;
  text-align: center;
}
.proposal-values {
  background: #151934;
  padding: 1.5rem;
  border-radius: 25px;
}
.proposal-values h2 {
  font-size: 1.5rem;
  color: #848688;
  font-weight: 600;
}
.proposal-values p {
  font-size: 10px;
  color: #848688;
}
.proposal-values .value-box {
  padding: 1.1rem 0.5rem;
  text-align: center;
}
.proposal-values .value-boxOne {
  border-right: 1px solid #3c466c;
  border-bottom: 1px solid #3c466c;
}
.proposal-values .value-boxTwo {
  border-bottom: 1px solid #3c466c;
}
.proposal-values .value-boxThree {
  border-right: 1px solid #3c466c;
}
@media(max-width: 767px){
  .create-proposal {
    margin: 0 0 1.5rem;
  }
}
@media(max-width: 575px){
  .parameters__section{
    padding: 1.5rem 0;
  }
  .proposal-values .value-boxOne,
  .proposal-values .value-boxThree {
  border-right: none;
  border-bottom: 1px solid #3c466c;
}
.proposal-values .value-boxTwo {
  border-bottom: 1px solid #3c466c;
}
.proposal-values {
  padding: 0.5rem 1rem;
}
}
</style>
