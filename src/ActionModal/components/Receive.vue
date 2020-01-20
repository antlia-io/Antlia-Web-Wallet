<template>
<transition v-if="show" name="slide-fade">
    <div v-focus-last class="action-modal" id="receivemodal" tabindex="0" @keyup.esc="close">
      <div class="modal-inner">
      <div
        id="closeBtn"
        class="action-modal-icon action-modal-close"
        @click="close"
      >
        <i class="material-icons">close</i>
      </div>
      <div class="action-modal-header">
        <span class="action-modal-title">
          Receive
        </span>
      </div>
      <div class="publicaddress">
          <p>Public Address Link</p>
          <Bech32 :address="session.address || ''" long-form />
      </div>
         <TmFormGroup
          :error="$v.receiveamount.$error && $v.receiveamount.$invalid"
          class="action-modal-form-group"
          field-id="receiveamount"
        >
          <TmField
            id="receiveamount"
            ref="receiveamount"
            v-model="$v.receiveamount.$model"
            class="tm-field"
            placeholder="Amount"
            type="number"
            @keyup.enter.native="enterPressed"
          />
          <TmFormMsg
            v-if="$v.receiveamount.$error && (!$v.receiveamount.required || receiveamount === 0)"
            name="Amount"
            type="required"
          />
          <TmFormMsg
            v-else-if="$v.receiveamount.$error && !$v.receiveamount.decimal"
            name="Amount"
            type="numeric"
          />
          <span class="coin-sml">ANT</span>
        </TmFormGroup>
      <!-- <div class="publicaddress" v-show="amount > 0">
        <div>Amount: </div>
        <div class="amount">{{amount}}</div>
      </div> -->
      <div class="qrcode">
        <qrcode-vue :value="qrcode" :size="size" level="H"></qrcode-vue>
      </div>


      <!-- <div v-if="amount > 0">
        <div v-if="loading == true" class="qrcodeloading">
          <img class="loading-icon" src="~assets/images/loader.svg" />
        </div>
        <div v-else class="qrcode">
          <qrcode-vue :value="this.qrwithamount" :size="size" level="H"></qrcode-vue>
        </div>
      </div>
      <div v-else>
        <div v-if="loading1 == true" class="qrcodeloading">
          <img class="loading-icon" src="~assets/images/loader.svg" />
        </div>
        <div v-else class="qrcode">
          <qrcode-vue :value="this.onlyqr" :size="size" level="H"></qrcode-vue>
        </div>
      </div> -->


      <!-- <p>Scan the QR Code to transfer funds</p> -->
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
import axios from "axios";
import config from "src/config"
import TmFormMsg from "src/components/common/TmFormMsg"
import { required, decimal } from "vuelidate/lib/validators"

export default {
  name: `send-modal`,
  components: {
    QrcodeVue,
    Bech32,
    TmFormGroup,
    TmField,
    TmFormMsg
  },
  // async updated(){
  //     if(this.getQRCode < 2 && this.amount > 0)
  //     {
  //       this.getQRCode = this.getQRCode + 1;
        
  //           var addressamount = this.url+'/#/send/'+this.wallet.address+'/'+this.amount;
  //           await axios
  //             .post(config.shorturl,{
  //               url: addressamount
  //               },{ headers: {
  //                 'Content-Type': 'application/json'
  //               }} )
  //             .then((response) => {
  //               this.qrwithamount = response.data.response
  //               this.loading = false
               
  //             })
  //             .catch(err => {
  //                 console.log(err)
  //               })
       
  //     }else {
  //         if(this.getQRCode2 < 2 && this.amount <= 0) {
  //         this.getQRCode2 = this.getQRCode2 + 1;
  //           var onlyaddress = this.url+'/#/send/'+this.wallet.address;
  //           await axios
  //             .post(config.shorturl,{
  //               url: onlyaddress
  //               },{ headers: {
  //                 'Content-Type': 'application/json'
  //               }})
  //             .then((response) => {
  //               this.onlyqr = response.data.response
  //               this.loading1 = false
               
  //             })
  //             .catch(err => {
  //                 console.log(err)
  //               })
  //         }
          
  //       }
  // },
  computed: {
    ...mapGetters([`wallet`,`session`]),
    qrcode(){
      if( this.receiveamount > 0){
        return this.url+'/#/send/'+this.wallet.address+'/'+this.receiveamount;
      }
      return this.url+'/#/send/'+this.wallet.address;
    }
  },
  data: () => ({
        size: 150,
        show: false,
        url: config.qrcode,
        onlyqr: ``,
        qrwithamount: ``,
        getQRCode: 1,
        getQRCode2: 1,
        loading: true,
        loading1: true,
        receiveamount: ``
  }),
  props: {
    amount: {
      type: String,
      default: 0
    }
  },
    validations() {
    return {
      receiveamount: {
        required: x => !!x && x !== `0`,
        decimal
      }
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    clear() {
      this.$v.$reset()
    }
  },
}
</script>
<style scoped>
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
span.coin-sml {
    color: #848688;
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-weight: 600;
}
.publicaddress{
  display: flex;
  justify-content: flex-start;
}

    .qrcode {
        width: 100%;
        max-width:170px;
        margin: 2rem auto 0;
        background: #fff;
        text-align: center;
        padding: .5rem;
    }
    .qrcodeloading {
      text-align: center;
      margin: 2rem auto;
      padding: .5rem;
    }
    .publicaddress {

        display: flex;
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
      color: #848688;
      margin-top: 1rem !important;
      font-weight: 600;
      font-size: 1rem;
      word-break: break-word;
    }

    .amount {
      min-width: 100px;
      max-width: 200px;
      word-break: break-all
    }
</style>
