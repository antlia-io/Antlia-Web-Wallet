<template>
  <div>
    <div class="themes-page">
      <div class="row">
        <div class="col-lg-6">
          <div class="heading">
            <h2>Antlia Themes</h2>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="default-theme">
            <TmBtn value="Use Default Antlia Theme" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="multi-color">
            <h6>Multi Colors</h6>
          </div>
          <div class="select-colors">
            <TmBtn value="Dark" class="dark" />
            <TmBtn value="Light" class="light" />
            <TmBtn value="White" class="white" />
            <TmBtn value="Moonlight" class="moonlight" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Tabs from "common/Tabs"
import TmBtn from "common/TmBtn"
// import { Carousel, Slide } from "vue-carousel"
// import Slick from 'vue-slick';

export default {
  name: `themes`,
  components: {
    TmBtn
  },
}
</script>
<style scoped>
.themes-page {
  background: #1c203e;
  padding: 1rem 0;
  margin: 1rem;
  height: 100vh;
}
.themes-page h2 {
  font-size: 2.5rem;
  color: white;
  text-transform: capitalize;
}
.default-theme .tm-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.multi-color {
  margin: 2rem 0 0;
  padding: 1rem 0;
  border-bottom: 1px solid #707070;
}
.select-colors {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 0;
}
.select-colors .tm-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem 0 0;
  border-radius: 70px;
  width: 100px;
  height: 100px;
}
.dark {
  background: #151934;
  box-shadow: 0px 0px 10px #2c3255;
}
.light {
  background: #2c3255;
}
.white {
  background: #004bff;
}
.moonlight {
  background: #222648;
  box-shadow: 0px 0px 10px #414558;
}
</style>

