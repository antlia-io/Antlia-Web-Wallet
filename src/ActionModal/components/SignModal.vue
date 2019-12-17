<template>
  <transition v-if="show" name="slide-fade">
    <div id="signModal" class="action-modal" tabindex="0" @keyup.esc="close">
      <div
        id="closeBtn"
        class="action-modal-icon action-modal-close"
        @click="close"
      >
        <i class="material-icons">close</i>
      </div>
       <div class="action-modal-header">
        <span class="action-modal-title">
          {{ requiresSignIn ? `Sign in required` : 'Sign' }}
        </span>
      </div>
      <div v-if="requiresSignIn" class="action-modal-form">
        <p class="form-message notice">
          You need to sign in to submit a transaction.
        </p>
      </div>
      <div v-else-if="step === signStep" class="action-modal-form">
        <TmFormGroup
        :error="$v.message.$error && $v.message.$invalid"
        class="action-modal-form-group"
        field-id="message"
        field-label="Message"
        >
        <TmField
            id="message"
            ref="message"
            v-model="$v.message.$model"
            v-focus
            type="text"
            placeholder="Message"
            @keyup.enter.native="enterPressed"
        />
        <TmFormMsg
            v-if="$v.message.$error && !$v.message.maxLength"
            :max="$v.message.$params.maxLength.max"
            name="Message"
            type="maxLength"
        />
        <TmFormMsg
            v-if="$v.message.$error && !$v.message.required"
            name="Message"
            type="required"
        />
        </TmFormGroup>
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
              >Chrome Web Store</a
            >.
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
      <div
        v-else-if="step === successStep"
        class="action-modal-form success-step"
      >
        <TmDataMsg icon="check" id="successStep">
          <div slot="title">
            Signed Message:
          </div>
          <div slot="subtitle">
            <div class="displayflex">
              <div class="hash" v-tooltip.top="txHash"
              v-clipboard:copy="txHash"
              v-clipboard:success="() => onCopy()">
              {{txHash}}
              </div>
              <i v-clipboard:copy="txHash"
              v-clipboard:success="() => onCopy()" class="material-icons cursor">collections</i>
              <div :class="{ active: copySuccess }" class="copied">
                <span>Copied</span>
              </div>
            </div>
            <p>Copy above signed message to verify signature</p>
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
                v-if="requiresSignIn"
                v-focus
                value="Sign In"
                @click.native="goToSession"
                @click.enter.native="goToSession"
              />
              <TmBtn
                v-else-if="sending"
                :value="submitButtonCaption"
                disabled="disabled"
              />
              <TmBtn
                v-else-if="!connected"
                value="Connecting..."
                disabled="disabled"
              />
              <TmBtn
                v-else
                value="Sign"
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
          {{ submissionError }}
        </p>
      </div>

    </div>
  </transition>
</template>

<script>
import b32 from "scripts/b32"
import { required, between, decimal, maxLength,requiredIf,minLength } from "vuelidate/lib/validators"
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
import isEmpty from "lodash.isempty"
import trim from "lodash.trim"
import transaction from "../utils/transactionTypes"
import ActionManager from "../utils/ActionManager.js"

const signStep = `sign`
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

const notBlank = text => !isEmpty(trim(text))

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
  props: {
    validate: {
      type: Function,
      default: undefined
    },
  },
  data: () => ({
    messageMaxLength: 64,
    address: ``,
    amount: null,
    message: ``,
    denom: ``,
    max_memo_characters: 256,
    editMemo: false,
    step: signStep,
    selectedSignMethod: null,
    password: null,
    sending: false,
    submissionError: null,
    show: false,
    actionManager: new ActionManager(),
    txHash: ``,
    publicKey: ``,
    copySuccess: false,
    copySuccessPublicKey: false,
    signStep,
    inclusionStep,
    successStep,
    SIGN_METHODS
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
    },
    transactionData() {
      return {
        type: transaction.SIGN,
        Message: this.message
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
  validations() {
    return {
      message: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(this.messageMaxLength),
        notBlank
      },
      password: {
        required: requiredIf(
          () =>
            this.selectedSignMethod === SIGN_METHODS.LOCAL &&
            this.step === signStep
        )
      },
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
    onCopy() {
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 2500)
    },
    onCopyPublicKey(){
      this.copySuccessPublicKey = true
      setTimeout(() => {
        this.copySuccessPublicKey = false
      }, 2500)
    },
    close() {
      this.submissionError = null
      this.password = null
      this.step = signStep
      this.show = false
      this.sending = false
      this.message = ''
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
          if (!this.isValidChildForm) {
            return
          }
          if (!this.isValidInput(`password`) && !this.isValidInput(`message`) ){
            return
          }
          if(this.message === '' && !this.isValidInput(`message`)){
            return
          }
          this.sending = true
          await this.simulate()
          await this.submit()
          this.sending = false
          return
        default:
          return
      }
    },
    async simulate() {
      const { type, ...properties } = this.transactionData
      this.actionManager.setMessage(type, properties)
    },
     async submit() {
      this.submissionError = null
      
      this.trackEvent(`event`, `submit`, this.title, this.selectedSignMethod)

      if (this.selectedSignMethod === SIGN_METHODS.LEDGER) {
        try {
          await this.connectLedger()
        } catch (error) {
          this.submissionError = `${this.submissionErrorPrefix}: ${
            error.message
          }.`
          this.sending = false
          return
        }
      }

     const { type, ...transactionProperties } = this.transactionData

      const feeProperties = {
        submitType: this.selectedSignMethod,
        password: this.password,
        Message: this.message
      }

      try {
        const { hash } = await this.actionManager.sendSign(
          feeProperties
        )
        this.txHash = hash.hash
        this.onTxIncluded(type,transactionProperties, feeProperties)
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
    onTxIncluded(txType,address=this.address, feeProperties) {
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
      this.message = ``
      this.sending = false
    },
    enterPressed() {
      this.validateChangeStep()
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

#successStep p {
  margin-top: 1rem !important;
  font-weight: 300;
  font-size: 14px;
  word-break: break-word;
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

a {
  color: #0a73b1;
}

a:hover {
  color: #00d6e1;
}

.cursor {
  cursor: pointer;
}

.hash:hover {
    color: #00d6e1;}


@media screen and (max-width: 572px) {
  .hash {
    overflow: hidden;
    text-overflow: ellipsis;
}

}
.hash:hover {
  color: #00d6e1;
}

.copied {
  display: flex !important;
  color: black;
  font-size: var(--sm);
  opacity: 0;
  padding-left: 10px;
  transition: opacity 500ms ease;
}

.pubKey {
  font-weight: 400;
  margin-top: 1rem;
  color: #000;
  font-size: var(--h2);
}

.displayflex {
  display: flex
}

.copied.active {
  opacity: 1;
}

.copied i {
  color: var(--success);
  font-size: var(--m);
}
</style>
