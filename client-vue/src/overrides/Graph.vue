<script lang="ts" setup>
console.log("hello from graph override");
</script>
   
<!--  -->
   
<template>
  <div>
    GRAPH OVERRIDDEN TEMPLATE
  </div>
</template>
   
<!--  -->

<style scoped lang="scss">
.graph {
   background-color: seagreen;
   color: white;
}
</style>

<!--  -->

<eyeshare lang="yaml">
overrides:
   - template
extends:
   - script
   - style
</eyeshare>