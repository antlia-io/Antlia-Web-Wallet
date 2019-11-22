<template>
  <ActionModal
    id="send-modal"
    ref="actionModal"
    :validate="validateForm"
    :amount="amount"
    title="Send"
    submission-error-prefix="Sending tokens failed"
    :transaction-data="transactionData"
    :notify-message="notifyMessage"
    @close="clear"
    
  >
  <!-- :show="true" -->
    <TmFormGroup
      :error="$v.denom.$dirty && $v.denom.$invalid"
      class="action-modal-form-group"
      field-id="send-denomination"
      field-label="Denomination"
    >
      <TmField
        id="send-denomination"
        :value="viewDenom($v.denom.$model)"
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
      class="action-modal-form-group"
      field-id="send-address"
      field-label="Send To"
    >
      <TmField
        id="send-address"
        type="text"
        :value="getAddress"
        readonly
      />
      <!-- <TmFormMsg
        v-if="$v.address.$error && !$v.address.required"
        name="Address"
        type="required"
      />
      <TmFormMsg
        v-else-if="$v.address.$error && !$v.address.bech32Validate"
        name="Address"
        type="bech32"
      /> -->
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
        :value="getAmount"
        class="tm-field"
        placeholder="Amount"
        type="number"
        readonly
        @keyup.enter.native="enterPressed"
      />
      <TmFormMsg
        v-if="balance === 0"
        :msg="`doesn't have any ${viewDenom(denom)}`"
        name="Wallet"
        type="custom"
      />
      <!-- <TmFormMsg
        v-else-if="$v.amount.$error && (!$v.amount.required || amount === 0)"
        name="Amount"
        type="required"
      /> -->
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
  </ActionModal>
</template>

<script>
import b32 from "scripts/b32"
import { required, between, decimal, maxLength } from "vuelidate/lib/validators"
import { uatoms, atoms, viewDenom, SMALLEST } from "src/scripts/num.js"
import { mapGetters } from "vuex"
import TmFormGroup from "src/components/common/TmFormGroup"
import TmField from "src/components/common/TmField"
import TmFormMsg from "src/components/common/TmFormMsg"
import TmBtn from "src/components/common/TmBtn"
import ActionModal from "./ActionModal"
import transaction from "../utils/transactionTypes"

const defaultMemo = "(Sent via Color Wallet)"

export default {
  name: `send-modal`,
  components: {
    TmField,
    TmFormGroup,
    TmFormMsg,
    ActionModal,
    TmBtn
  },
  data: () => ({
    // address: ``,
    // amount: null,
    denom: ``,
    memo: defaultMemo,
    max_memo_characters: 256,
    editMemo: false
  }),
  computed: {
    ...mapGetters([`wallet`]),
    balance() {
      const denom = this.wallet.balances.find(b => b.denom === this.denom)
      return (denom && denom.amount) || 0
    },
    getAddress(){
        // this.$route.fullPath
        var link = 'https://localhost:9080/#/send/colors1l37vu6ds87rx2gs5yxjx70v7uy5yewpwuyxsud'.split('/');
        return link[5];
    },
    getAmount(){
        var link = 'https://localhost:9080/#/send/colors1l37vu6ds87rx2gs5yxjx70v7uy5yewpwuyxsud/1'.split('/');
        return link[6];
    },
    transactionData() {
      return {
        type: transaction.SEND,
        toAddress: this.getAddress,
        amounts: [
          {
            amount: uatoms(+this.getAmount),
            denom: this.denom
          }
        ],
        memo: this.memo
      }
    },
    notifyMessage() {
      return {
        title: `Successful Send`,
        body: `Successfully sent ${+this.getAmount} ${viewDenom(this.denom)} to ${
          this.getAddress
        }`
      }
    }
  },
  mounted() {
    if (this.denom) {
      this.denom = this.denom
    }
  },
  methods: {
    viewDenom,
    open(denom) {
      this.denom = denom
      this.$refs.actionModal.open()
    },
    validateForm() {
      this.$v.$touch()

      return !this.$v.$invalid
    },
    clear() {
      this.$v.$reset()

      this.getAddress = undefined
      this.getAmount = undefined
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
      // address: {
      //   required,
      //   bech32Validate: this.bech32Validate
      // },
      amount: {
        // required: x => !!x && x !== `0`,
        // decimal,
        between: between(SMALLEST, atoms(this.balance))
      },
      denom: { required },
      memo: {
        maxLength: maxLength(this.max_memo_characters)
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
</style>
