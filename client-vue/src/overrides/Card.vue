<script lang="ts" setup>
console.log("hello from card override");

const kake2 = "not cake";
</script>

<!--  -->

<template>
  <div>
    CARD OVERRIDDEN TEMPLATE
    {{ kake2 }}
  </div>
</template>

<!--  -->

<style scoped lang="scss">
.card {
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