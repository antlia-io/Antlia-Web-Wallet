<template>
  <menu>
    <router-link
      class="mobile-menu-item"
      to="/wallet"
      exact="exact"
      title="Wallet"
    >
      <i class="material-icons">home</i>
      <h2 class="app-menu-title">
        Wallet
      </h2>
    </router-link>
    <router-link class="mobile-menu-item" to="/staking/my-delegations" title="Staking">
      <i class="material-icons">swap_horiz</i>
      <h2 class="app-menu-title">
        Staking
      </h2>
    </router-link>
    <router-link class="mobile-menu-item" to="/governance/proposals" title="Governance">
      <i class="material-icons">transfer_within_a_station</i>
      <h2 class="app-menu-title">
        Governance
      </h2>
    </router-link>
    <router-link
      class="mobile-menu-item"
      to="/"
      exact="exact"
      title="Network"
    >
      <i class="material-icons">my_location</i>
      <h2 class="app-menu-title">
        Network
      </h2>
    </router-link>
  </menu>
</template>

<script>
export default {
  name: `mobile-menu`
}
</script>

<style scoped>
menu {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  z-index: calc(var(--z-appHeader) - 2);
  background: #232021;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}

menu a {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.4rem;
  width: 25%;
}

menu a i {
  font-size: 18px;
}

.mobile-menu-item.router-link-active {
  color: var(--tertiary);
}

menu a:not(.router-link-active) {
  color: var(--bright) !important;
}

menu a h2 {
  padding-top: 2px;
  font-size: 8px;
  font-weight: 500;
}

i.material-icons {
    margin: 0
}

@media screen and (min-width: 668px) {
  menu {
    display: none;
  }
}
</style>