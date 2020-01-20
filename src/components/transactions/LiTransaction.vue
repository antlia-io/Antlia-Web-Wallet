<template>
  <tr>
    <td>
      <div class="txuser-icon">
       <img rel="preload" :style="{ borderColor: color }" src="~assets/images/antlia.svg" />
      <slot name="details" />
      </div>
    </td>
    <td>
      <div class="tx-hash">
      <div
        id="address"
        v-tooltip.top="txhash"
        v-clipboard:copy="txhash"
        v-clipboard:success="() => onCopy()"
        class="address"
      >{{ txhash }}</div>
      <div :class="{ active: copySuccess }" class="copied">
        <i class="material-icons">check</i>
        <span>Copied</span>
      </div>
      </div>
    </td>
    <td>
      <slot name="caption" />
    </td>
    <td>
      <slot name="type" />
    </td>
    <td>  <router-link :to="{ name: `block`, params: { height: block } }">{{ block }}&nbsp;</router-link></td>
    <td v-if="!hideMetaData"> <b>{{ fees.amount | toAtoms }}</b>
            <span>{{ fees.denom | viewDenom }}</span></td>
    <td v-if="!hideMetaData">{{ date }}</td>
  </tr>

  <!-- <table class="data-table">
            <thead>
              <PanelSort :properties="properties" />
            </thead>
            <tbody>
            </tbody>
  </table>-->

  <!-- <div class="li-tx">
      <div class="li-tx__content">
        <div class="li-tx__content__left">
          <div class="li-tx__icon">
            <img rel="preload" :style="{ borderColor: color }" src="~assets/images/color.svg" />
          </div>
          <div class="li-tx-desc">
            <div class="li-tx__content__caption">
              <p class="li-tx__content__caption__title alignment-res">
                <slot name="caption" />
              </p>
            </div>
            <div class="li-tx__content__information">
              <slot name="details" />
              <span v-if="memo">&nbsp;- {{ memo }}</span>
            </div>
            <div class="tx-hash">
              Tx Hash #&nbsp;
              <div
                id="address"
                v-tooltip.top="txhash"
                v-clipboard:copy="txhash"
                v-clipboard:success="() => onCopy()"
                class="address"
              >{{ txhash }}</div>
              <div :class="{ active: copySuccess }" class="copied">
                <i class="material-icons">check</i>
                <span>Copied</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!hideMetaData" class="li-tx__content__right">
          <div>
            Network Fee:&nbsp;
            <b>{{ fees.amount | toAtoms }}</b>
            <span>{{ fees.denom | viewDenom }}</span>
          </div>
          <div class="li-tx__content__block">
            <router-link :to="{ name: `block`, params: { height: block } }">Block #{{ block }}&nbsp;</router-link>
          </div>
          <div class="li-tx__content__block">{{ date }}</div>
        </div>
      </div>
  </div>-->
</template>

<script>
import moment from "moment"
import { atoms as toAtoms, viewDenom } from "../../scripts/num.js"
// import PanelSort from "staking/PanelSort"

export default {
  name: `li-transaction`,
  components: {
    // PanelSort
  },
  filters: {
    toAtoms,
    viewDenom
  },
  props: {
    color: {
      type: String,
      default: null
    },
    time: {
      type: String,
      default: null
    },
    block: {
      type: Number,
      required: true
    },
    txhash: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    memo: {
      type: String,
      default: null
    },
    fees: {
      type: Object,
      required: true
    },
    hideMetaData: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    copySuccess: false
  }),
  methods: {
    onCopy() {
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 2500)
    }
  },
  computed: {
    date({ time } = this) {
      const momentTime = moment(time)
      return   moment.utc(momentTime).format(`MMM Do YYYY, HH:mm:ssa z`)
      // momentTime.format(
      //   `${moment().isSame(momentTime, `day`) ? `` : `MMM Do YYYY `}HH:mm:ss`
      // )
    }
    //  properties() {
    //   return [
    //     {
    //       title: `To`,
    //       value: `Sent to`,
    //       tooltip: `Amount receiver'name`
    //     },
    //     {
    //       title: `Hash ID`,
    //       value: `Hash ID`,
    //       tooltip: `Validator's Hash ID`
    //     },
    //     {
    //       title: `Amount`,
    //       value: `Amount`,
    //       tooltip: `Amount sent to this validator`
    //     },

    //     {
    //       title: `Type`,
    //       value: `Type`,
    //       tooltip: `Transactions Type`
    //     },
    //     {
    //       title: `Block`,
    //       value: `Block`,
    //       tooltip: `Numbers of block`
    //     },
    //     {
    //       title: `Network Fee`,
    //       value: `Network Fee`,
    //       tooltip: `Network Fee`
    //     },
    //     {
    //       title: `Time`,
    //       value: `Time`,
    //       tooltip: `Validator Time`
    //     }
    //   ]
    // }
  }
}
</script>

<style>
.li-tx {
  display: flex;
  align-items: center;
  background: white;
  width: 100%;
  font-weight: 300;
  position: relative;
  border: 1px solid #ccc;
  margin: 1rem 0;
}

.li-tx .copied {
  bottom: 0;
}

a {
  color: #0a73b1;
}

a:hover {
  color: #00d6e1;
}

.li-tx b {
  font-weight: 500;
}

.li-tx__icon {
  padding: 1rem;
}

.li-tx__icon img {
  max-height: 100%;
  max-width: 52px;
  padding: 5px;
  border: 2px solid;
  display: block;
}

.li-tx__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

.li-tx__content__left {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
}

.li-tx__content__right {
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 50%;
}

.li-tx__content__information,
.li-tx__content__information > * {
  display: flex;
  flex-direction: row;
}

.li-tx__content__information,
.li-tx__content__right {
  font-size: 14px;
  color: #2d2c2c;
}

.li-tx__content__caption {
  line-height: 18px;
  font-size: 18px;
  color: black;
  text-align: left;
  margin: 0 0 0.4rem;
}
.li-tx__content__caption p {
  margin: 0;
}
.txuser-icon{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.txuser-icon img{
  width: 100%;
  height: 2.2rem;
    width: 2.2rem;
    margin-right: .2rem;
    border-radius: 50px;
    background: #62438d;
}
.main-table td {
  width: 14.3%;
  overflow: hidden;
}
.main-table tr {
  background: transparent;
}
.main-table .tx-hash {
  /* width:70px; */
   display: flex;
   justify-content: flex-start;
   flex-wrap: wrap;
   align-items: center;
  padding: 0;
  font-size: 14px;
  color: #2d2c2c;
  margin: 0;
}

.main-table .tx-hash .address {
  color: #0a73b1;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* .tooltip-content{
word-break: break-all;
} */
@media screen and (max-width: 572px) {
  .tx-hash .address {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .li-tx__content__information,
  .li-tx__content__information > * {
    flex-direction: column;
  }
}
.tx-hash .address:hover {
  color: #00d6e1;
}

.main-table .tx-hash .copied {
  align-items: flex-end;
  display: flex;
  color: white;
  font-size: var(--sm);
  opacity: 0;
  padding-left: 10px;
  padding-top: 2px;
  transition: opacity 500ms ease;
  width: 100%;
}

.tx-hash .copied.active {
  opacity: 1;
}

.tx-hash .copied i {
  color: var(--success);
  font-size: var(--m);
  padding-bottom: 2px;
  padding-right: 0;
}

@media screen and (max-width: 667px) {
  .li-tx__content {
    flex-direction: column;
    text-align: left;
  }
  .li-tx__content__left {
    width: 100%;
  }
  .li-tx__content__right {
    text-align: left;
    padding: 0.5rem 1rem;
    width: 100%;
  }
}

@media screen and (max-width: 414px) {
  .li-tx__icon {
    padding: 1rem 0;
  }
  .li-tx__content {
    flex-direction: column;
    text-align: left;
  }
  .li-tx__content__left {
    width: 100%;
    flex-wrap: wrap;
  }
  .li-tx__content__right {
    text-align: left;
    padding: 1rem 0;
    width: 100%;
  }
}

@media (max-width: 767px) {
  .alignment-res div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
  }
  .alignment-res div span {
    width: 100%;
    margin: 0.2rem 0;
  }
  .alignment-res div b {
    width: 100%;
  }
}
</style>
