<template>
  <transition v-if="show" name="slide-fade">
    <div id="verifyModal" class="action-modal" tabindex="0" @keyup.esc="close">
        <div
        id="closeBtn"
        class="action-modal-icon action-modal-close"
        @click="close"
      >
        <i class="material-icons">close</i>
      </div>
      <div class="action-modal-header">
        <span class="action-modal-title">
          Verify
        </span>
      </div>
      <div v-if="step === signStep" class="action-modal-form">
        <TmFormGroup
        :error="$v.message.$error && $v.message.$invalid"
        class="action-modal-form-group"
        field-id="message"
        field-label="Message"
        >
        <TmField
            id="message"
            v-model.number="$v.message.$model"
            v-focus
            type="text"
            placeholder="Message"
            @keyup.enter.native="enterPressed"
        />
        <TmFormMsg
            v-if="$v.message.$error && !$v.message.required"
            name="Message"
            type="required"
        />
        </TmFormGroup>
        
        <TmFormGroup
          :error="$v.key.$error && $v.key.$invalid"
          class="action-modal-form-group"
          field-id="key"
          field-label="Signed Message"
        >
          <TmField
            id="key"
            v-model="$v.key.$model"
            type="text"
            ref="key"
            placeholder="Signed Message"
            @keyup.enter.native="enterPressed"
          />
          <TmFormMsg
            v-if="$v.key.$error && !$v.key.required"
            name="Signed Message"
            type="required"
          />
        </TmFormGroup>


         <TmFormGroup
          :error="$v.publicKey.$error && $v.publicKey.$invalid"
          class="action-modal-form-group"
          field-id="publicKey"
          field-label="Public Address"
        >
          <TmField
            id="publicKey"
            type="text"
            v-model.number="$v.publicKey.$model"
            placeholder="Public Address"
            @keyup.enter.native="enterPressed"
          />
          <TmFormMsg
            v-if="$v.publicKey.$error && !$v.publicKey.required"
            name="Public Address"
            type="required"
          />
          <TmFormMsg
            v-else-if="$v.publicKey.$error && !$v.publicKey.bech32Validate"
            name="Address"
            type="bech32"
          />
        </TmFormGroup>
       
      </div>
      <div
        v-else-if="step === successStep"
        class="action-modal-form success-step"
      >
        <TmDataMsg v-if="txHash === true" icon="check">
          <div slot="title">
            Result:
          </div>
          <div slot="subtitle" class="hash">
            Verified
          </div>
        </TmDataMsg>
        <TmDataMsg v-else-if="txHash === false" icon="close">
          <div slot="title">
            Result:
          </div>
          <div slot="subtitle" class="hash">
            Not Verified
          </div>
        </TmDataMsg>
      </div>
      <div v-show="step === signStep" class="action-modal-footer">
        <slot name="action-modal-footer">
          <TmFormGroup
            class="action-modal-group"
          >
            <div>
              <TmBtn
                value="Verify"
                @click.native="validateChangeStep"
                @keyup.enter.native="enterPressed"
              />
            </div>
          </TmFormGroup>
        </slot>
        <p
          v-if="submissionError"
          class="tm-form-msg sm tm-form-msg--error submission-error"
        >
          Invalid Signed Message
          <!-- {{ submissionError }} -->
        </p>
      </div>

    </div>
  </transition>
</template>

<script>
import b32 from "scripts/b32"
import { required, between, decimal, maxLength,requiredIf } from "vuelidate/lib/validators"
import { uatoms, atoms, viewDenom, SMALLEST } from "src/scripts/num.js"
import { mapGetters } from "vuex"
import TmFormGroup from "src/components/common/TmFormGroup"
import HardwareState from "src/components/common/TmHardwareState"
import TmField from "src/components/common/TmField"
import TmFormMsg from "src/components/common/TmFormMsg"
import TmBtn from "src/components/common/TmBtn"
import TmDataMsg from "common/TmDataMsg"
import Steps from "../components/Steps"
import ActionModal from "./ActionModal"
import { track } from "scripts/google-analytics.js"
import config from "src/config"

import ActionManager from "../utils/ActionManager.js"

const signStep = `sign`
const successStep = `success`

export default {
  name: `send-modal`,
  components: {
    TmField,
    TmFormGroup,
    TmFormMsg,
    ActionModal,
    TmBtn,
    HardwareState,
    TmDataMsg,
    Steps
  },
  data: () => ({
    publicKey: ``,
    message: ``,
    key: ``,
    amount: null,
    denom: ``,
    max_memo_characters: 256,
    editMemo: false,
    step: signStep,
    selectedSignMethod: null,
    sending: false,
    submissionError: null,
    show: false,
    actionManager: new ActionManager(),
    txHash: ``,
    signStep,
    successStep
  }),
  computed: {
    ...mapGetters([`wallet`,
     `connected`,
      `session`,
      `bondDenom`,
      `liquidAtoms`,
      `modalContext`,
      `extension`
      ]),
      requiresSignIn() {
      return !this.session.signedIn
    },
     isValidChildForm() {
      // here we trigger the validation of the child form
      if (this.validate) {
        return this.validate()
      }
      return true
    },
    transactionData() {
      return {
        PublicKey: this.publicKey,
        Message: this.message,
        Key: this.key
      }
    },
    notifyMessage() {
      return {
        title: `Successful Send`,
        body: `Successfully sent ${+this.amount} ${viewDenom(this.denom)} to ${
          this.publicKey
        }`
      }
    }
  },
  updated: function() {
    this.actionManager.setContext(this.modalContext || {})
    if (
      (this.title === "Withdraw" || this.step === "fees") &&
      this.$refs.next
    ) {
      this.$refs.next.$el.focus()
    }
  },
  mounted() {
    if (this.denom) {
      this.denom = this.denom
    }
  },
  methods: {
    viewDenom,
    open() {
      this.trackEvent(`event`, `modal`, this.title)
      this.show = true
    },
    close() {
      this.submissionError = null
      this.step = signStep
      this.show = false
      this.sending = false
      this.publicKey= ''
      this.message= ''
      this.key= ''
      // reset form
      this.$v.$reset()
      this.$emit(`close`)
    },
    trackEvent(...args) {
      track(...args)
    },
    bech32Validate(param) {
      try {
        b32.decode(param)
        return true
      } catch (error) {
        return false
      }
    },
    goToSession() {
      this.close()

      this.$router.push(`/welcome`)
    },
    isValidInput(property) {
      this.$v[property].$touch()

      return !this.$v[property].$invalid
    },
    async validateChangeStep() {
      if (this.disabled) return

      // An ActionModal is only the prototype of a parent modal
      switch (this.step) {
        case signStep:
          if (!this.isValidInput(`message`) && !this.isValidInput(`key`) && !this.isValidInput(`publicKey`) ){
            return
          }
          if (this.message === '' || this.key === '' || this.publicKey === '')
          {
            return
          }
          this.sending = true
          await this.submit()
          this.sending = false
          return this.$refs.key.$el.focus()
        default:
          return
      }
    },
     async submit() {
      this.submissionError = null

      const { ...transactionProperties } = this.transactionData
      const feeProperties = {
        Message: this.message,
        PublicKey: this.publicKey,
        PrivateKey: this.key
      }

      try {
        const  hash  = await this.actionManager.verify(
          feeProperties
        )
        this.txHash = hash
        this.onTxIncluded(transactionProperties, feeProperties)
      } catch ({ message }) {
        this.onSendingFailed(message)
      } finally {
        // this.txHash = null
      }
    },
    onTxIncluded(transactionProperties, feeProperties) {
      this.step = successStep
      this.trackEvent(
        `event`,
        `successful-submit`,
        this.title,
        this.selectedSignMethod
      )
    },
    onSendingFailed(message) {
      this.step = signStep
      this.submissionError = `${this.submissionErrorPrefix}: ${message}.`
      this.trackEvent(`event`, `failed-submit`, this.title, message)
    },
    async connectLedger() {
      await this.$store.dispatch(`connectLedgerApp`)
    },
    validateForm() {
      this.$v.$touch()

      return !this.$v.$invalid
    },
    clear() {
      this.$v.$reset()

      this.publicKey = undefined
      this.sending = false
    },
    enterPressed() {
      this.validateChangeStep()
    }
  },
  validations() {
    return {
      publicKey: {
        required,
        bech32Validate: this.bech32Validate
      },
      message: {
        required
      },
      key: {
        required
      }
    }
  }
}
</script>
<style scoped>
#edit-memo-btn {
  display: inline-block;
  height: 58px;
  padding: 12px 0;
  box-sizing: content-box;
  font-size: var(--sm);
}

.hash{
    color: #0a73b1;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
}

.hash:hover {
    color: #00d6e1;}

</style>
