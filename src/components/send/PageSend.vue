<template>
  <TmPage
    :managed="true"
    :loading="wallet.loading"
    :loaded="wallet.loaded"
    :error="wallet.error"
    :data-empty="dataEmpty"
    data-title="Wallet"
    :sign-in-required="true"
  >
    <TmDataMsg
      id="account_empty_msg"
      slot="no-data"
      icon="account_balance_wallet"
    >
      <div slot="title">
        Account empty
      </div>
      <div slot="subtitle">
        This account doesn't have anything in it&nbsp;yet.
      </div>
    </TmDataMsg>
    <template slot="managed-body">
      <LiCoin
        v-for="coin in filteredBalances"
        :key="coin.denom"
        :coin="coin"
        class="tm-li-balance"
        @show-modal="showModal"
      />
      <PageTransactions />
    </template>
    <SendModalQRCode ref="sendModalQRCode" />
  </TmPage>
</template>

<script>
import num from "scripts/num"
import { mapGetters, mapActions } from "vuex"
import orderBy from "lodash.orderby"
import LiCoin from "../wallet/LiCoin"
import PageTransactions from "../wallet/PageTransactions"
import SendModalQRCode from "src/ActionModal/components/SendModalQRCode"
import TmPage from "common/TmPage"
import TmDataMsg from "common/TmDataMsg"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    LiCoin,
    PageTransactions,
    TmPage,
    SendModalQRCode
  },
  data: () => ({ num, showSendModalQRCode: false }),
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`, `allTransactions`]),
    dataEmpty() {
      return this.allTransactions.length===0?this.wallet.balances.length === 0:false
    },
    filteredBalances() {
      return orderBy(
        this.wallet.balances,
        [`amount`, balance => num.viewDenom(balance.denom).toLowerCase()],
        [`desc`, `asc`]
      )
    }
  },
  async mounted() {
    this.updateDelegates()
    await this.queryWalletBalances()
  },
  methods: {
    ...mapActions([`updateDelegates`, `queryWalletBalances`]),
    showModal(denomination) {
      this.$refs.sendModalQRCode.open(denomination)
    }
  }
}
</script>


  <!-- <template> <div v-focus-last class="action-modal" tabindex="0" @keyup.esc="close">
      
      <div
        id="closeBtn"
        class="action-modal-icon action-modal-close"
        @click="close"
      >
        <i class="material-icons">close</i>
      </div>
      <div class="action-modal-header">
        <span class="action-modal-title">
          {{ requiresSignIn ? `Sign in required` : 'Send' }}
        </span>
        <Steps
          v-if="[defaultStep, feeStep, signStep].includes(step)"
          :steps="['Details', 'Fees', 'Sign']"
          :active-step="step"
        />
      </div>
      <div v-if="requiresSignIn" class="action-modal-form">
        <p class="form-message notice">
          You need to sign in to submit a transaction.
        </p>
      </div>
      <div v-else-if="step === defaultStep" class="action-modal-form">
    <TmFormGroup
      :error="$v.denom.$dirty && $v.denom.$invalid"
      class="action-modal-form-group"
      field-id="send-denomination"
      field-label="Denomination"
    >
      <TmField
        id="send-denomination"
        :value="bondDenom | viewDenom"
        type="text"
        readonly
      />
      <TmFormMsg
        v-if="$v.denom.$error && !$v.denom.required"
        name="Denomination"
        type="required"
        color="white"
      />
    </TmFormGroup>

    <TmFormGroup
      :error="$v.address.$error && $v.address.$invalid"
      class="action-modal-form-group"
      field-id="send-address"
      field-label="Send To"
    >
      <TmField
        id="send-address"
        :value="getAddress"
        type="text"
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
    <TmFormGroup
      :error="$v.amount.$error && $v.amount.$invalid"
      class="action-modal-form-group"
      field-id="amount"
      field-label="Amount"
    >
      <TmField
        id="amount"
        ref="amount"
        v-model="amount"
        class="tm-field"
        placeholder="Amount"
        type="number"
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="balance === 0"
        :msg="`doesn't have any CLR`"
        name="Wallet"
        type="custom"
      />
      <TmFormMsg
        v-else-if="$v.amount.$error && (!$v.amount.required || amount === 0)"
        name="Amount"
        type="required"
      />
      <TmFormMsg
        v-else-if="$v.amount.$error && !$v.amount.decimal"
        name="Amount"
        type="numeric"
      />
      <TmFormMsg
        v-else-if="$v.amount.$error && !$v.amount.between"
        :max="$v.amount.$params.between.max"
        :min="$v.amount.$params.between.min"
        name="Amount"
        type="between"
      />
    </TmFormGroup>
    <TmBtn
      v-if="editMemo === false"
      id="edit-memo-btn"
      value="Edit Memo"
      :to="''"
      type="link"
      size="sm"
      @click.native="editMemo = true"
    />
    <TmFormGroup
      v-if="editMemo"
      id="memo"
      :error="$v.memo.$error && $v.memo.$invalid"
      class="action-modal-group"
      field-id="memo"
      field-label="Memo"
    >
      <TmField
        id="memo"
        v-model="memo"
        type="text"
        placeholder="Add a description..."
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="$v.memo.$error && !$v.memo.maxLength"
        name="Memo"
        type="maxLength"
        :max="max_memo_characters"
      />
    </TmFormGroup>
    </div>
      <div v-else-if="step === feeStep" class="action-modal-form">
        <a @click="gotostepone">
          <i class="material-icons session-back">arrow_back</i>
        </a>
        <TmFormGroup
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
        </TmFormGroup>
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
      </div>
      <div v-else-if="step === signStep" class="action-modal-form">
        <a @click="gotosteptwo">
          <i class="material-icons session-back">arrow_back</i>
        </a>
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
      <div v-else-if="step === inclusionStep" class="action-modal-form">
        <TmDataMsg icon="hourglass_empty">
          <div slot="title">
            Sent and confirming
          </div>
          <div slot="subtitle">
            The transaction -->
            <!--with the hash {{ txHash }}-->
            <!-- was successfully signed and sent to the network. Waiting for it to be
            confirmed.
          </div>
        </TmDataMsg>
      </div>
      <div
        v-else-if="step === successStep"
        class="action-modal-form success-step"
      >
        <TmDataMsg icon="check">
          <div slot="title">
            {{ notifyMessage.title }}
          </div>
          <div slot="subtitle">
            {{ notifyMessage.body }} <br /><br />
            Block
            <router-link :to="`/blocks/${includedHeight}`"
              >#{{ includedHeight }}</router-link
            >.
          </div>
        </TmDataMsg>
      </div>
      <div class="action-modal-footer">
        <slot name="action-modal-footer">
          <TmFormGroup
            v-if="[defaultStep, feeStep, signStep].includes(step)"
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
                v-else-if="step !== signStep"
                ref="next"
                value="Next"
                :disabled="
                  disabled || (step === feeStep && $v.invoiceTotal.$invalid)
                "
                @click.native="validateChangeStep"
              />
              <TmBtn
                v-else
                value="Send"
                @click.native="validateChangeStep"
              /> -->
              <!-- :disabled="!session.browserWithLedgerSupport" -->
            <!-- </div>
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
</template>

<script>
import b32 from "scripts/b32"
import { required, between, decimal, maxLength ,requiredIf} from "vuelidate/lib/validators"
import { uatoms, atoms, viewDenom, SMALLEST } from "src/scripts/num.js"
import { mapGetters } from "vuex"
import TmFormGroup from "src/components/common/TmFormGroup"
import TmField from "src/components/common/TmField"
import TmFormMsg from "src/components/common/TmFormMsg"
import TmBtn from "src/components/common/TmBtn"
import transaction from "../../ActionModal/utils/transactionTypes"

import HardwareState from "src/components/common/TmHardwareState"
import TmDataMsg from "common/TmDataMsg"
import TableInvoice from "../../ActionModal/components/TableInvoice"
import Steps from "../../ActionModal/components/Steps"
import { track } from "scripts/google-analytics.js"
import config from "src/config"

import ActionManager from "../../ActionModal/utils/ActionManager.js"

const defaultMemo = "(Sent via Color Wallet)"
const defaultStep = `details`
const feeStep = `fees`
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

export default {
  name: `send-modal`,
  components: {
    TmField,
    TmFormGroup,
    TmFormMsg,
    TmBtn,
    HardwareState,
    TmDataMsg,
    TableInvoice,
    Steps
  },
  filters: {
    viewDenom
  },
  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    validate: {
      type: Function,
      default: undefined
    },
    submissionErrorPrefix: {
      type: String,
      default: `Transaction failed`
    },
    // amount: {
    //   type: [String, Number],
    //   default: `0`
    // },
    // transactionData: {
    //   type: Object,
    //   default: () => {}
    // },
    // notifyMessage: {
    //   type: Object,
    //   default: () => ({
    //     title: `Successful transaction`,
    //     body: `You have successfully completed a transaction.`
    //   })
    // },
    // disable proceeding from the first page
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    address: ``,
    amount: null,
    denom: ``,
    memo: defaultMemo,
    max_memo_characters: 256,
    editMemo: false,
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
    },
    balance() {
      const denom = this.wallet.balances.find(b => b.denom === this.denom)
      return (denom && denom.amount) || 0
    },
    getAddress(){
        // this.$route.fullPath
        var link = 'https://localhost:9080/#/send/colors1l37vu6ds87rx2gs5yxjx70v7uy5yewpwuyxsud'.split('/');
        return link[5];
    },
    transactionData() {
      return {
        type: transaction.SEND,
        toAddress: this.address,
        amounts: [
          {
            amount: uatoms(+this.amount),
            denom: this.denom
          }
        ],
        memo: this.memo
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
    // open(denom) {
    //   this.denom = denom
    //   this.$refs.actionModal.open()
    // },
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
          this.step = signStep
          return
        case signStep:
          if (!this.isValidInput(`password`)) {
            return
          }
          // submit transaction
          this.sending = true
          await this.submit()
          this.sending = false
          return
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
        this.submissionError = `${this.submissionErrorPrefix}: ${message}.`
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
          this.submissionError = `${this.submissionErrorPrefix}: ${
            error.message
          }.`
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
      this.step = signStep
      this.submissionError = `${this.submissionErrorPrefix}: ${message}.`
      this.trackEvent(`event`, `failed-submit`, this.title, message)
    },
    async connectLedger() {
      await this.$store.dispatch(`connectLedgerApp`)
    },
    gotostepone() {
      this.step = defaultStep
      this.submissionError = null
    },
    gotosteptwo() {
      this.step = feeStep
      this.submissionError = null
    },
    validateForm() {
      this.$v.$touch()

      return !this.$v.$invalid
    },
    clear() {
      this.$v.$reset()

      this.address = undefined
      this.amount = undefined
      this.editMemo = false
      this.memo = defaultMemo
      this.sending = false
    },
    bech32Validate(param) {
      try {
        b32.decode(param)
        return true
      } catch (error) {
        return false
      }
    },
    enterPressed() {
      this.$refs.actionModal.validateChangeStep()
    },
    refocusOnAmount() {
      this.$refs.amount.$el.focus()
    }
  },
  validations() {
    return {
      address: {
        required,
        bech32Validate: this.bech32Validate
      },
      amount: {
        required: x => !!x && x !== `0`,
        decimal,
        between: between(SMALLEST, atoms(this.balance))
      },
      denom: { required },
      memo: {
        maxLength: maxLength(this.max_memo_characters)
      },
      password: {
        required: requiredIf(
          () =>
            this.selectedSignMethod === SIGN_METHODS.LOCAL &&
            this.step === signStep
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
<style scoped>
#edit-memo-btn {
  display: inline-block;
  height: 58px;
  padding: 12px 0;
  box-sizing: content-box;
  font-size: var(--sm);
}

.action-modal {
  background: #3a3046;
  display: flex;
  flex-direction: column;
  right: 1rem;
  padding: 1.5rem 1.5rem 3.5rem 1.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 630px;
  min-height: 400px;
  z-index: var(--z-modal);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(200, 200, 200, 0.1);
}

.action-modal:focus {
  outline: none
}

.action-modal-header {
  align-items: center;
  flex-direction: column;
  text-align: center;
  display: flex;
}

.action-modal-title {
  flex: 1;
  font-size: var(--h2);
  font-weight: 400;
  color: var(--bright);
  padding-bottom: 2rem;
}

.action-modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-modal-icon i {
  font-size: var(--lg);
}

.action-modal-icon.action-modal-close {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.action-modal-icon.action-modal-close:hover i {
  color: var(--link);
}

.stepsbutton {
  background-color: #542d82 !important
}

.action-modal-form .tm-form-group {
  display: block;
  padding: 0.75rem 0;
}

.action-modal-footer {
  display: flex;
  /* keeps button in bottom right no matter the size of the action modal */
  flex-grow: 1;
  align-self: flex-end;
  flex-direction: column;
}

.action-modal-footer .tm-form-group {
  padding: 0;
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
  color: white;
  display: inline-block;
}

.form-message.notice {
  border-radius: 2px;
  background-color: #504261;
  font-weight: 300;
  margin: 2rem 0;
  padding: 1rem 1rem;
  font-size: 14px;
  font-style: normal;
  width: 100%;
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

@media screen and (max-width: 1023px) {
  .row {
    flex-direction: column;
  }

  .action-modal {
    right: 0;
    top: 0;
  }
}
</style> -->
