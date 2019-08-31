<template>
  <TmPage class="staking" data-title="Staking">
    <TabStakingParameters />
    <Tabs v-if="tabs" :tabs="tabs" />
    <router-view />
  </TmPage>
</template>

<script>
import { mapActions } from "vuex"
import TmPage from "common/TmPage"
import TabStakingParameters from "./TabStakingParameters"
import Tabs from "common/Tabs"

export default {
  name: `page-staking`,
  components: { Tabs, TmPage, TabStakingParameters },
  data: () => ({
    query: ``,
    tabs: [
      {
        displayName: `My Delegations`,
        pathName: `My Delegations`
      },
      {
        displayName: `Validators`,
        pathName: `Validators`
      }
    ]
  }),
  methods: {
    ...mapActions([`getDelegates`])
  }
}
</script>
