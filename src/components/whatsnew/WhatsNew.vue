<template>
  <div class="whatsnew-page">
    <div class="row">
      <div class="col-lg-7">
        <div class="new">
          <div class="new-content">
            <div class="app-version">
              <div class="item">
                <img src="~assets/images/android.png" />
              </div>
              <div class="item">
                <img src="~assets/images/apple.png" />
              </div>
            </div>
            <div class="new-desc">
               <h2>Coming Soon</h2>
                  <p>Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet.</p>
              <!-- <carousel :data="data">
   
                <slide>
                  <h2>Coming Soon1</h2>
                  <p>Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet.</p>
                </slide>
                <slide>
                  <h2>Coming Soon2</h2>
                  <p>Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet.</p>
                </slide>
                <slide>
                  <h2>Coming Soon3</h2>
                  <p>Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet. Fast and secure sending of funds directly from your wallet.</p>
                </slide>
              </carousel> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="app-shot">
          <img src="~assets/images/mob.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex"
// import PageTransactions from "./PageTransactions"
// import TmPage from "common/TmPage"
// import TmDataMsg from "common/TmDataMsg"
// import { Carousel, Slide } from "vue-carousel"
// import Slick from 'vue-slick';

export default {
  name: `whatsnew`,
  components: {
    // Slick,
    // Carousel,
    // Slide
  },


  // All slick methods can be used too, example here
  // methods: {
  //     next() {
  //         this.$refs.slick.next();
  //     },
  //     prev() {
  //         this.$refs.slick.prev();
  //     },
  //     reInit() {
  //         // Helpful if you have to deal with v-for to update dynamic lists
  //         this.$nextTick(() => {
  //             this.$refs.slick.reSlick();
  //         });
  //     },
  // },
}
</script>
<style scoped>
.whatsnew-page {
  background: #1c203e;
  padding: 5rem 3rem;
  height: 118vh;
  margin: 1rem;
}
.new {
  display: flex;
  align-items: center;
  height: 100%;
}
.new-content {
  width: 100%;
}
.app-version {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 1.5rem;
}
.app-version .item {
  margin: 0 1rem 0 0;
}
.new-desc {
  padding: 1rem 0;
}
.new-desc h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem;
}
.new-desc p {
  font-size: 1rem;
  color: #848688;
  text-align: justify;
}
.app-shot {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-shot img {
  width: 100%;
}
</style>

