<template>
  <tr class="panel-sort-container">
    <th
      v-for="property in properties"
      :key="property.value"
      :class="{ 'sort-by': sort }"
      class="panel-sort-table-header"
    >
      <a
        v-if="sort"
        v-tooltip.top="property.tooltip"
        class="sort-by-link"
        @click="orderBy(property.value)"
      >
        {{ property.title }}<i class="material-icons">arrow_drop_up</i>
      </a>
      <span v-else>{{ property.title }}</span>
    </th>
  </tr>
</template>

<script>
export default {
  name: `panel-sort`,
  props: {
    sort: {
      type: Object,
      default: null
    },
    properties: {
      type: Array,
      required: true
    }
  },
  methods: {
    orderBy(property) {
      const sortBys = this.$el.querySelectorAll(`.sort-by`)
      sortBys.forEach(el => el.classList.remove(`active`, `desc`, `asc`))
      const index = this.properties.findIndex(p => p.value === property)
      const el = sortBys[index]

      if (this.sort.property === property) {
        if (this.sort.order === `asc`) {
          this.sort.order = `desc`
        } else {
          this.sort.order = `asc`
        }
      } else {
        this.sort.property = property
      }
      if (this.sort.order === `asc`) {
        el.classList.add(`asc`)
      } else {
        el.classList.add(`desc`)
      }
      el.classList.add(`active`)
    }
  }
}
</script>

<style>
.panel-sort-container {
  padding: 1rem;
  color: #fff;
  background-color: #2c3255;
}

.panel-sort-table-header {
  font-size: var(--sm);
}

.sort-by i {
  font-size: var(--lg);
  position: relative;
  top: 7px;
  right: 2px;
}

.sort-by a {
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  /* color: black !important; */
}

.sort-by.active a {
  color: #0a73b1;
}

.sort-by.asc i {
  color: #0a73b1;
}

.sort-by.desc i {
  transform: rotate(180deg);
  color: #0a73b1;
}
</style>
