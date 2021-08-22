<script lang="ts" setup>
console.log("hello from graph");
</script>
   
<!--  -->
   
<template>
  <div class="graph">
    GRAPH
  </div>
</template>
   
<!--  -->
   
<style scoped lang="scss">
.graph {
   display: grid;
   place-items: center;
   width: 10rem;
   height: 10rem;
   background-color: powderblue;
   color: black;
}
</style>

<!--  -->

<eyeshare lang="yaml">
overridable:
   - template
   - script
   - style
extendable:
   - template
   - script
   - style
</eyeshare>