<template>
  <div class="tm-hardware-state">
    <div class="tm-hardware-state-content">
      <i v-if="icon" class="tm-hardware-state__icon material-icons">
        {{ icon }}
      </i>
      <div class="tm-hardware-state__label">
        <slot />
      </div>
      <img v-show="loading" src="~assets/images/loader.svg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ``
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.tm-hardware-state {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin: 1.5rem auto 0;
  padding: 1.5rem;
  user-select: none;
  border: 2px solid rgb(176, 180, 207);
  border-radius: 2px;
}

#delegation-modal .tm-hardware-state {
  background: none;
  border: none
}

#delegation-modal .tm-hardware-state__icon {
  color: white
}

#delegation-modal .tm-hardware-state__label {
  color: white
}

#send-modal .tm-hardware-state {
  background: none;
  border: none
}

#send-modal .tm-hardware-state__icon {
  color: white
}

#send-modal .tm-hardware-state__label {
  color: white
}

#undelegation-modal .tm-hardware-state {
  background: none;
  border: none
}

#undelegation-modal .tm-hardware-state__icon {
  color: white
}

#undelegation-modal .tm-hardware-state__label {
  color: white
}

#modal-withdraw-rewards .tm-hardware-state {
  background: none;
  border: none
}

#modal-withdraw-rewards .tm-hardware-state__icon {
  color: white
}

#modal-withdraw-rewards .tm-hardware-state__label {
  color: white
}

#modal-vote .tm-hardware-state {
  background: none;
  border: none
}

#modal-vote .tm-hardware-state__icon {
  color: white
}

#modal-vote .tm-hardware-state__label {
  color: white
}

#modal-propose .tm-hardware-state {
  background: none;
  border: none
}

#modal-propose .tm-hardware-state__icon {
  color: white
}

#modal-propose .tm-hardware-state__label {
  color: white
}

#modal-deposit .tm-hardware-state {
  background: none;
  border: none
}

#modal-deposit .tm-hardware-state__icon {
  color: white
}

#modal-deposit .tm-hardware-state__label {
  color: white
}

.tm-hardware-state-content {
  display: flex;
  align-items: center;
}

.tm-hardware-state__icon {
  font-size: 1.5rem;
  padding-right: 1rem;
  color: black;
}

.tm-hardware-state__label {
  color: black;
}
</style>
