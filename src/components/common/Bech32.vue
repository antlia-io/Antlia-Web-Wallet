<template>
  <div class="bech32-address">
  
    <div
      id="address"
      v-tooltip.top="address"
      v-clipboard:copy="address"
      v-clipboard:success="() => onCopy()"
      class="address"
    >
      {{ address | formatBech32(longForm) }}
    </div>
    <div :class="{ active: copySuccess }" class="copied">
      <i class="material-icons">check</i><span>Copied</span>
    </div>
  </div>
</template>

<script>
import { formatBech32 } from "src/filters"


export default {
  name: `bech32-address`,
  filters: {
    formatBech32
  },
  props: {
    address: {
      type: String,
      required: true
    },
    longForm: {
      type: Boolean,
      required: false,
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
  }
}
</script>
<style>
.bech32-address {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0; 
  }

/* .publicaddress .bech32-address {
  margin-left: 4rem
} */
.action-modal .address{
  color: black;
}
.bech32-address .address {
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

@media screen and (max-width: 572px) {
  .bech32-address .address {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .publicaddress .bech32-address {
    width: 70%;
  }

}
.bech32-address .address:hover {
  color: #00d6e1;
}

.publicaddress .address:hover {
  color: #3C9E92 !important;
}

.publicaddress .copied {
  color: white !important;
  width: 100%;
  text-align: center;
}

.bech32-address .copied {
  justify-content: center;
  align-items: center;
  display: flex;
  color: black;
  font-size: var(--sm);
  opacity: 0;
  padding: 5px 0 0;
  transition: opacity 500ms ease;
}
.prop-link .bech32-address .copied {
  color: white;
}
.prop-link .bech32-address {
  flex-wrap: nowrap;
}
.bech32-address .copied.active {
  opacity: 1;
}

.bech32-address .copied i {
  color: var(--success);
  font-size: var(--m);
  padding-bottom: 2px;
  padding-right: 0;
}
</style>
