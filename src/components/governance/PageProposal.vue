<template>
  <TmPage data-title="Proposal">
    <TmDataLoading v-if="!proposals.loaded || !governanceParameters.loaded" />
    <TmDataError v-else-if="!proposal" />
    <template v-else>
      <div class="proposal-details">
        <div class="title-propose">
          <div class="row ptb">
            <div class="col-lg-8 col-md-8 col-sm-9 col-xs-12">
              <router-link
                :to="{
            name: 'Proposal',
            params: { proposalId: proposal.proposal_id }
          }"
                class="data-table__row__info__container__name"
              >{{ proposal.proposal_content.value.title }}</router-link>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-3 col-xs-12">
              <div class="show-status">
                <div class="st-view">
                  <span></span>
                  <p>Deposit Period</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 bb">
              <div class="proposedby ptb">
                <p>Proposed by:</p>&nbsp;
                <div class="prop-link"> <Bech32 :address="proposal.proposal_content.value.proposer || ''" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="deposit-vote">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <!-- v-if="proposal.proposal_status === 'DepositPeriod'" -->
              <div class="btnContainer">
                <TmBtn
                  id="deposit-btn"
                  :value="connected ? 'Deposit' : 'Connecting...'"
                  :disabled="!connected || !session.signedIn"
                  color="primary"
                  @click.native="onDeposit"
                />
                <div class="page-profile__header__actions buttoncss">
                  <TmBtn
                    v-if="proposal.proposal_status === 'VotingPeriod'"
                    id="vote-btn"
                    :value="connected ? 'Vote' : 'Connecting...'"
                    :disabled="!connected || !session.signedIn"
                    color="primary"
                    @click.native="() => onVote()"
                  />
                  <TmBtn
                    v-if="proposal.proposal_status === 'Passed'"
                    value="Proposal Passed"
                    disabled="disabled"
                    color="primary"
                  />
                  <TmBtn
                    v-if="proposal.proposal_status === 'Rejected'"
                    value="Proposal Rejected"
                    disabled="disabled"
                    color="primary"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 deposit-count">
              <p>Deposit Count:</p>
              <span>
                {{
                num.fullDecimals(num.atoms(proposal.total_deposit[0].amount))
                ? `${num.fullDecimals(num.atoms(proposal.total_deposit[0].amount))}`
                : `--`
                }}/ {{
                governanceParameters.parameters.deposit.min_deposit
                ? minimumDeposit
                : `--`
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="prop-values">
              <div class="list-item">
                <h6>Proposal ID</h6>
                <p>{{proposal.proposal_id}}</p>
              </div>
              <div class="list-item">
                <h6>Submitted</h6>
                <p>{{ submittedAgo }}</p>
              </div>
              <div class="list-item">
                <h6>Deposit Period Start Date</h6>
                <p>{{ submittedAgo }}</p>
              </div>
              <div class="list-item">
                <h6>Deposit Period End Date</h6>
                <p>{{depositEndsIn}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="prop-desc">
              <h4>Vote</h4>
              <TextBlock :content="description" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="page-profile__header page-profile__section proposal">
        <div class="row">
          <div class="page-profile__header__info">
            <div class="page-profile__status-and-title">
              <span id="tooltip-target-5" :class="status.color" class="page-profile__status" />
              <b-tooltip target="tooltip-target-5" triggers="hover">{{status.message}}</b-tooltip>
              <h2 class="page-profile__title">{{ title }}</h2>
            </div>
            <TmBtn
              v-if="proposal.proposal_status === 'DepositPeriod'"
              id="deposit-btn"
              :value="connected ? 'Deposit' : 'Connecting...'"
              :disabled="!connected || !session.signedIn"
              color="primary"
              @click.native="onDeposit"
            />
            <div class="page-profile__header__actions buttoncss">
              <TmBtn
                v-if="proposal.proposal_status === 'VotingPeriod'"
                id="vote-btn"
                :value="connected ? 'Vote' : 'Connecting...'"
                :disabled="!connected || !session.signedIn"
                color="primary"
                @click.native="() => onVote()"
              />

              <TmBtn
                v-if="proposal.proposal_status === 'Passed'"
                value="Proposal Passed"
                disabled="disabled"
                color="primary"
              />
              <TmBtn
                v-if="proposal.proposal_status === 'Rejected'"
                value="Proposal Rejected"
                disabled="disabled"
                color="primary"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <dl class="info_dl col-lg-12 description">
            <dt class="descriptionheading">Description</dt>
            <TextBlock :content="description" class="descriptionalignment" />
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>Submitted</dt>
            <dd>{{ submittedAgo }}</dd>
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>Proposal Status</dt>
            <dd>{{ proposalStatus }}</dd>
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>Funding Cycle</dt>
            <dd>
              {{ fundingCycle
              ? fundingCycle
              : `--` }}
            </dd>
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <dt>Deposit Count</dt>
            <dd>
              {{
              num.fullDecimals(num.atoms(proposal.total_deposit[0].amount))
              ? `${num.fullDecimals(num.atoms(proposal.total_deposit[0].amount))}
              ${totalDeposit.denom}`
              : `--`
              }}
            </dd>
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <dt>Requested Fund</dt>
            <dd>
              {{ num.fullDecimals(num.atoms(proposal.proposal_content.value.requested_fund[0].amount))
              ? `${num.fullDecimals(num.atoms(proposal.proposal_content.value.requested_fund[0].amount))}
              ${requestedFund.denom}`
              : `--`
              }}
            </dd>
          </dl>
          <dl class="info_dl col-lg-4 col-md-4 col-sm-6 d-sm-none d-none"></dl>
        </div>
      </div>-->

      <!-- <div v-if="proposal.proposal_status === 'VotingPeriod'" class="row marginbottom">
        <dl v-if="displayEndDate" class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>Voting End Date</dt>
          <dd>{{ endDate }}</dd>
        </dl>
        <dl
          v-if="proposal.proposal_status === 'VotingPeriod'"
          class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12"
        >
          <dt>Total Vote Count</dt>
          <dd>{{ num.shortDecimals(num.atoms(totalVotes)) }}</dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>Yes</dt>
          <dd>
            {{ num.shortDecimals(num.atoms(tally.yes)) }} /
            {{ yesPercentage }}
          </dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>No</dt>
          <dd>
            {{ num.shortDecimals(num.atoms(tally.no)) }} /
            {{ noPercentage }}
          </dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>No with Veto</dt>
          <dd>
            {{ num.shortDecimals(num.atoms(tally.no_with_veto)) }} /
            {{ noWithVetoPercentage }}
          </dd>
        </dl>
        <dl class="info_dl col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <dt>Abstain</dt>
          <dd>
            {{ num.shortDecimals(num.atoms(tally.abstain)) }} /
            {{ abstainPercentage }}
          </dd>
        </dl>
      </div>-->

      <ModalDeposit
        ref="modalDeposit"
        :proposal-id="proposalId"
        :proposal-title="title"
        :denom="depositDenom"
      />
      <ModalVote
        ref="modalVote"
        :proposal-id="proposalId"
        :proposal-title="title"
        :last-vote-option="lastVote && lastVote.option"
      />
    </template>
  </TmPage>
</template>

<script>
import moment from "moment"
import BigNumber from "bignumber.js"
import { mapGetters } from "vuex"
import num from "scripts/num"
import TmBtn from "common/TmBtn"
import TmDataError from "common/TmDataError"
import TmDataLoading from "common/TmDataLoading"
import TextBlock from "common/TextBlock"
import ModalDeposit from "src/ActionModal/components/ModalDeposit"
import ModalVote from "src/ActionModal/components/ModalVote"
import TmPage from "common/TmPage"
import Bech32 from "common/Bech32"


export default {
  name: `page-proposal`,
  components: {
    TmBtn,
    ModalDeposit,
    ModalVote,
    TmDataError,
    TmDataLoading,
    TmPage,
    TextBlock,
    Bech32
  },
  props: {
    proposalId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    num,
    lastVote: undefined
  }),
  computed: {
    ...mapGetters([
      `depositDenom`,
      `proposals`,
      `connected`,
      `wallet`,
      `votes`,
      `governanceParameters`,
      `session`,
      `governanceParameters`
    ]),
    minimumDeposit() {
      const coin = num.createDisplayCoin(
        this.governanceParameters.parameters.deposit.min_deposit[0]
      )
      return `${coin.amount} ${coin.denom}`
    },
    proposal({ proposals, proposalId } = this) {
      return proposals.proposals[proposalId]
    },
    title({ proposal } = this) {
      return proposal.proposal_content.value.title
    },
    description({ proposal } = this) {
      return proposal.proposal_content.value.description
    },
    fundingCycle({ proposal } = this) {
      return proposal.proposal_content.value.funding_cycle
    },
    submittedAgo({ proposal } = this) {
      return moment
        .utc(new Date(proposal.submit_time))
        .format(`MMM Do YYYY, HH:mm:ssa z`)
    },
    endDate({ proposal } = this) {
      return moment
        .utc(proposal.voting_end_time)
        .format("MMM Do YYYY, HH:mm:ssa z")
    },
    displayEndDate({ proposal, governanceParameters } = this) {
      if (
        proposal.proposal_status !== "DepositPeriod" &&
        proposal.total_deposit[0].amount >=
          Number(governanceParameters.parameters.deposit.min_deposit[0].amount)
      ) {
        return true
      } else {
        return false
      }
    },
    votingStartedAgo({ proposal } = this) {
      return moment
        .utc(new Date(proposal.voting_start_time))
        .format(`MMM Do YYYY, HH:mm:ssa z`)
    },
    proposalStatus({ proposal, depositEndsIn, votingStartedAgo } = this) {
      if (proposal.proposal_status === "DepositPeriod") {
        return `Deposit period ends at ${depositEndsIn}`
      } else if (proposal.proposal_status === "VotingPeriod") {
        return `Voting started at ${votingStartedAgo}`
      } else if (proposal.proposal_status === "Rejected") {
        return "Rejected"
      } else if (proposal.proposal_status === "Passed") {
        return "Passed"
      } else {
        return false
      }
    },
    depositEndsIn({ proposal } = this) {
      return moment
        .utc(new Date(proposal.deposit_end_time))
        .format(`MMM Do YYYY, HH:mm:ssa z`)
    },
    totalVotes({ tally: { yes, no, no_with_veto, abstain } } = this) {
      return BigNumber(yes)
        .plus(no)
        .plus(no_with_veto)
        .plus(abstain)
        .toNumber()
    },
    yesPercentage({ tally, totalVotes } = this) {
      return num.percentInt(totalVotes === 0 ? 0 : tally.yes / totalVotes)
    },
    noPercentage({ tally, totalVotes } = this) {
      return num.percentInt(totalVotes === 0 ? 0 : tally.no / totalVotes)
    },
    noWithVetoPercentage({ tally, totalVotes } = this) {
      return num.percentInt(
        totalVotes === 0 ? 0 : tally.no_with_veto / totalVotes
      )
    },
    abstainPercentage({ tally, totalVotes } = this) {
      return num.percentInt(totalVotes === 0 ? 0 : tally.abstain / totalVotes)
    },
    tally({ proposals, proposalId } = this) {
      const { yes, no, abstain, no_with_veto } =
        proposals.tallies[proposalId] || {}
      return {
        yes: yes || BigNumber(0),
        no: no || BigNumber(0),
        abstain: abstain || BigNumber(0),
        no_with_veto: no_with_veto || BigNumber(0)
      }
    },
    status({ proposal } = this) {
      if (proposal.proposal_status === `Passed`)
        return {
          message: `This proposal has passed`
        }
      if (proposal.proposal_status === `Rejected`)
        return {
          message: `This proposal has been rejected and voting is closed`,
          color: `red`
        }
      if (proposal.proposal_status === `DepositPeriod`)
        return {
          message: `Deposits are open for this proposal`,
          color: `yellow`
        }
      if (proposal.proposal_status === `VotingPeriod`)
        return {
          message: `Voting for this proposal is open`,
          color: `green`
        }
      else
        return {
          message: `There was an error determining the status of this proposal.`,
          color: `grey`
        }
    },
    totalDeposit() {
      return this.proposal.total_deposit
        ? num.createDisplayCoin(this.proposal.total_deposit[0])
        : null
    },
    requestedFund() {
      return this.proposal.proposal_content.value.requested_fund
        ? num.createDisplayCoin(
            this.proposal.proposal_content.value.requested_fund[0]
          )
        : null
    }
  },
  async mounted(
    { proposals, proposalId, governanceParameters, $store } = this
  ) {
    if (!proposals[proposalId]) {
      $store.dispatch(`getProposal`, proposalId)
    }
    if (!governanceParameters.loaded) {
      $store.dispatch(`getGovParameters`)
    }
  },
  methods: {
    async onVote({ $refs, $store, votes, proposalId, wallet } = this) {
      $refs.modalVote.open()
      // The error is already handled with notifyError in votes.js
      await $store.dispatch(`getProposalVotes`, proposalId)
      this.lastVote =
        votes[proposalId] &&
        votes[proposalId].find(e => e.voter === wallet.address)
    },
    onDeposit() {
      this.$refs.modalDeposit.open()
    }
  }
}
</script>
<style>
.proposal-details {
  background: #1c203e;
  padding: 1.5rem 1rem;
}
.proposal-details .data-table__row__info__container__name {
  color: white;
  font-size: 1.3rem;
  letter-spacing: 1px;
}
.show-status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.show-status .st-view {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffba00;
  padding: 0.3rem 0.5rem;
  border-radius: 25px;
  color: #ffba00;
  font-size: 10px;
}
.show-status span {
  background: #ffba00;
  width: 7px;
  height: 7px;
  border-radius: 50px;
  margin: 0 0.3rem 0 0;
}
.proposedby {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  padding: 0 0 1rem;
  border-bottom: 1px solid #3c466c;
}
.prop-link {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 30%;
}
.deposit-count {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.deposit-count span {
  font-weight: 600;
  margin: 0 0 0 0.5rem;
}
.btnContainer {
  display: flex;
  justify-content: flex-start;
}
.deposit-vote {
  padding: 2rem 0;
  border-bottom: 1px solid #3c466c;
}
.prop-values {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  padding: 2rem 0;
  border-bottom: 1px solid #3c466c;
}
.list-item {
  padding: 0.3rem 0.7rem 0.3rem;
  width: 27%;
  border-right: 1px solid #3c466c;
  min-height: 90px;
}
.list-item:last-child {
  border-right: none;
}
.list-item:first-child {
  padding: 0.3rem 0.7rem 0.3rem;
  width: 19%;
}
.prop-values h6 {
  font-size: 1rem;
  font-weight: 600;
  color: #848688;
  margin: 0 0 0.5rem;
}
.prop-desc {
  padding: 2rem 0;
}
.prop-desc h4 {
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  margin: 0 0 1rem;
}
.prop-desc p {
  font-size: 16px;
  font-weight: 300;
  color: white;
  text-align: justify;
}
/* .proposal-id {
  display: block;
  background: var(--app-nav);
  height: 8rem;
  width: 9rem;
  margin: 1rem 2rem 1rem 1rem;
  padding: 1rem;
  font-style: italic;
}

.description {
  text-align: left;
}

.descriptionalignment {
  white-space: pre-wrap;
  color: black !important;
  font-weight: 300 !important;
  font-size: 14px !important;
}

.descriptionheading {
  margin-left: 0.5rem;
}

.buttoncss {
  display: block;
}

.marginbottom {
  margin-bottom: 3rem !important;
} */
@media (max-width: 850px) {
  .prop-values {
    flex-wrap: wrap;
  }
  .list-item:first-child,
  .list-item {
    width: 50%;
    border-bottom: 1px solid #3c466c;
  }
  .list-item:nth-child(2) {
    width: 50%;
    border-bottom: 1px solid #3c466c;
    border-right: none;
  }
  .list-item:nth-child(3) {
    width: 50%;
    border-bottom: none;
    border-right:  1px solid #3c466c;
  }
   .list-item:last-child {
    width: 50%;
    border-bottom: none;
    border-right:  none;
  }
  
  .list-item {
    width: 50%;
    padding: 1rem 1.5rem !important;
  }
}

@media (max-width: 767px) {
  .btnContainer {
    margin: 0 0 1rem;
  }
}

@media (max-width: 575px) {
  .proposal-details {
    padding: 0;
  }
  .proposedby {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .btnContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .btnContainer .tm-btn {
    margin: 0 0.5rem 1rem !important;
  }
  .deposit-count {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .deposit-count p,
  .deposit-count span {
    width: 100%;
    margin: 0;
  }
}
@media (max-width: 480px) {
  .list-item:first-child,
  .list-item:nth-child(2),
  .list-item:nth-child(3),
  .list-item {
    width: 100% !important;
    border-right: none !important;
    border-bottom: 1px solid #3c466c;
    min-height: auto;
    padding: 1rem 0 !important;
  }
  .list-item:last-child {
    border-bottom: none; 
  }
  .prop-link{
    width: 100%;
  }
}
</style>
