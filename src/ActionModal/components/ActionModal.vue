<template>
  <transition v-if="show" name="slide-fade">
    <div v-focus-last class="action-modal" tabindex="0" @keyup.esc="close">
      <div :class="step === inclusionStep || step === successStep ?  'send-inner' : 'modal-inner'">
      <div id="closeBtn" class="action-modal-icon action-modal-close" @click="close">
        <i class="material-icons">close</i>
      </div>
      <div class="action-modal-header">
        <div :class="step === feeStep ?  'session-db' : 'session-dn'">
         <a @click="gotostepone" class="session-back" :class="step === feeStep ?  'session-db' : 'session-dn'">
          <i class="material-icons">keyboard_arrow_left</i>
        </a>
        </div>
        <span class="action-modal-title">{{ step === inclusionStep || step === successStep ? "" : step === feeStep ? "Confirmation" : title }}</span>
                <!-- <span class="action-modal-title"> {{ gotostepone ? "Send" && gotosteptwo ? "Confirmation"}}</span> -->
        <Steps
          v-if="[defaultStep, feeStep].includes(step)"
         
        />
         <!-- :steps="['Details', 'Fees', 'Sign']"
          :active-step="step" -->
      </div>
      <div v-if="requiresSignIn" class="action-modal-form">
        <p class="form-message notice">You need to sign in to submit a transaction.</p>
      </div>
      <div v-else-if="step === defaultStep" class="action-modal-form">
        <slot />
      </div>
      <div v-else-if="step === feeStep" class="action-modal-form">
              <!-- <div v-else-if="step === signStep" class="action-modal-form">  -->
        
       
        <!-- <TmFormGroup
          v-if="session.experimentalMode"
          :error="$v.gasPrice.$error && $v.gasPrice.$invalid"
          class="action-modal-group"
          field-id="gasPrice"
          field-label="Gas Price"
        >
          <span class="input-suffix">{{ bondDenom | viewDenom }}</span>
          <TmField
            id="gas-price"
            v-model="gasPrice"
            step="0.000000001"
            type="number"
            min="0"
            readonly
          />
          <TmFormMsg
            v-if="balanceInAtoms === 0"
            :msg="`doesn't have any ${bondDenom}`"
            name="Wallet"
            type="custom"
          />
          <TmFormMsg
            v-else-if="$v.gasPrice.$error && !$v.gasPrice.required"
            name="Gas price"
            type="required"
          />
          <TmFormMsg
            v-else-if="$v.gasPrice.$error && !$v.gasPrice.between"
            :max="$v.gasPrice.$params.between.max"
            :min="0"
            name="Gas price"
            type="between"
          />
        </TmFormGroup> -->
        <TableInvoice
          :amount="Number(amount)"
          :estimated-fee="estimatedFee"
          :bond-denom="bondDenom"
        />
        <TmFormMsg
          v-if="$v.invoiceTotal.$invalid"
          name="Total"
          type="between"
          min="0"
          :max="balanceInAtoms"
        />
        <TmFormGroup
          v-if="signMethods.length > 1"
          class="action-modal-form-group"
          field-id="sign-method"
          field-label="Signing Method"
        >
          <TmField
            id="sign-method"
            v-model="selectedSignMethod"
            :options="signMethods"
            type="select"
          />
        </TmFormGroup>
        <HardwareState
          v-if="selectedSignMethod === SIGN_METHODS.LEDGER"
          :icon="session.browserWithLedgerSupport ? 'usb' : 'info'"
          :loading="!!sending"
        >
          <div v-if="session.browserWithLedgerSupport">
            {{
            sending
            ? `Please verify and sign the transaction on your Ledger`
            : `Please plug in your Ledger&nbsp;Nano and open
            the Color app`
            }}
          </div>
          <div v-else>
            Please use Chrome, Brave, or Opera. Ledger is not supported in this
            browser.
          </div>
        </HardwareState>
        <HardwareState
          v-if="selectedSignMethod === SIGN_METHODS.EXTENSION"
          :icon="session.browserWithLedgerSupport ? 'laptop' : 'info'"
          :loading="!!sending"
        >
          <div v-if="extension.enabled && !sending">
            Please send the transaction to be signed in the Color Browser
            Extension.
          </div>
          <div v-if="extension.enabled && sending">
            Please open the Color Browser Extension, review the details, and
            approve the transaction.
          </div>
          <div v-if="!extension.enabled">
            Please install the Color Browser Extension from the
            <a
              href="https://chrome.google.com/webstore/category/extensions"
              target="_blank"
              rel="noopener norefferer"
            >Chrome Web Store</a>.
          </div>
        </HardwareState>
        <form
          v-else-if="selectedSignMethod === SIGN_METHODS.LOCAL"
          @submit.prevent="validateChangeStep"
        >
           <TmFormGroup
            :error="$v.password.$error && $v.password.$invalid"
            class="action-modal-group"
            field-id="password"
            field-label="Password"
          >
            <TmField
              id="password"
              v-model="password"
              v-focus
              type="password"
              placeholder="Password"
            />
            <TmFormMsg
              v-if="$v.password.$error && !$v.password.required"
              name="Password"
              type="required"
            />
          </TmFormGroup>
          
        </form>
      </div>
      <!-- <div v-else-if="step === signStep" class="action-modal-form">
        <a @click="gotosteptwo" class="session-back">
          <i class="material-icons">keyboard_arrow_left</i>
        </a>
        
      </div> -->
      <div v-else-if="step === inclusionStep" class="action-modal-form inclusion-step">
        <TmDataMsg icon="hourglass_empty">
          <div slot="title">Send and Confirming</div>
          <div slot="subtitle">
            The transaction
            <!--with the hash {{ txHash }}-->
            was successfully signed and sent to the network. Waiting for it to be
            confirmed.
          </div>
        </TmDataMsg>
      </div>
      <div v-else-if="step === successStep" class="action-modal-form success-step">
        <TmDataMsg icon="check">
          <div slot="title">{{ notifyMessage.title }}</div>
          <div slot="subtitle" class="addressbreak">
            {{ notifyMessage.body }}
            <br />
            <br />Block
            <router-link :to="`/blocks/${includedHeight}`">#{{ includedHeight }}</router-link>.
          </div>
        </TmDataMsg>
      </div>
      <div class="action-modal-footer">
        <slot name="action-modal-footer">
          <TmFormGroup
            v-if="[defaultStep, feeStep].includes(step)"
            class="action-modal-group"
          >
            <div>
              <TmBtn
                v-if="requiresSignIn"
                v-focus
                value="Sign In"
                @click.native="goToSession"
                @click.enter.native="goToSession"
              />
              <TmBtn v-else-if="sending" :value="submitButtonCaption" disabled="disabled" />
              <TmBtn v-else-if="!connected" value="Connecting..." disabled="disabled" />
              <TmBtn
                v-else-if="step !== feeStep"
                ref="next"
                value="Confirm"
                :disabled="
                  disabled || (step === feeStep && $v.invoiceTotal.$invalid)
                "
                @click.native="validateChangeStep"
              />
               <TmBtn v-else value="Send" @click.native="validateChangeStep" />
              
              <!-- :disabled="!session.browserWithLedgerSupport" -->
            </div>
          </TmFormGroup>
        </slot>
        <p
          v-if="submissionError"
          class="tm-form-msg sm tm-form-msg--error submission-error"
        >{{ submissionError }}</p>
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
import HardwareState from "src/components/common/TmHardwareState"
import TmBtn from "src/components/common/TmBtn"
import TmField from "src/components/common/TmField"
import TmFormGroup from "src/components/common/TmFormGroup"
import TmFormMsg from "src/components/common/TmFormMsg"
import TmDataMsg from "common/TmDataMsg"
import TableInvoice from "./TableInvoice"
import Steps from "./Steps"
import { mapGetters } from "vuex"
import { atoms, viewDenom } from "src/scripts/num.js"
import { between, requiredIf } from "vuelidate/lib/validators"
import { track } from "scripts/google-analytics.js"
import config from "src/config"

import ActionManager from "../utils/ActionManager.js"

const defaultStep = `details`
const feeStep = `fees`
// const signStep = `sign`
const inclusionStep = `send`
const successStep = `success`

const SIGN_METHODS = {
  LOCAL: `local`,
  LEDGER: `ledger`,
  EXTENSION: `extension`
}

const signMethodOptions = {
  LEDGER: {
    key: `Ledger Nano`,
    value: SIGN_METHODS.LEDGER
  },
  EXTENSION: {
    key: `Color Browser Extension`,
    value: SIGN_METHODS.EXTENSION
  },
  LOCAL: {
    key: `Local Account (Unsafe)`,
    value: SIGN_METHODS.LOCAL
  }
}

const sessionType = {
  EXPLORE: "explore",
  LOCAL: SIGN_METHODS.LOCAL,
  LEDGER: SIGN_METHODS.LEDGER,
  EXTENSION: SIGN_METHODS.EXTENSION
}

export default {
  name: `action-modal`,
  components: {
    HardwareState,
    TmBtn,
    TmField,
    TmFormGroup,
    TmFormMsg,
    TmDataMsg,
    TableInvoice,
    Steps
  },
  filters: {
    viewDenom
  },
  props: {
    title: {
      type: String,
      required: true
    },
    validate: {
      type: Function,
      default: undefined
    },
    submissionErrorPrefix: {
      type: String,
      default: `Transaction failed`
    },
    amount: {
      type: [String, Number],
      default: `0`
    },
    transactionData: {
      type: Object,
      default: () => {}
    },
    notifyMessage: {
      type: Object,
      default: () => ({
        title: `Successful transaction`,
        body: `You have successfully completed a transaction.`
      })
    },
    // disable proceeding from the first page
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    step: defaultStep,
    selectedSignMethod: null,
    password: null,
    sending: false,
    gasEstimate: null,
    gasPrice: config.default_gas_price.toFixed(9),
    submissionError: null,
    show: false,
    actionManager: new ActionManager(),
    txHash: null,
    defaultStep,
    feeStep,
    // signStep,
    inclusionStep,
    successStep,
    SIGN_METHODS
  }),
  computed: {
    ...mapGetters([
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
    balanceInAtoms() {
      return atoms(this.liquidAtoms)
    },
    estimatedFee() {
      return Number(this.gasPrice) * Number(this.gasEstimate) // already in clr
    },
    invoiceTotal() {
      return (
        Number(this.amount) + Number(this.gasPrice) * Number(this.gasEstimate)
      )
    },
    isValidChildForm() {
      // here we trigger the validation of the child form
      if (this.validate) {
        return this.validate()
      }
      return true
    },
    signMethods() {
      let signMethods = []
      if (this.session.sessionType === sessionType.EXPLORE) {
        signMethods.push(signMethodOptions.LEDGER)
        signMethods.push(signMethodOptions.EXTENSION)
      } else if (this.session.sessionType === sessionType.LEDGER) {
        signMethods.push(signMethodOptions.LEDGER)
      } else if (this.session.sessionType === sessionType.EXTENSION) {
        signMethods.push(signMethodOptions.EXTENSION)
      } else {
        signMethods.push(signMethodOptions.LOCAL)
      }
      return signMethods
    },
    submitButtonCaption() {
      switch (this.selectedSignMethod) {
        case "ledger":
          return `Waiting for Ledger`
        case "extension":
          return `Waiting for Extension`
        default:
          return "Sending..."
      }
    }
  },
  watch: {
    // if there is only one sign method, preselect it
    signMethods: {
      immediate: true,
      handler(signMethods) {
        if (signMethods.length === 1) {
          this.selectedSignMethod = signMethods[0].value
        }
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
  methods: {
    open() {
      this.trackEvent(`event`, `modal`, this.title)
      this.gasPrice = config.default_gas_price.toFixed(9)
      this.show = true
    },
    close() {
      this.submissionError = null
      this.password = null
      this.step = defaultStep
      this.show = false
      this.sending = false
      this.includedHeight = undefined

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
        case defaultStep:
          if (!this.isValidChildForm) {
            return
          }
          this.sending = true
          await this.simulate() // simulate to get gas estimation
          this.sending = false
          return
        case feeStep:
          if (!this.isValidInput(`gasPrice`)) {
            return
          }
          if (!this.isValidInput(`invoiceTotal`)) {
            return
          }
          if (!this.isValidInput(`password`)) {
            return
          }
          // submit transaction
          this.sending = true
          await this.submit()
          this.sending = false
          return

          // this.step = signStep
          // return
        // case signStep:
        //   if (!this.isValidInput(`password`)) {
        //     return
        //   }
        //   // submit transaction
        //   this.sending = true
        //   await this.submit()
        //   this.sending = false
        //   return
        default:
          return
      }
    },
    async simulate() {
      const { type, memo, ...properties } = this.transactionData
      this.actionManager.setMessage(type, properties)
      try {
        this.gasEstimate = await this.actionManager.simulate(memo)
        this.step = feeStep
      } catch ({ message }) {
        if (message.includes("insufficient")) {
          // ${this.submissionErrorPrefix}:
          this.submissionError = `Insufficient Fees`
        } else {
          this.submissionError = `${message}`
        }
      }

      // limit fees to the maximum the user has
      if (this.invoiceTotal > this.balanceInAtoms) {
        this.gasPrice =
          (this.balanceInAtoms - Number(this.amount)) / this.gasEstimate
      }
    },
    async submit() {
      this.submissionError = null
      this.trackEvent(`event`, `submit`, this.title, this.selectedSignMethod)

      if (this.selectedSignMethod === SIGN_METHODS.LEDGER) {
        try {
          await this.connectLedger()
        } catch (error) {
          // ${this.submissionErrorPrefix}:
          this.submissionError = `${error.message}.`
          this.sending = false
          return
        }
      }

      const { type, memo, ...transactionProperties } = this.transactionData

      const gasPrice = {
        amount: this.gasPrice,
        denom: this.bondDenom
      }

      const feeProperties = {
        gasEstimate: this.gasEstimate,
        gasPrice: gasPrice,
        submitType: this.selectedSignMethod,
        password: this.password
      }

      try {
        const { included, hash } = await this.actionManager.send(
          memo,
          feeProperties
        )
        this.txHash = hash
        await this.waitForInclusion(included)
        this.onTxIncluded(type, transactionProperties, feeProperties)
      } catch ({ message }) {
        this.onSendingFailed(message)
      } finally {
        this.txHash = null
      }
    },
    async waitForInclusion(includedFn) {
      this.step = inclusionStep
      const { height } = await includedFn()
      this.includedHeight = height
    },
    onTxIncluded(txType, transactionProperties, feeProperties) {
      this.step = successStep
      this.trackEvent(
        `event`,
        `successful-submit`,
        this.title,
        this.selectedSignMethod
      )
      this.$store.dispatch(`post${txType}`, {
        txProps: transactionProperties,
        txMeta: feeProperties
      })
    },
    onSendingFailed(message) {
      this.step = feeStep
      // ${this.submissionErrorPrefix}:
      this.submissionError = `${message}.`
      this.trackEvent(`event`, `failed-submit`, this.title, message)
    },
    async connectLedger() {
      await this.$store.dispatch(`connectLedgerApp`)
    },
    gotostepone() {
      this.step = defaultStep
      this.gasPrice = config.default_gas_price.toFixed(9)
      this.submissionError = null
    },
    gotosteptwo() {
      this.step = feeStep
      this.submissionError = null
    }
  },
  validations() {
    return {
      password: {
        required: requiredIf(
          () =>
            this.selectedSignMethod === SIGN_METHODS.LOCAL &&
            this.step === feeStep
        )
      },
      gasPrice: {
        required: requiredIf(
          () => this.step === feeStep && this.session.experimentalMode
        ),
        // we don't use SMALLEST as min gas price because it can be a fraction of uclr
        // min is 0 because we support sending 0 fees
        between: between(0, this.balanceInAtoms)
      },
      invoiceTotal: {
        between: between(0, this.balanceInAtoms)
      }
    }
  }
}
</script>

<style>
/* .action-modal {
  background: #fff;
  display: flex;
  flex-direction: column;
  right: 1rem;
  padding: 4rem 5rem;
  position: fixed;
  left: 25%;
  width: 100%;
  max-width: 630px;
  min-height: 400px;
  z-index: var(--z-modal);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(200, 200, 200, 0.1);
} */
.action-modal {
  background: #000000bf;
  display: flex;
  flex-direction: column;
  padding: 4rem 5rem;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* max-width: 630px; */
  min-height: 400px;
  z-index: var(--z-modal);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(200, 200, 200, 0.1);
}
.modal-inner {
    position: absolute;
    top: 10%;
    left: 25%;
    background: #fff;
    width: 100%;
    max-width: 660px;
    padding: 5rem;
    border-radius: 5px;
}
.send-inner {
    position: absolute;
    top: 10%;
    left: 25%;
    background: #fff;
    width: 100%;
    max-width: 660px;
    padding: 0;
    border-radius: 5px;
}

.action-modal:focus {
  outline: none;
}

.action-modal-header {
  align-items: center;
  justify-content: flex-start;
  display: flex;
}

.action-modal-title {
  flex: 1;
  font-size: var(--h2);
  font-weight: 600;
  color: #000847;
  text-align: left;
}

.action-modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-modal-icon i {
  font-size: var(--lg);
  color: var(--link);
  font-weight: 600;
}

.action-modal-icon.action-modal-close {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  border: 2px solid #c7c7c7;
  padding: 5px;
  border-radius: 50px;
}

.action-modal-icon.action-modal-close:hover i {
  color: var(--link);
}

.stepsbutton {
  background-color: #542d82 !important;
}

.action-modal-form .tm-form-group {
  display: block;
  padding: 0.25rem 0;
}

.action-modal-footer {
  display: flex;
  /* keeps button in bottom right no matter the size of the action modal */
  /* flex-grow: 1; */
  /* align-self: flex-end; */
  flex-direction: column;
  margin: 0;
  width: 100%;
}

@media screen and (max-width: 480px) {
  #delegation-modal .action-modal-footer {
    margin: 2.5rem 0 0 0;
  }
}

.submission-error {
  position: absolute;
  left: 1.5rem;
  bottom: 1rem;
}

.form-message {
  font-size: var(--sm);
  font-weight: 500;
  font-style: italic;
  color: red;
  display: inline-block;
}

#modal-propose .addressbreak {
  word-break: break-word;
}

#modal-vote .addressbreak {
  word-break: break-word;
}

.addressbreak {
  word-break: break-all;
}

.form-message.notice {
  border-radius: 2px;
  font-weight: 300;
  margin: 2rem 0;
  font-size: 1rem;
  font-style: normal;
  width: 100%;
  color: #848688;
}

.slide-fade-enter-active {
  transition: all 0.1s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(2rem);
  opacity: 0;
}

@media screen and (max-width: 767px) {
  .tm-form-group__field {
    width: 100%;
  }
}

@media screen and (max-width: 667px) {
  .row {
    flex-direction: column;
  }

  .action-modal {
    right: 0;
    bottom: unset;
    top: 0;
  }
}
</style>
