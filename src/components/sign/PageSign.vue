<template>
  <li class="li-coin">
    <div class="space">
    </div>
    <div class="li-coin__content">
      <div class="li-coin__content-left">
        <p class="coin-denom">Sign A Message:</p>
      </div>
      <TmBtn
        value="Sign"
        class="paddingright"
        color="primary"
        @click.native="showModal()"
      /> 
    </div>
    <div class="li-coin__content">
      <div class="li-coin__content-left">
        <p class="coin-denom">Verify A Signed Message:</p>
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
</template>

<script>
import num from "scripts/num"
import { mapGetters, mapActions } from "vuex"
import orderBy from "lodash.orderby"
import SignModal from "src/ActionModal/components/SignModal"
import VerifyModal from "src/ActionModal/components/VerifyModal"
import TmPage from "common/TmPage"
import TmBtn from "common/TmBtn"
import TmDataMsg from "common/TmDataMsg"

export default {
  name: `page-wallet`,
  components: {
    TmDataMsg,
    TmPage,
    VerifyModal,
    TmBtn,
    SignModal
  },
  data: () => ({ num }),
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
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  border: 1px solid var(--bc-dim);
  background: white;
  padding: 1rem;
  border-radius: 0.25rem;
}

.li-coin__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black !important;
  justify-content: space-between;
  width: 100%;
  padding-left: 1rem;
  font-size: var(--m);
}

.space {
  padding-left: 3rem
}

.paddingright {
  padding-right: 2rem
}

.li-coin__content__left {
  display: flex;
  flex-direction: column;
}

.coin-denom {
  color: black;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 0 !important;
}

@media screen and (max-width: 470px) {
  .li-coin__content-left {
    padding-bottom: 0.5rem;
  }
}
@media screen and (max-width: 587px) {
  .li-coin__content {
    display: block
  }
  .space {
    padding: 0 !important
  }
}

@media screen and (max-width: 420px) {
  .li-coin {
    padding: .5rem
  }
  .li-coin__content {
    padding-left: .5rem
  }
}
</style>
