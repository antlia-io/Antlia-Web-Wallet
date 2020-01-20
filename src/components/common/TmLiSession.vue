<template>
  <router-link :to="route" class="tm-li-session">
    <!-- <div class="tm-li-session-icon">
      <i class="material-icons circle">{{ icon }}</i>
    </div> -->
    <div class="tm-li-session-text">
      <div class="tm-li-session-title">
        <span>{{ title }}</span>
      </div>
    </div>
    <!-- <div class="tm-li-session-icon">
      <i class="material-icons">arrow_forward</i>
    </div> -->
  </router-link>
</template>

<script>
export default {
  name: `tm-li-session`,
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    route: {
      type: String,
      default: ``
    }
  }
}
</script>

<style scoped>
.tm-li-session {
  display: flex;
  padding: 1rem;
  margin-bottom: 0.5rem;
  /* border: 1px solid #c7c7c7; */
  background: #d6ddef;
  border-radius: 3px;
  width: 49%;
}

.tm-li-session:hover {
  cursor: pointer;
  /* background: var(--hover-bg); */
}

.tm-li-session-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tm-li-session-icon i {
  font-size: 1.25rem;
}

.tm-li-session-title {
  color: #004bff;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
}

.tm-li-session-text {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
}

.material-icons.circle {
  border: 2px solid black;
  border-radius: 50%;
  padding: 0.5rem;
}
</style>
