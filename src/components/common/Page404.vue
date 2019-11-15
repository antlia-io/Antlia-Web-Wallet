<template>
  <TmPage id="page404" data-title="404" class="four-oh-four" hide-header>
    <TmPart class="four-oh-four-top">
      <h2>Oops! We can't find the page you're looking for.</h2>
      <h3>Error code: 404</h3>
    </TmPart>
    <TmPart>
      <p class="para">Here are some helpful links to get you out of here:</p>
      <ul>
        <li>
          <router-link to="/wallet">
            Wallet
          </router-link>
        </li>
        <li>
          <router-link to="/staking">
            Staking
          </router-link>
        </li>
        <li>
          <router-link to="/governance">
            Governance
          </router-link>
        </li>
        <li>
          <router-link to="/">
            Network
          </router-link>
        </li>
      </ul>
    </TmPart>
  </TmPage>
</template>

<script>
import TmPage from "common/TmPage"
import TmPart from "common/TmPart"
export default {
  name: `page-404`,
  components: {
    TmPage,
    TmPart
  }
}
</script>

<style>
.four-oh-four {
  padding: 2rem;
  margin: 1rem;
  background: white;
  border-left: 1px solid var(--bc-dim);
}

.four-oh-four h2 {
  color: black;
  font-size: var(--h1);
  font-weight: 500;
  line-height: 3rem;
}

.four-oh-four h3 {
  color: red;
  font-size: var(--h3);
  font-weight: 500;
  margin-top: 0;
}

#page404 #dockSidebar {
  display: none
}

.para {
  color: black
}

.four-oh-four ul {
  padding-top: 1rem;
}
</style>
