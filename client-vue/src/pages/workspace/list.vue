<script lang="ts" setup>
</script>


<template>
  <div class="host">
    <section class="moduleTabs">
      <ModuleTabs />
    </section>
    <section class="actionBar">
      <div>action bar</div>
    </section>
    <section class="listView">
      <div>list view</div>
    </section>
    <section class="documentView">
      <DocumentView />
    </section>
    <section class="documentGrid">
      <div>document grid</div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.host {
   display: grid;
   grid-template-areas: 
   "moduleTabs moduleTabs moduleTabs"
   "actionBar listView documentView"
   "actionBar documentGrid documentGrid";

   grid-template-rows: 3rem 1fr auto;
   grid-template-columns: 3rem 1fr auto;

   >section {
      display: grid;
   }
}

.moduleTabs {
   grid-area: moduleTabs;
   background-color: rgb(70,70,70);
}
.actionBar {
   grid-area: actionBar;
   background-color: rgb(45,45,45);
}
.listView {
   grid-area: listView;
}
.documentView {
   grid-area: documentView;
   max-width: 50vw;
   width: 20rem;
   background-color: rgb(40,40,40);
}
.documentGrid {
   grid-area: documentGrid;
   max-height: 50vh;
   height: 10rem;
   background-color: rgb(35,35,35);
}
</style>