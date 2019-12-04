<template>
  <SessionFrame>
    <TmFormStruct :submit="onSubmit">
      <h2 class="session-title">
        Explore with any address
      </h2>
      <div class="session-main">
        <TmFormGroup field-id="sign-in-name" field-label="Color Public Address"> 
          <TmField
            v-model="address"
            type="text"
            placeholder="Enter Color Public Address"
            vue-focus="vue-focus"
            style="color: black"
          />
          <TmFormMsg
            v-if="$v.address.$error && !$v.address.required"
            name="Color Address"
            type="required"
          />
          <TmFormMsg
            v-else-if="$v.address.$error && !$v.address.bech32Validate"
            name="Your Color Address"
            type="bech32"
          />
        </TmFormGroup>
      </div>
      <div class="session-footer">
        <TmBtn value="Explore" />
      </div>
    </TmFormStruct>
  </SessionFrame>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import TmBtn from "common/TmBtn"
import SessionFrame from "common/SessionFrame"
import TmFormGroup from "common/TmFormGroup"
import TmFormStruct from "common/TmFormStruct"
import TmField from "common/TmField"
import TmFormMsg from "common/TmFormMsg"
import bech32 from "bech32"
export default {
  name: `session-explore`,
  components: {
    SessionFrame,
    TmBtn,
    TmField,
    TmFormGroup,
    TmFormMsg,
    TmFormStruct
  },
  data: () => ({
    address: ``,
    error: ``
  }),
  mounted() {
    this.address = localStorage.getItem(`prevAddress`)
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$error) return

      this.$store.dispatch(`signIn`, {
        sessionType: `explore`,
        address: this.address
      })
      localStorage.setItem(`prevAddress`, this.address)
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
          this.$router.push(`/wallet`)
        }
    },
    bech32Validate(param) {
      try {
        bech32.decode(param)
        return true
      } catch (error) {
        return false
      }
    }
  },
  validations() {
    return {
      address: { required, bech32Validate: this.bech32Validate }
    }
  }
}
</script>
