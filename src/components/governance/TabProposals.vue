<template>
  <TmDataConnecting v-if="!proposals.loaded && !connected" />
  <TmDataLoading v-else-if="!proposals.loaded && proposals.loading" />
  <TmDataEmpty
    v-else-if="Object.keys(proposals.proposals).length === 0"
    title="No Governance Proposals"
    subtitle="There are currently no governance proposals to display.
    Click the 'Create Proposal' button to submit a proposal."
    icon="account_balance_wallet"
  />
   <TableProposals
    v-else
    :proposals="proposals.proposals"
    :loading="proposals.loading"
  />
</template>

<script>
import TableProposals from "./TableProposals"
import TmDataConnecting from "common/TmDataConnecting"
import TmDataEmpty from "common/TmDataEmpty"
import TmDataLoading from "common/TmDataLoading"
import { mapGetters } from "vuex"
export default {
  name: `tab-proposals`,
  components: {
    TableProposals,
    TmDataConnecting,
    TmDataLoading,
    TmDataEmpty
  },
  computed: {
    ...mapGetters([`proposals`, `connected`])
  },
  mounted() {
    this.$store.dispatch(`getProposals`)
  }
}
</script>
