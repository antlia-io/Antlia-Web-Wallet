<template>
<div>

  <!-- <div class="table-proposal">
    <table class="data-table table-responsive">
      <thead>
        <PanelSort :sort="sort" :properties="properties" />
      </thead>
      <tbody> -->
        <LiProposal
          v-for="(value, key) in filteredProposals"
          :key="key"
          :proposal="value"
        />
      <!-- </tbody>
    </table>
  </div> -->
</div>
</template>

<script>
import { mapGetters } from "vuex"
import orderBy from "lodash.orderby"
import LiProposal from "./LiProposal"
import PanelSort from "staking/PanelSort"
export default {
  name: `table-proposals`,
  components: {
    LiProposal,
    PanelSort
  },
  props: {
    proposals: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    query: ``,
    sort: {
      property: `id`,
      order: `desc`
    }
  }),
  computed: {
    ...mapGetters([`session`]),
    enrichedProposals() {
      const copy = JSON.parse(JSON.stringify(this.proposals))
      Object.keys(copy).forEach(proposal_id => {
        copy[proposal_id].id = Number(proposal_id)
      })
      return copy
    },
    filteredProposals() {
      const proposals = orderBy(
        this.enrichedProposals,
        [this.sort.property],
        [this.sort.order]
      )

      return proposals
    },
    properties() {
      return [
        {
          title: `Title`,
          value: `title`,
          tooltip: `The title of the proposal`,
          class: `proposal_title`
        },
        {
          title: `Proposal Id`,
          value: `id`,
          tooltip: `Id of the proposal`,
          class: `proposal_id`
        },
        {
          title: `Yes`,
          value: `tally_result.yes`,
          tooltip: `Yes votes`,
          class: `yes_votes`
        },
        {
          title: `No`,
          value: `tally_result.no`,
          tooltip: `No votes`,
          class: `no_votes`
        },
        // {
        //   title: `No with Veto`,
        //   value: `tally_result.no_with_veto`,
        //   tooltip: `No with veto votes`,
        //   class: `no_veto_votes`
        // },
        {
          title: `Abstain`,
          value: `tally_result.abstain`,
          tooltip: `Abstain votes`,
          class: `abstain_votes`
        },
        {
          title: `Requested Fund`,
          value: `requested_fund`,
          tooltip: `Requested Fund`,
          class: `requested_fund`
        },
        {
          title: `Funding Cycle`,
          value: `funding_cycle`,
          tooltip: `Funding Cycle`,
          class: `funding_cycle`
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch(`getProposals`)
  }
}
</script>
<style>
  @media screen and (min-width: 838px) {
  .table-responsive {
    display: inline-table;
  }
}
</style>