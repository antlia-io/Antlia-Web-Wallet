<template>
  <SessionFrame>
    <div class="session-container">
      <h2 class="session-title">
        Use Color Wallet Browser Extension
      </h2>
      <div v-if="!extension.enabled" class="session-main">
        <p>
          Please install the Color Wallet Browser Extension from the
          <a
            href="https://chrome.google.com/webstore/category/extensions"
            target="_blank"
            rel="noopener norefferer"
            >Chrome Web Store</a
          >.
        </p>
      </div>

      <div v-else class="session-main">
        Below is a list of accounts we received from the Color Wallet browser
        extension.
        <AccountList
          :accounts="accounts"
          :button-action="signIn"
          :button-text="`Use Account`"
        />
      </div>
    </div>
  </SessionFrame>
</template>

<script>
import AccountList from "common/AccountList"
import SessionFrame from "common/SessionFrame"
import { mapGetters } from "vuex"
export default {
  name: `session-extension`,
  components: {
    AccountList,
    SessionFrame
  },
  data: () => ({
    connectionError: null,
    address: null
  }),
  computed: {
    ...mapGetters([`extension`]),
    accounts() {
      return this.extension.accounts
    }
  },
  mounted() {
    this.getAddressesFromExtension()
  },
  methods: {
    getAddressesFromExtension() {
      this.$store.dispatch("getAddressesFromExtension")
    },
    async signIn(address) {
      this.$store.dispatch(`signIn`, {
        sessionType: `extension`,
        address: address
      })
        if(localStorage.getItem(`qraddress`) !== "undefined" && localStorage.getItem(`qramount`)==="undefined")
        {
          this.$router.push(`/send`)
        }
        else if (localStorage.getItem(`qramount`) !== "undefined")
        {
          localStorage.getItem(`qraddress`) && this.$router.push(`/sendAmount`)
        }
        else if (localStorage.getItem(`qramount`)==="undefined" && localStorage.getItem(`qraddress`)==="undefined")
        {  
          this.$router.push(`/`)
        }
    }
  }
}
</script>
