<script lang="ts" setup>
console.log("hello from card extend.");
</script>

<!--  -->

<template>
  <div class="card">
    CARD OVERRIDE
  </div>
</template>

<!--  -->

<style scoped lang="scss">
.card {
   // background-color: purple;
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