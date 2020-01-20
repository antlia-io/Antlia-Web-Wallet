<template>
  <div>
    <!-- <FixedSideBar /> -->
    <transition name="component-fade" mode="out-in">
      <div class="session-frame">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 mobwalletbg">
            <div class="mobwallet">
              <img src="~assets/images/mobwallet.png" />
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 formbg">
            <div class="session-outer-container">
              <div class="session">
                <div class="session-back">
                  <div class="back-btn">
                    <a @click="goBack">
                      <i class="material-icons">keyboard_arrow_left</i>
                    </a>
                  </div>
                </div>
                <div class="session-inner-container">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FixedSideBar from "common/FixedSideBar"

export default {
  name: `session-frame`,
  components: {
    FixedSideBar
  },
  methods: {
    goBack() {
      this.$router.go(`-1`)
    }
  }
}
</script>

<style>
@import "../../styles/session.css";
</style>
