<template>
  <TmPage class="governance" data-title="Governance">
    <TabParameters />
    <!-- <div class="row buttoncenter">
      <TmBtn
        id="propose-btn"
        slot="header-buttons"
        :disabled="!connected || !session.signedIn"
        :value="connected ? 'Create Proposal' : 'Connecting...'"
        color="primary"
        @click.native="onPropose"
      />
    </div> -->
    <!-- <Tabs v-if="tabs" :tabs="tabs" /> -->
    <ModalPropose ref="modalPropose" :denom="depositDenom" />
    <router-view />
  </TmPage>
</template>

<script>
import { mapGetters } from "vuex"
import ModalPropose from "src/ActionModal/components/ModalPropose"
import TmBtn from "common/TmBtn"
import TmPage from "common/TmPage"
import TabParameters from "./TabParameters"
import Tabs from "common/Tabs"

export default {
  name: `page-governance`,
  components: {
    ModalPropose,
    TmPage,
    TmBtn,
    TabParameters,
    Tabs
  },
  data: () => ({
    query: ``,
    tabs: [
      {
        displayName: `Proposals`,
        pathName: `Proposals`
      }
    ]
  }),
  computed: {
    ...mapGetters([`proposals`, `depositDenom`, `connected`, `session`])
  },
  methods: {
    onPropose() {
      this.$refs.modalPropose.open()
    }
  }
}
</script>
<style>
.buttoncenter {
  display: block;
  padding: 1rem;
}
</style>
