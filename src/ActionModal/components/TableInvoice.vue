<template>
  <div>
    <ul class="table-invoice">
       <li class="total-row">
        <span class="property">Total</span>
        <span class="value"> {{ total | fullDecimals }} {{ bondDenom | viewDenom }} </span>
      </li>
      <li>
        <span class="property">Network Fee</span>
        <span class="value">
          {{ estimatedFee | fullDecimals }}
          {{ bondDenom | viewDenom }}
        </span>
      </li>
           <li v-if="subTotal > 0">
        <span class="property">Grand Total</span>
        <span class="valuebold"> {{ subTotal | fullDecimals }} {{ bondDenom | viewDenom }} </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { fullDecimals, viewDenom } from "../../scripts/num.js"

export default {
  name: `table-invoice`,
  filters: {
    fullDecimals,
    viewDenom
  },
  props: {
    amount: {
      type: Number,
      required: true
    },
    estimatedFee: {
      type: Number,
      required: true
    },
    bondDenom: {
      type: String,
      required: true
    }
  },
  data: () => ({
    info: `Estimated network fees based on simulation.`
  }),
  computed: {
    subTotal() {
      return this.amount
    },
    total() {
      return this.estimatedFee + this.subTotal
    }
  }
}
</script>
<style scoped>
.table-invoice {
  margin: 2rem 0 0;
  border-collapse: inherit;
  padding: 0 0.25rem;
  font-size: var(--sm);
  letter-spacing: 0.4px;
}

.table-invoice li {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 0.5rem;
}

.table-invoice span {
  padding: 0;
  color: black;
  width: 100%;
}
.table-invoice .property{
  font-size: 1rem;
  color: #848688;
  font-weight: 500;
}
.table-invoice .value{
  font-size: 1.3rem;
  color: black;
  font-weight: 600;
}
.table-invoice .valuebold{
  font-size: 2rem;
  color: #23b861;
  font-weight: 600;
}

.total-row {
  border-top: 2px solid var(--bc);
  margin-top: 0.5rem;
  padding-top: 0.25rem;
}
</style>
