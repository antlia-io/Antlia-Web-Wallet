<template>
  <SessionFrame>
    <div id="session-existing">
      <h2 class="session-title">Welcome to ANTLIA Wallet</h2>
      <TmFormStruct :submit="onSubmit" class="session-container">
        <div class="session-main" v-if="accountExists && session.insecureMode">
          <TmFormGroup field-id="sign-in-name" field-label="Select Account">
            <TmField
              id="sign-in-name"
              v-model="signInAddress"
              :options="accounts"
              type="select"
              placeholder="Select account…"
              vue-focus="vue-focus"
            />
            <TmFormMsg
              v-if="$v.signInAddress.$error && !$v.signInAddress.required"
              name="Name"
              type="required"
            />
          </TmFormGroup>
          <TmFormGroup
            :error="$v.signInPassword.$error"
            field-id="sign-in-password"
            field-label="Password"
            class="fp-pos"
          >
            <TmField
              id="sign-in-password"
              v-model="signInPassword"
              type="password"
              style="color: black"
            />
            <TmFormMsg
              v-if="$v.signInPassword.$error && !$v.signInPassword.required"
              name="Password"
              type="required"
            />
            <TmFormMsg
              v-if="$v.signInPassword.$error && !$v.signInPassword.minLength"
              name="Password"
              type="minLength"
              min="10"
            />
            <TmFormMsg v-if="error" type="custom" :msg="error" />
            <router-link to="create" class="forgot-btn">Forgot Password?</router-link>
          </TmFormGroup>
          <div class="session-footer">
            <TmBtn value="Login" />
          </div>
        </div>
        <router-link to="create" class="create-new">Create a new Address</router-link>
      </TmFormStruct>

      <div class="session-list">
        <h6>Use an existing address</h6>
        <LiSession
          id="explore-with-address"
          icon="language"
          title="Explore with any address"
          route="explore"
        />
        <LiSession id="use-ledger-nano" icon="vpn_key" title="Use Ledger Nano" route="ledger" />
        <!-- v-if="session.experimentalMode" -->
        <LiSession
          id="use-extension"
          icon="laptop"
          title="Use Color Browser Extension"
          route="extension"
        ></LiSession>
        <LiSession
          v-if="session.insecureMode"
          id="recover-with-backup"
          icon="settings_backup_restore"
          title="Recover with backup code"
          route="recover"
        />
        <!-- <LiSession
          v-if="accountExists && session.insecureMode"
          id="sign-in-with-account"
          icon="lock"
          title="Sign in with account"
          route="login"
        />-->
      </div>
      <div class="term-line">
        <p>By using ANTLIA Wallet, you accept our Terms of Services and Privacy Policy.</p>
      </div>
    </div>
  </SessionFrame>
</template>

<script>
import { mapGetters } from "vuex"
import LiSession from "common/TmLiSession"
import SessionFrame from "common/SessionFrame"
import { required, minLength } from "vuelidate/lib/validators"
import TmBtn from "common/TmBtn"
import TmFormGroup from "common/TmFormGroup"
import TmField from "common/TmField"
import TmFormMsg from "common/TmFormMsg"
import TmFormStruct from "common/TmFormStruct"

export default {
  name: `session-existing`,
  components: {
    SessionFrame,
    LiSession,
    TmBtn,
    TmField,
    TmFormGroup,
    TmFormMsg,
    TmFormStruct
  },
  data: () => ({
    signInAddress: ``,
    signInPassword: ``,
    error: ``
  }),
  computed: {
    ...mapGetters([`session`, `keystore`]),
    accountExists() {
      return this.keystore && this.keystore.accounts.length > 0
    },
    accounts() {
      let accounts = this.keystore.accounts
      return accounts.map(({ name, address }) => ({
        value: address,
        key: name
      }))
    }
  },
  mounted() {
    this.setDefaultAccount(this.accounts)
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$error) return
      const sessionCorrect = await this.$store.dispatch(`testLogin`, {
        password: this.signInPassword,
        address: this.signInAddress
      })
      if (sessionCorrect) {
        this.$store.dispatch(`signIn`, {
          password: this.signInPassword,
          address: this.signInAddress,
          sessionType: "local"
        })
        localStorage.setItem(`prevAccountKey`, this.signInAddress)
        if (
          localStorage.getItem(`qraddress`) !== "undefined" &&
          localStorage.getItem(`qramount`) === "undefined"
        ) {
          this.$router.push(`/send`)
        } else if (localStorage.getItem(`qramount`) !== "undefined") {
          localStorage.getItem(`qraddress`) && this.$router.push(`/sendAmount`)
        } else if (
          localStorage.getItem(`qramount`) === "undefined" &&
          localStorage.getItem(`qraddress`) === "undefined"
        ) {
          this.$router.push(`/`)
        }
      } else {
        this.error = `The provided username or password is wrong.`
      }
    },
    setDefaultAccount() {
      const prevAccountKey = localStorage.getItem(`prevAccountKey`)
      const prevAccountExists = this.accounts.find(
        a => a.value === prevAccountKey
      )

      if (this.accounts.length === 1) {
        this.signInAddress = this.accounts[0].value
      } else if (prevAccountExists) {
        this.signInAddress = prevAccountKey
      }

      if (this.signInAddress) {
        this.$el.querySelector(`#sign-in-password`).focus()
      } else {
        this.$el.querySelector(`#sign-in-name`).focus()
      }
    }
  },
  validations: () => ({
    signInAddress: { required },
    signInPassword: { required, minLength: minLength(10) }
  })
}
</script>
