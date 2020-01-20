<template>
  <div>
    <div class="qrchange-page">
      <div class="row">
        <div class="col-lg-12">
          <div class="heading">
            <h2>QR Code</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="change-qrcode">
            <h6>Click Edit to change QR Code.</h6>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="qr-code">
                            <img src="~assets/images/qr.png" />
                            <TmBtn value="Edit QR Code" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueCountryRegionSelect from "vue-country-region-select"
import TmBtn from "common/TmBtn"

export default {
  name: `changeqrcode`,
  components: {
    vueCountryRegionSelect,
    TmBtn
  },
  data: () => ({
    country: "",
    region: ""
  })
}
</script>
<style scoped>
.qrchange-page {
  background: #1c203e;
  padding: 1rem 0;
  margin: 1rem;
  height: 100vh;
}
.qrchange-page h2 {
  font-size: 2.5rem;
  color: white;
  text-transform: capitalize;
}
.change-qrcode {
  margin: 2rem 0 0;
  padding: 1rem 0;
  border-bottom: 1px solid #707070;
}
.qr-code{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    flex-wrap: wrap;
}
.qr-code .tm-btn{
    margin: 1rem 0 0;
}



</style>

