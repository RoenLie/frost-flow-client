<script lang="ts" setup>
// console.log("hello from card");
const kake = "kake";
</script>

<!--  -->

<template>
  <div class="card">
    CARD
    {{ kake }}
  </div>
</template>

<!--  -->

<style scoped lang="scss">
.card {
   display: grid;
   place-items: center;
   width: 10rem;
   height: 10rem;
   background-color: pink;
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