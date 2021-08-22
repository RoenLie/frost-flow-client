<script lang="ts" setup>
console.log("hello from graph extend");
</script>
   
<!--  -->
   
<template>
  <div class="graph">
    GRAPH OVERRIDDEN TEMPLATE
  </div>
</template>

<!--  -->

<style scoped lang="scss">
.graph {
   background-color: seagreen !important;
   color: white;
}
</style>

<!--  -->

<eyeshare lang="yaml">
overrides:
   - template
extends:
   - style
   - script
</eyeshare>