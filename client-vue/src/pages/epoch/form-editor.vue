<script setup lang="ts">
import { useRouter } from "vue-router";
   
const router = useRouter();

console.log(router.getRoutes());
   
</script>

<template>
  <div>form template</div>
</template>

<route lang="yaml">
meta:
   requiresAuth: true
</route>