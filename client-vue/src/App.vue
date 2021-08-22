<script lang="ts" setup>
import { useHead } from '@vueuse/head'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
   title: 'Frostflow Vue',
   meta: [
      { name: 'description', content: 'Testing ground for the frostflow client in vue' },
   ],
})
</script>

<template>
  <router-view />
</template>
