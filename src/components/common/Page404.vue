<template>
  <TmPage id="page404" data-title="404" class="four-oh-four" hide-header>
    <!-- <TmPart class="four-oh-four-top"> -->
      <h1>404</h1>
      <h3>Oops! We can't find the page you're looking for.</h3>
       <router-link to="/" class="back-home">
            <i class="material-icons">keyboard_arrow_left</i> Back to Home
          </router-link>
      <!-- <h3>Error code: 404</h3> -->
    <!-- </TmPart> -->
    <!-- <TmPart>
      <p class="para">Here are some helpful links to get you out of here:</p>
      <ul>
        <li>
          <router-link to="/">
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
    </TmPart> -->
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
  background: #1c203e;
  /* border-left: 1px solid var(--bc
  -dim); */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 5rem 0;
}

.four-oh-four h1 {
  color: red;
  font-size: 150px;
  font-weight: 500;
  line-height: 10rem;
  text-align: center;
}

.four-oh-four h3 {
  color: white;
  font-size: var(--h3);
  font-weight: 500;
  margin-top: 3rem;
  text-align: center;
}
.back-home{
  color: #848688;
  font-size: var(--h3);
  font-weight: 500;
  margin: 3rem auto; 
  text-align: center;
  background: #2c3255;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
}
.back-home .material-icons{
  color: #848688;
  font-size: 3rem;
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
