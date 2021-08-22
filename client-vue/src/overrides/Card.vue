<script lang="ts" setup>
console.log("hello from card extend");
</script>

<!--  -->

<template>
  <div class="card">
    CARD OVERRIDDEN TEMPLATE
  </div>
</template>

<!--  -->

<style scoped lang="scss">
.card {
   background-color: seagreen !important;
   color: white;
}
</style>

<!--  -->

<eyeshare lang="yaml">
overrides:
   - template
   - style
extends:
   - script
</eyeshare>