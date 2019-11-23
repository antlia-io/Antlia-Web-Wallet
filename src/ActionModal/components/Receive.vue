<template>
<transition v-if="show" name="slide-fade">
    <div v-focus-last class="action-modal" tabindex="0" @keyup.esc="close">
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
      <div class="qrcode">
        <qrcode-vue :value="link" :size="size" level="H"></qrcode-vue>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex"
import Bech32 from "common/Bech32"
import TmField from "src/components/common/TmField"
import TmFormGroup from "src/components/common/TmFormGroup"
import QrcodeVue from 'qrcode.vue'

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
            return 'https://localhost:9080/#/send/'+this.wallet.address+'/'+this.amount
        else 
            return 'https://localhost:9080/#/send/'+this.wallet.address
    }
  },
  data: () => ({
        size: 150,
        show: false
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
        width: 30%;
        margin: 0 auto;
        background: #fff;
        text-align: center;
        padding: .5rem;
        margin-top: 2rem
    }

    .publicaddress {
        text-align: center
    }

    @media screen and (max-width: 425px) {
        .qrcode {
            width: 45%;
        }
    }

    @media screen and (max-width: 375px) {
        .qrcode {
            width: 51%;
        }
    }

    @media screen and (max-width: 320px) {
        .qrcode {
            width: 62%;
        }
    }
</style>
