<template>
  <ActionModal
    id="modal-propose"
    ref="actionModal"
    :validate="validateForm"
    :amount="amount"
    title="Proposal"
    :transaction-data="transactionData"
    :notify-message="notifyMessage"
    @close="clear"
    v-if="session.signedIn"
    v-focus-last
  >
  <!-- submission-error-prefix="Submitting proposal failed" -->
    <TmFormGroup
      :error="$v.title.$error && $v.title.$invalid"
      class="action-modal-form-group"
      field-id="title"
      field-label="Title"
    >
      <TmField
        id="title"
        v-model.trim="title"
        v-focus
        type="text"
        placeholder="Proposal title"
        @keyup.enter.native="refocusOn"
      />
      <TmFormMsg
        v-if="$v.title.$error && !$v.title.maxLength"
        :max="$v.title.$params.maxLength.max"
        name="Proposal Title"
        type="maxLength"
      />
      <TmFormMsg
        v-if="$v.title.$error && !$v.title.required"
        name="Proposal Title"
        type="required"
      />
    </TmFormGroup>
  <div class="ps-field">
    <TmFormGroup
      :error="$v.requestedfund.$error && $v.requestedfund.$invalid"
      class="action-modal-form-group"
      field-id="requestedfund"
      field-label="Requested Fund"
    >
      <span class="input-suffix">{{ denom | viewDenom }}</span>
      <TmField
        id="requestedfund"
        v-model="requestedfund"
        :value="Number(requestedfund)"
        type="number"
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="$v.requestedfund.$error && (!$v.requestedfund.required || requestedfund === 0)"
        name="Requested Fund"
        type="required"
      />
      <TmFormMsg
        v-else-if="$v.requestedfund.$error && !$v.requestedfund.decimal"
        name="Requested Fund"
        type="numberic"
      />
      <TmFormMsg
        v-else-if="$v.requestedfund.$error && !$v.requestedfund.between"
        :max="$v.requestedfund.$params.between.max"
        :min="$v.requestedfund.$params.between.min"
        name="Requested Fund"
        type="between"
      />
    </TmFormGroup>
     <TmFormGroup
      :error="$v.amount.$error && $v.amount.$invalid"
      class="action-modal-form-group"
      field-id="amount"
      field-label="Deposit ANT"
    >
      <span class="input-suffix">{{ denom | viewDenom }}</span>
      <TmField
        id="amount"
        v-model="amount"
        :value="Number(amount)"
        type="number"
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="balance === 0"
        :msg="`doesn't have any ${viewDenom(denom)}`"
        name="Wallet"
        type="custom"
      />
      <!-- <TmFormMsg
        v-else-if="amount > balance"
        :msg="`doesn't have sufficient ${viewDenom(denom)}`"
        name="Wallet"
        type="custom"
      /> -->
      <!-- <TmFormMsg
        v-else-if="amount > 0 && amount < 10000"
        :msg="`must be greater than or equal to 10,000 ${viewDenom(denom)}`"
        name="Deposit"
        type="custom"
      /> -->
      <TmFormMsg
        v-else-if="$v.amount.$error && (!$v.amount.required || amount === 0)"
        name="Deposit"
        type="required"
      />
      <TmFormMsg
        v-else-if="$v.amount.$error && !$v.amount.decimal"
        name="Deposit"
        type="numberic"
      />
      <TmFormMsg
        v-else-if="$v.amount.$error && !$v.amount.between"
        :max="$v.amount.$params.between.max"
        :min="$v.amount.$params.between.min"
        :msg="`doesn't have sufficient ${viewDenom(denom)}`"
        name="Wallet"
        type="custom"
      />
    </TmFormGroup>
  </div>
    <!-- <TmFormGroup
      :error="$v.fundcycle.$error && $v.fundcycle.$invalid"
      class="action-modal-form-group"
      field-id="fundcycle"
      field-label="Funding Cycle"
    >
      <TmField
        id="fundcycle"
        v-model="fundcycle"
        :value="Number(fundcycle)"
        type="number"
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="$v.fundcycle.$error && (!$v.fundcycle.required || fundcycle === 0)"
        name="Funding Cycle"
        type="required"
      />
      <TmFormMsg
        v-else-if="$v.fundcycle.$error && !$v.fundcycle.decimal"
        name="Funding Cycle"
        type="numberic"
      />
      <TmFormMsg
        v-else-if="$v.fundcycle.$error && !$v.fundcycle.last"
        :max="$v.fundcycle.$params.last.max"
        :min="$v.fundcycle.$params.last.min"
        name="Funding Cycle"
        type="between"
      />
    </TmFormGroup> -->
   
      <TmFormGroup
      :error="$v.description.$error && $v.description.$invalid"
      class="action-modal-form-group"
      field-id="description"
      field-label="Description"
    >
      <TmField
        id="description"
        ref="description"
        v-model.trim="description"
        type="textarea"
        class="textarea-large"
        placeholder="Write your proposal here..."
      />
      <TmFormMsg
        v-if="$v.description.$error && !$v.description.maxLength"
        :max="$v.description.$params.maxLength.max"
        name="Description"
        type="maxLength"
      />
      <TmFormMsg
        v-if="$v.description.$error && !$v.description.required"
        name="Description"
        type="required"
      />
    </TmFormGroup>
  </ActionModal>
</template>

<script>
import { mapGetters } from "vuex"
import {
  minLength,
  maxLength,
  required,
  between,
  last,
  decimal
} from "vuelidate/lib/validators"
import { uatoms, atoms, viewDenom, SMALLEST } from "src/scripts/num.js"
import isEmpty from "lodash.isempty"
import trim from "lodash.trim"
import TmField from "src/components/common/TmField"
import TmFormGroup from "src/components/common/TmFormGroup"
import TmFormMsg from "src/components/common/TmFormMsg"
import ActionModal from "./ActionModal"
import axios from "axios"
import config from "../../config"
import transaction from "../utils/transactionTypes"

const isValid = type =>
  type === `Text` || type === `ParameterChange` || type === `SoftwareUpgrade`

const notBlank = text => !isEmpty(trim(text))

export default {
  name: `modal-propose`,
  components: {
    ActionModal,
    TmField,
    TmFormGroup,
    TmFormMsg
  },
  filters: {
    viewDenom
  },
  props: {
    denom: {
      type: String,
      required: true
    }
  },
  data: () => ({
    titleMaxLength: 64,
    descriptionMaxLength: 5000,
    title: ``,
    description: ``,
    requestedfund: 0,
    fundcycle: 0,
    type: `Text`,
    minting: 0,
    amount: 10000
  }),
  watch: {
    fundcycle (val) {
      this.fundcycle = val.replace('.', '').replace('0','')
    }
  },
  computed: {
    ...mapGetters([`wallet`,`session`]),
    balance() {
      // TODO: refactor to get the selected coin when multicoin deposit is enabled
      if ( !!this.wallet.balances.length) {
        const balance = this.wallet.balances.find(
          coin => coin.denom === this.denom
        )
        if (balance) return parseFloat(balance.amount)
      }
      return 0
    },
    transactionData() {
      return {
        type: transaction.SUBMIT_PROPOSAL,
        proposalType: this.type,
        title: this.title,
        description: this.description,
        fundcycle: this.fundcycle,
        initialDeposits: [
          {
            amount: uatoms(this.amount),
            denom: this.denom
          }
        ],
        initialRequestedFunds: [
          {
            amount: uatoms(this.requestedfund),
            denom: this.denom
          }
        ]
      }
    },
    notifyMessage() {
      return {
        title: `Successful proposal submission!`,
        body: `You have successfully submitted a new ${this.type.toLowerCase()} proposal`
      }
    }
  },
  validations() {
    return {
      title: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(this.titleMaxLength),
        notBlank
      },
      description: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(this.descriptionMaxLength),
        notBlank
      },
      type: {
        isValid
      },
      amount: {
        required: x => !!x && x !== `0`,
        decimal,
        between: between(0, atoms(this.balance))
      },
      requestedfund: {
        required: x => !!x && x !== `0`,
        decimal,
        between: between(0, this.minting)
      },
      // fundcycle: {
      //   required: x => !!x && x !== `0`,
      //   decimal,
      //   last: between(1, 6)
      // },
    }
  },
  mounted() {
       axios
      .get(config.stargate+'/minting/minting-speed')
      .then((response) => {
        var time = response.data * (60*60*24*7*4)
        var index = time * 0.20
        var temp = index * 0.50
        this.minting= temp/1000000
      })
    },
  methods: {
    viewDenom,
    open() {
      this.$refs.actionModal.open()
    },
    validateForm() {
      this.$v.$touch()

      return !this.$v.$invalid
    },
    clear() {
      this.$v.$reset()

      this.title = ``
      this.description = ``
      this.amount = 10000
      this.fundcycle = 0
      this.requestedfund = 0
    },
    refocusOn() {
      this.$refs.description.$el.focus()
    },
    enterPressed() {
      this.$refs.actionModal.validateChangeStep()
    }
  }
}
</script>
<style>
.textarea-large {
  min-height: 100px;
}
</style>
