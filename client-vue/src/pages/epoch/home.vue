<script lang="ts" setup>
// import { Berserker, Katana } from "~/inversify/entities";
// import { Warrior, Weapon } from "~/inversify/interfaces";
// import { myContainer } from "~/inversify/inversify.config";
// import { TYPES } from "~/inversify/types";

// const ninja = myContainer.get<Warrior>(TYPES.Warrior);
// // console.log( ninja.fight()); // true
// // console.log(ninja.sneak()); // true

// const warrior = myContainer.get<Berserker>("Warrior");
// console.log(warrior);


</script> 

<template>
  <section>
    <h1>HOME ROUTE</h1>
    <Card />
    <Graph />
  </section>
</template>


<style scoped lang="scss">
section {
   display: grid;
   place-items: center;
   grid-auto-rows: min-content;
}
</style>