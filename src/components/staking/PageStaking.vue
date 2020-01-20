<template>
  <TmPage class="staking" data-title="Staking" :sendReceive="true">
    <!-- <TabStakingParameters /> -->
    <Tabs v-if="tabs" :tabs="tabs" />
    <router-view />
     <!-- <TmDataEmpty v-if="!session.signedIn"/> -->
  </TmPage>
</template>

<script>
import { mapActions } from "vuex"
import TmPage from "common/TmPage"
import Tabs from "common/Tabs"
// import TmDataEmpty from "common/TmDataEmpty"

export default {
  name: `page-staking`,
  components: { 
    Tabs, 
    TmPage, 
    // TmDataEmpty
    },
  data: () => ({
    query: ``,
    tabs: [
      {
        displayName: `Validators`,
        pathName: `Validators`
      },
      {
        displayName: `My Delegations`,
        pathName: `My Delegations`
      },
       {
        displayName: `Pending Delegations`,
        pathName: `Pending Delegations`
      },
      
    ]
  }),
  methods: {
    ...mapActions([`getDelegates`])
  }
}
</script>
