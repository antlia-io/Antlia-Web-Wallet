<template>
<div>
  <FixedSideBar />
  <transition name="component-fade" mode="out-in">
    <div class="session-frame">
      <div class="session-outer-container">
        <div class="session">
          <a @click="goBack">
            <i class="material-icons session-back">arrow_back</i>
          </a>
          <slot></slot>
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
