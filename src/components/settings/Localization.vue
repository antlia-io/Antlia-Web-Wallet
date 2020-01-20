<template>
  <div>
    <div class="location-page">
      <div class="row">
        <div class="col-lg-12">
          <div class="heading">
            <h2>Currency</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="multi-country">
            <h6>Select your preffered local currency.</h6>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="select-country">
            <!-- <country-select v-model="country" :country="country" topCountry="US" /> -->
            <!-- <region-select v-model="region" :country="country" :region="region" /> -->
          
            <div
              class="niceCountryInputSelector"
              style="width: 300px;"
              data-selectedcountry="US"
              data-showspecial="false"
              data-showflags="true"
              data-i18nall="All selected"
              data-i18nnofilter="No selection"
              data-i18nfilter="Filter"
              data-onchangecallback="onChangeCallback"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue"
// import CountrySelect from "vue-country-select"
// import vueCountryRegionSelect from "vue-country-region-select"
// Vue.use(vueCountryRegionSelect, CountrySelect)


export default {
  name: `localization`,
  components: {
    // vueCountryRegionSelect,
    // CountrySelect
  },
  // data: () => ({
  //   country: "",
  //   region: "",
  //   result: null
  // })
}
</script>
<style scoped>
.location-page {
  background: #1c203e;
  padding: 1rem 0;
  margin: 1rem;
  height: 100vh;
}
.location-page h2 {
  font-size: 2.5rem;
  color: white;
  text-transform: capitalize;
}
.multi-country {
  margin: 2rem 0 0;
  padding: 1rem 0;
  border-bottom: 1px solid #707070;
}
</style>

