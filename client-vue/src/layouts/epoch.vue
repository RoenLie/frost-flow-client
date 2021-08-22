<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { useI18n } from 'vue-i18n'
   
// const router = useRouter()
// const { t } = useI18n()
</script>
   
<template>
  <main>
    <div>
      <p>THIS IS EPOCH LAYOUT</p>
    </div>
    <router-view />
  </main>
</template>

<route lang="yaml">
   meta:
     layout: default
</route>