<template>
  <div class="row headerbg">
    <div class="col-lg-8 col-md-9 col-sm-12">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.pathName"
        :class="{ 'tab-selected': $route.name === tab.pathName }"
        class="tab"
      >
        <router-link :to="{ name: tab.pathName }">
          {{ tab.displayName }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-md-3 col-sm-12 search-field" v-if="settings">
    <div>
    <input type="text" name="Search" placeholder="Search" class="form-control"/>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: `tabs`,
  props: {
    settings:{
      type: Boolean,
      default: true,

    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tabIndex: 1
    }
  }
}
</script>
<style scoped>
.settings-page .headerbg{ 
  background: transparent;
}
 .headerbg{
   background: #131d49;
 }
.tabs {
  display: flex;
  margin: 1.5rem 0;
}

.tabs .tab a {
  color: #fff;
  display: block;
  font-weight: 500;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
}

.tabs .tab a:hover {
  color: #fff;
}

.tabs .tab.tab-selected {
  /* border-bottom: 2px solid #0a73b1; */
  background: #004bff;
  border-radius: 5px;
}

.tabs .tab.tab-selected a {
  color: #fff;
}
.search-field{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.search-field .form-control{
  border-radius: 2rem;
}
@media(max-width:767px){
  .tabs {
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-content: center;
}
  .search-field{
  justify-content: center;
  margin: 0 0 1.5rem;
}

}
@media(max-width:414px){
 .search-field div{
  width: 100%;
}
}
</style>
