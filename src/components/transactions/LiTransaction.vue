<template>
  <div class="li-tx">
    <div class="li-tx__icon">
      <img rel=preload 
        :style="{ borderColor: color }"
        src="~assets/images/color.svg"
      />
    </div>
    <div class="li-tx__content">
      <div class="li-tx__content__left">
        <div class="li-tx__content__caption">
          <p class="li-tx__content__caption__title">
            <slot name="caption" />
          </p>
        </div>
        <div class="li-tx__content__information">
          <slot name="details" />
          <span v-if="memo"> &nbsp;- {{ memo }} </span>
        </div>
        <div class="tx-hash">
          Tx Hash #&nbsp;
          <div
            id="address"
            v-tooltip.top="txhash"
            v-clipboard:copy="txhash"
            v-clipboard:success="() => onCopy()"
            class="address"
          >
          {{ txhash }}
          </div>
           <div :class="{ active: copySuccess }" class="copied">
            <i class="material-icons">check</i><span>Copied</span>
          </div>
        </div>
      </div>
      <div v-if="!hideMetaData" class="li-tx__content__right">
        <div>
          Network Fee:&nbsp;<b>{{ fees.amount | toAtoms }}</b>
          <span>{{ fees.denom | viewDenom }}</span>
        </div>
        <div class="li-tx__content__block">
          <router-link :to="{ name: `block`, params: { height: block } }">
            Block #{{ block }}&nbsp; </router-link
          >@&nbsp;{{ date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import { atoms as toAtoms, viewDenom } from "../../scripts/num.js"

export default {
  name: `li-transaction`,
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
      return moment.utc(momentTime).format(`MMM Do YYYY, HH:mm:ssa z`) 
      // momentTime.format(
      //   `${moment().isSame(momentTime, `day`) ? `` : `MMM Do YYYY `}HH:mm:ss`
      // )
    }
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
  padding: 12px 0 12px 1rem;
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

.li-tx__content__left,
.li-tx__content__right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.li-tx__content__right {
  text-align: right;
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
}

.tx-hash {
  display: inline-flex;
  padding: 0;
  font-size: 14px;
  color: #2d2c2c;
  margin: 0;
}

.tx-hash .address {
  color: #0a73b1;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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

.tx-hash .copied {
  align-items: flex-end;
  display: flex;
  color: black;
  font-size: var(--sm);
  opacity: 0;
  padding-left: 10px;
  padding-top: 2px;
  transition: opacity 500ms ease;
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

@media screen and (max-width: 767px) {
  .li-tx__content {
    flex-direction: column;
    text-align: left;
  }

  .li-tx__content__right {
    text-align: left;
    padding-top: 0.5rem;
  }
}
</style>
