<template>
<transition v-if="show" name="slide-fade">
    <div v-focus-last class="action-modal" id="receivemodal" tabindex="0" @keyup.esc="close">
      <div
        id="closeBtn"
        class="action-modal-icon action-modal-close"
        @click="close"
      >
        <i class="material-icons">close</i>
      </div>
      <div class="action-modal-header">
        <span class="action-modal-title">
          QR Code
        </span>
      </div>
      <div class="publicaddress">
          <h6>Your Public Color Address</h6>
          <Bech32 :address="session.address || ''" long-form />
      </div>
      <div class="publicaddress" v-show="amount > 0">
        <div>Amount: </div>
        <div class="amount">{{amount}}</div>
      </div>
      <div class="qrcode">
        <qrcode-vue :value="link" :size="size" level="H"></qrcode-vue>
      </div>
      <p>Scan the QR Code to transfer funds</p>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex"
import Bech32 from "common/Bech32"
import TmField from "src/components/common/TmField"
import TmFormGroup from "src/components/common/TmFormGroup"
import QrcodeVue from 'qrcode.vue'
import config from "src/config"

export default {
  name: `send-modal`,
  components: {
    QrcodeVue,
    Bech32,
    TmFormGroup,
    TmField
  },
  computed: {
    ...mapGetters([`wallet`,`session`]),
    link(){
        if(this.amount > 0)
            return this.url+'/#/send/'+this.wallet.address+'/'+this.amount
        else 
            return this.url+'/#/send/'+this.wallet.address
    }
  },
  data: () => ({
        size: 150,
        show: false,
        url: config.qrcode
  }),
  props: {
    amount: {
      type: String,
      default: 0
    },
  },
  mounted() {
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false

      // reset form
      this.$v.$reset()
      this.$emit(`close`)
    },
    clear() {
      this.$v.$reset()
    },
  },
}
</script>
<style scoped>
    .qrcode {
        width: 100%;
        max-width:170px;
        margin: 2rem auto 0;
        background: #fff;
        text-align: center;
        padding: .5rem;
    }

    .publicaddress {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        flex-wrap: wrap;
    }

    .display {
      display: flex
    }

    .margin {
      border: none;
      background: #3a3046 !important;
      height: 2rem !important;
    }

    #receivemodal p {
      margin-top: 1rem !important;
      font-weight: 300;
      font-size: 14px;
      text-align: center;
      word-break: break-word;
    }

    .amount {
      min-width: 100px;
      max-width: 200px;
      word-break: break-all
    }
</style>
