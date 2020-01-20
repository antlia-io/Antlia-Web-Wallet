<template>
<div>
<div class="proposal-item">
  <div class="row ptb">
    <div class="col-lg-8 col-md-8 col-sm-9 col-xs-12">
        <router-link
          :to="{
            name: 'Proposal',
            params: { proposalId: proposal.proposal_id }
          }"
          class="data-table__row__info__container__name"
        >
          {{ proposal.proposal_content.value.title }}
        </router-link>
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
    <div class="col-lg-12">
        <p>{{ description }}</p>
    </div>
    <div class="col-lg-4">
         <router-link
          :to="{
            name: 'Proposal',
            params: { proposalId: proposal.proposal_id }
          }"
           class="full-proposal">Full Proposal</router-link>
    </div>
  </div>
</div>
  <!-- <tr class="data-table__row li-proposal">
    <td class="data-table__row__info">
      <div class="data-table__row__info__container">
        <span
          v-if="proposal.proposal_status === `Passed`"
          v-tooltip.top="status.message"
          :class="status.color"
          class="data-table__row__info__container__status material-icons"
        >
          checkmark
        </span>
        <span
          v-else
          v-tooltip.top="status.message"
          :class="status.color"
          class="data-table__row__info__container__status"
        />
        <router-link
          :to="{
            name: 'Proposal',
            params: { proposalId: proposal.proposal_id }
          }"
          class="data-table__row__info__container__name"
        >
          {{ proposal.proposal_content.value.title }}
        </router-link>
        <p class="data-table__row__info__container__description">
          {{ description }}
        </p>
      </div>
    </td>
    <td>{{ `#` + proposal.proposal_id }}</td>
    <td class="li-proposal__value yes">
      <span v-if="roundedPercentagesTally.yes == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.yes | prettyDecimals }}%</span>
    </td>
    <td class="li-proposal__value no">
      <span v-if="roundedPercentagesTally.no == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.no | prettyDecimals }}%</span>
    </td>
    <td class="li-proposal__value no_with_veto">
      {{ roundedPercentagesTally.no_with_veto | prettyDecimals }}%
    </td>
    <td class="li-proposal__value abstain">
      <span v-if="roundedPercentagesTally.abstain == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.abstain | prettyDecimals }}%</span>
    </td>
    <td class="requestedFund">
      {{ num.fullDecimals(num.atoms(proposal.proposal_content.value.requested_fund[0].amount)) }}
    </td>
    <td class="fundingCycle">
      {{ proposal.proposal_content.value.funding_cycle }}
    </td>
  </tr> -->
</div>
</template>

<script>
import BigNumber from "bignumber.js"
import { mapGetters } from "vuex"
import { roundObjectPercentages } from "../../utils"
import { prettyDecimals } from "../../scripts/num"
import num from "scripts/num"
export default {
  name: `li-proposal`,
  filters: {
    prettyDecimals
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    num,
  }),
  computed: {
    ...mapGetters([`proposals`]),
    tally() {
      const { yes, no, abstain } =
        this.proposals.tallies[this.proposal.proposal_id] || {}

      const totalVotes = BigNumber(yes)
        .plus(no)
        .plus(abstain)
        .toNumber()
        // .plus(no_with_veto)
      const totalMult = totalVotes / 100
      return {
        yes: yes / totalMult || BigNumber(0),
        no: no / totalMult || BigNumber(0),
        abstain: abstain / totalMult || BigNumber(0),
        // no_with_veto: no_with_veto / totalMult || BigNumber(0)
      }
    },
    roundedPercentagesTally() {
      return roundObjectPercentages(this.tally)
    },
    isDepositPeriod() {
      return this.proposal.proposal_status === `DepositPeriod`
    },
    status() {
      switch (this.proposal.proposal_status) {
        case `Passed`:
          return {
            message: `This proposal has passed`
          }
        case `Rejected`:
          return {
            message: `This proposal has been rejected and voting is closed`,
            color: `red`
          }
        case `DepositPeriod`:
          return {
            message: `Deposits are open for this proposal`,
            color: `yellow`
          }
        case `VotingPeriod`:
          return {
            message: `Voting for this proposal is open`,
            color: `green`
          }
        default:
          return {
            message: `There was an error determining the status of this proposal.`,
            color: `grey`
          }
      }
    },
    description() {
      const { description } = this.proposal.proposal_content.value
      return description.length > 100
        ? description.substring(0, 100) + `…`
        : description.substring(0, 100)
    }
  }
}
</script>

<style>
.data-table__row__info__container__status.material-icons {
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  top: 4px;
  left: -4px;
  color: var(--success);
  background: none;
}
.header{
  padding: 1rem 0;
}
.proposal-item {
    padding: 1.5rem 1rem;
    background: #1c203e;
    margin: 1rem 0;
    width: 100%;
}
.proposal-item .data-table__row__info__container__name{
    color: white;
    font-size: 1.3rem;
    letter-spacing: 1px;
}
.show-status{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.show-status .st-view{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px  solid #ffba00;
  padding: .3rem 0.5rem;
  border-radius: 25px;
  color: #ffba00;
  font-size: 10px;
}
.show-status span{
  background: #ffba00;
  width: 7px;
  height: 7px;
  border-radius: 50px;
  margin: 0 0.3rem 0 0;
}
.full-proposal{
  background: #004bff;
  border-radius: 5px;
  padding: 0.5rem 0.7rem;
  color: white;
  text-transform: uppercase;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  text-align: center
}
@media(max-width: 575px){
  .proposal-item{
    padding: 0;
  }
}
</style>
