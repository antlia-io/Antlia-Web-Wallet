<template>
  <div>
    <div class="settings-page">
      <Tabs v-if="tabs" :tabs="tabs" :settings="false" />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Tabs from "common/Tabs"


export default {
  name: `settings`,
  components: {
    Tabs,
  },
  data: () => ({
    query: ``,
    tabs: [
      {
        displayName: `Themes`,
        pathName: `Themes`
      },
      {
        displayName: `Localization`,
        pathName: `Localization`
      },
      {
        displayName: `QR Code Change`,
        pathName: `ChangeQRCode`
      }
    ]
  })
}
</script>
<style scoped>
.settings-page {
  background: #1c203e;
  padding: 1rem 1rem;
  margin: 1rem;
}
</style>

