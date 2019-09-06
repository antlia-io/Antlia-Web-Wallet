<template>
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
</template>

<script>
export default {
  name: `session-frame`,
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
