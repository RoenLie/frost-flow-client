<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { useI18n } from 'vue-i18n'
   
// const router = useRouter()
// const { t } = useI18n()
</script>
   
<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
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