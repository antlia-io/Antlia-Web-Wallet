<template>
  <TmPage
    data-title="Sign/Verify"
    :sign-in-required="true"
  >
    <li class="li-coin" v-if="session.signedIn">
      <div class="li-coin__content">
        <div class="li-coin__content-left">
          <h5 class="coin-denom height">Sign A Message:</h5>
          <p class="desc height">You can easily sign any message. Just input a message to generate a signed message signature.</p>
        </div>
        <TmBtn
          value="Sign"
          class="paddingright"
          color="primary"
          @click.native="showModal()"
        /> 
      </div>
    </li>
    <li class="li-coin margin" v-if="session.signedIn">
      <div class="li-coin__content">
        <div class="li-coin__content-left">
          <h5 class="coin-denom">Verify A Signed Message:</h5>
          <p class="desc height">You can easily verify any Color signed message signature. You just have to provide the Color Public address, generated signature and the message that has to be verified.</p>
        </div>
        <TmBtn
          value="Verify"
          class="paddingright"
          color="primary"
          @click.native="showVerifyModal()"
        />
      </div>
    <SignModal ref="signModal" />
    <VerifyModal ref="verifyModal" />
  </li>
</TmPage>
</template>

<script>
import num from "scripts/num"
import TmPage from "common/TmPage"
import { mapGetters, mapActions } from "vuex"
import SignModal from "src/ActionModal/components/SignModal"
import VerifyModal from "src/ActionModal/components/VerifyModal"
import TmBtn from "common/TmBtn"

export default {
  name: `page-wallet`,
  components: {
    TmPage,
    VerifyModal,
    TmBtn,
    SignModal
  },
  data: () => ({ num }),
  computed: {
    ...mapGetters([`wallet`, `connected`, `session`]),
  },
  methods: {
    showModal() {
      this.$refs.signModal.open()
    },
    showVerifyModal() {
      this.$refs.verifyModal.open()
    }
  }
}
</script>
<style scoped>
  .li-coin {
  display: flex;
  align-items: center;
  font-size: var(--m);
  margin-bottom: 1.5rem;
  /* margin-top: 1rem; */
  border: 1px solid var(--bc-dim);
  background: white;
  /* padding: 1rem; */
  border-radius: 0.25rem;
}
.li-coin__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black !important;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  font-size: var(--m);
}
.li-coin .br{
  border-right: 1px #cccccc solid;
}
.space {
  padding-left: 3rem
}
.li-coin__content-left {
  text-align: left;
}
.coin-denom {
  color: black;
  font-weight: 500;
  margin: 1rem;
  text-align: left;
}
.margin {
  margin-bottom: 3rem
}
.desc {
  color: black;
  font-weight: 300;
  margin: 1rem;
  text-align: justify;
}
@media screen and (max-width: 768px) {
.pl{
  padding: 0;
}
}
@media screen and (min-width: 668px) {
.paddingright {
  padding-right: 2rem;
  outline: 0
}
}
@media screen and (max-width: 470px) {
  .li-coin__content-left {
    padding-bottom: 0.5rem;
  }
}

@media screen and (max-width: 505px) {
  .height {
    height: 47px;
  }
}

@media screen and (max-width: 425px) {
  .li-coin__content {
    display: block
  }
  .space {
    padding: 0 !important;
  }
.coin-denom {
 text-align: center;
}
  .li-coin__content-left{
    justify-content: center;
      flex-direction: column;
  }
}

@media screen and (max-width: 667px) {
  .li-coin {
    padding: .5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  .li-coin .br{
  border-right: none;
    border-bottom: 1px #cccccc solid;
}
  .li-coin__content {
    padding-left: 1rem;
    text-align: center;
    width: 100%;
  }
    .height {
    height: auto !important;
  }
.coin-denom {
  margin-right: 0;
}
}
</style>
