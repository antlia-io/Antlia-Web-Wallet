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
            @keyup.enter.native="refocusOnAmount"
        />
        <TmFormMsg
            v-if="$v.message.$error && !$v.message.required"
            name="Address"
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
            v-model.number="$v.key.$model"
            type="text"
            placeholder="Signed Message"
            @keyup.enter.native="refocusOnAmount"
          />
          <TmFormMsg
            v-if="$v.key.$error && !$v.key.required"
            name="Address"
            type="required"
          />
        </TmFormGroup>


         <TmFormGroup
          :error="$v.address.$error && $v.address.$invalid"
          class="action-modal-form-group"
          field-id="address"
          field-label="Public Address"
        >
          <TmField
            id="address"
            v-model.number="$v.address.$model"
            type="text"
            placeholder="Address"
            @keyup.enter.native="refocusOnAmount"
          />
          <TmFormMsg
            v-if="$v.address.$error && !$v.address.required"
            name="Address"
            type="required"
          />
          <TmFormMsg
            v-else-if="$v.address.$error && !$v.address.bech32Validate"
            name="Address"
            type="bech32"
          />
        </TmFormGroup>
       
      </div>
      <div
        v-else-if="step === successStep"
        class="action-modal-form success-step"
      >
        <TmDataMsg icon="check">
          <div slot="title">
            Result:
            <!-- {{ notifyMessage.title }} -->
          </div>
          <div slot="subtitle" class="hash">
            {{txHash}}
            <!-- {{ notifyMessage.body }} <br /><br />
            Block -->
            <!-- <router-link :to="`/blocks/${includedHeight}`"
              >#{{ includedHeight }}</router-link
            >. -->
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
              />
            </div>
          </TmFormGroup>
        </slot>
        <p
          v-if="submissionError"
          class="tm-form-msg sm tm-form-msg--error submission-error"
        >
          {{ submissionError }}
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
// import transaction from "../utils/transactionTypes"
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
    address: ``,
    message: ``,
    key: ``,
    password: `a29kz56789`,
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
        toAddress: this.address,
        Message: this.message,
        Key: this.key,
        password: this.password

      }
    },
    notifyMessage() {
      return {
        title: `Successful Send`,
        body: `Successfully sent ${+this.amount} ${viewDenom(this.denom)} to ${
          this.address
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
      // this.includedHeight = undefined

      // reset form
      this.$v.$reset()
      this.$emit(`close`)
    },
    trackEvent(...args) {
      track(...args)
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
          // submit transaction
          this.sending = true
          // await this.simulate()
          await this.submit()
          this.sending = false
          return
        default:
          return
      }
    },
    // async simulate() {
    //   // const { type, memo, ...properties } = this.transactionData
    //   this.actionManager.setSignMessage(this.address)
    // },
     async submit() {
      this.submissionError = null

      const { ...transactionProperties } = this.transactionData

      const feeProperties = {
        Message: this.message,
        PublicAddress: this.address,
        PrivateKey: this.key,
        password: this.password
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
    
    // async waitForInclusion(includedFn) {
    //   this.step = inclusionStep
    //   const { height } = await includedFn()
    //   this.includedHeight = height
    // },
    onTxIncluded(transactionProperties, feeProperties) {
      this.step = successStep
      this.trackEvent(
        `event`,
        `successful-submit`,
        this.title,
        this.selectedSignMethod
      )
      // this.$store.dispatch(`post${txType}`, {
      //   txProps: transactionProperties,
      //   txMeta: feeProperties
      // })
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

      this.address = undefined
      this.sending = false
    },
    refocusOnAmount() {
      this.$refs.amount.$el.focus()
    }
  },
  validations() {
    return {
      address: {
        required
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
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.hash:hover {
    color: #00d6e1;}

</style>
