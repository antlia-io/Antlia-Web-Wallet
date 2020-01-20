<template>
  <router-link
    v-if="type === 'link'"
    :to="to"
    exact="exact"
    :disabled="disabled"
  >
    {{ value }}
  </router-link>
  <button v-else-if="type === 'anchor'" :disabled="disabled" class="tm-btn">
    <span :class="btnClass">
      <i v-if="icon" :class="'tm-btn__icon material-icons'" aria-hidden="true">
        {{ icon }} </i
      ><span v-if="value" class="tm-btn__value">{{ value }}</span>
    </span>
  </button>
  <button v-else :type="type" class="tm-btn" :disabled="disabled">
    <span :class="btnClass">
      <i v-if="icon" :class="'tm-btn__icon material-icons'" aria-hidden="true">
        {{ icon }} </i
      ><img
        v-else-if="img"
        :src="img"
        :class="'tm-btn__img'"
        aria-hidden="true"
      /><span v-if="value" class="tm-btn__value">{{ value }}</span>
    </span>
  </button>
</template>

<script>
// TODO refactor btn content into mixin?
export default {
  name: `TmBtn`,
  props: {
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPos: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      let value = `tm-btn__container`
      if (this.iconPos) value += ` tm-btn__icon-${this.iconPos}`
      if (this.size) value += ` tm-btn--size-${this.size}`
      if (this.color) value += ` tm-btn--${this.color}`
      return value
    }
  }
}
</script>

<style scoped>
.tm-btn {
  padding: 0;
  border: none;
  background: transparent;
  text-decoration: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  outline: none !important;
}
.btnContainer .tm-btn {
  padding: 0;
  border: none;
  background: transparent;
  text-decoration: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0 0;
  width: auto;
}

a {
  cursor: pointer;
}

[disabled] * {
  opacity: 0.7;
  cursor: not-allowed;
}

.tm-btn .tm-btn__container {
  font-family: var(--sans);
  font-size: 1rem !important;
  font-weight: 600;
  border: 50px;
  line-height: 1;
  min-width: 115px;
  color: var(--bright, #333) !important;
  padding: 0.5rem 2rem;
  margin: 0;
  /* background: #0a73b1; */
  background: #004bff;
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;

}

#withdraw-btn .tm-btn__container {
  padding: .3rem .5rem !important;
  display: unset !important;
  background: #151934;
  font-size: 10px !important;
  min-width: 70px;
  border-radius: 50px;
}
#withdraw-btn .tm-btn__container .tm-btn__value{
    text-transform: capitalize !important;
}

#withdraw-btn .material-icons {
  width: 40%
}
.send-rcv .tm-btn__container {
  padding: 0.5rem !important;
  display: unset !important;
  background: #fff;
  font-size: 14px !important;
  color: #660099 !important;
  border-radius: 50px;
  width: 100%;
}
.wc-wallet .tm-btn__container {
  padding: 0.5rem !important;
  display: block !important;
  background: #fff;
  font-size: 14px !important;
  color: #660099 !important;
  border-radius: 5px;
  width: 150px;
}
.create-proposal .tm-btn__container {
  padding: 0.5rem 0.7rem;
  background: #fff;
  font-size: 14px !important;
  color: #23b861 !important;
  border-radius: 50px;
  width: 100%;
}
.tm-btn .tm-btn--secondary {
  background: #0a73b1;
}

.tm-btn .tm-btn__container::before,
.tm-btn .tm-btn__container::after {
  content: "";
  flex: 1 0 auto;
}

.tm-btn .tm-btn__container:hover:enabled {
  color: var(--txt, #333);
  text-decoration: none;
  border-color: var(--bc, #ddd);
  background: var(--app-fg, #eee);
}

.tm-btn .tm-btn__value {
  line-height: 1.5;
  white-space: nowrap;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tm-btn.disabled,
.tm-btn[disabled] {
  opacity: 0.333;
  user-select: none;
  color: var(--dim, #666) !important;
}

.tm-btn.disabled:focus:enabled,
.tm-btn[disabled]:focus:enabled {
  outline: none;
}

.tm-btn .tm-btn__container.tm-btn--size-sm {
  font-size: 0.75em;
  height: 1.5rem;
  line-height: 1rem;
  padding: 0 1rem;
}

.tm-btn .tm-btn__container.tm-btn--size-sm .tm-btn__value {
  font-size: 0.75rem;
}

.tm-btn .tm-btn__container.tm-btn--size-lg {
  font-size: 1.125em !important;
  height: 3rem;
  font-weight: normal;
  padding: 0 1rem;
}

.default-theme .tm-btn__container {
  padding: 0.5rem 1.3rem !important;
  display: unset !important;
  background: #2c3255;
  font-size: 12px !important;
  color: #848688 !important;
  border-radius: 50px;

}
.default-theme .tm-btn__value{
  text-transform: capitalize;
}

/* Themes Colors Change Buttons Styles */
.select-colors .tm-btn__container {
  display: flex !important;
  justify-content: center;
  align-items: center;
  font-size: 12px !important;
  color: white !important;
  border-radius: 50px;
  background: transparent;
  padding: 0 !important;
}
.select-colors .tm-btn__value{
  text-transform: capitalize;
  font-size: 1rem;
}
.moonlight .tm-btn__value{
  color: #848688;
}
.qr-code .tm-btn__container {
  padding: 0.5rem 1.3rem !important;
  display: unset !important;
  background: #2c3255;
  font-size: 12px !important;
  color: #848688 !important;
  border-radius: 50px;

}
.qr-code .tm-btn__value{
  text-transform: capitalize;
}
.action-modal .tm-btn__container,
.session-footer .tm-btn__container {
  padding: 0.5rem 1.3rem !important;
  display: block !important;
  background: #004bff;
  font-size: 12px !important;
  color: #fff !important;
  border-radius: 5px;
  width: 100%;

}
.session-footer .tm-btn__value{
  text-transform: uppercase;
  font-size: 1rem;
}
.table-validator .delegate-btn .tm-btn__container,
.table-validator .undelegate-btn .tm-btn__container {
  padding: 2rem 0.3rem !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  background: transparent;
  font-size: 12px !important;
  color: #848688 !important;
  border-radius: 0;
}
.table-validator .undelegate-btn .tm-btn__container {
  min-width: 95px !important;
}
.table-validator .delegate-btn .tm-btn__container {
  min-width: 70px !important;
}
.table-validator .tm-btn__value{
  text-transform: uppercase;
  color: white;
  font-size: 12px;
}
@media screen and (max-width: 1023px) {
  .tm-btn .tm-btn__container {
    width: 100%;
  }
}

@media screen and (max-width: 420px) {
  .tm-btn .tm-btn__container {
    padding: .5rem
  }
}
</style>
