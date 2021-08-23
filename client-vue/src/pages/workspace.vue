<script setup lang="ts">
import { useRouter } from "vue-router";
   
const epochRoutes = [
   {title: 'home', to: '/workspace/home', icon: 'home-solid'},
   {title: 'list', to: '/workspace/list', icon: 'list-solid'},
   {title: 'document', to: '/workspace/document', icon: 'file-regular'},
   {title: 'settings', to: '/workspace/settings', icon: 'cog-solid'},
]

const router = useRouter();
const initialPath = router.currentRoute.value.path
const activeRoute = ref(epochRoutes.find(r => r.to == initialPath));

watch(activeRoute, val => {
   router.push({path: val?.to, query: {...router.currentRoute.value.query}});
});

const selectRoute = (route: {title: string, to: string, icon: string}) => {
   activeRoute.value = route
}

</script>
   
   
<template>
  <div class="host">
    <section class="nav">
      <router-link
        v-for="route in epochRoutes"
        :key="route.title"
        :title="route.title"
        :to="route.to"
        :class="{' active': activeRoute?.to == route.to}"
        @click="() => selectRoute(route)"
      >
        <SvgIcon
          :svg-name="route.icon"
          size="medium"
        />
      </router-link>
    </section>
    <section class="content">
      <suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </section>
  </div>
</template>
   
   
<style scoped lang="scss">
.host {
   height: 100%;

   display: grid;
   grid-template-areas: 'nav content';
   grid-template-columns: 3rem 1fr;

   &>.nav {
      background-color: var(--dark-1);
      grid-area: nav;
      display: grid;
      grid-auto-flow: row dense;
      grid-auto-rows: min-content;
      align-items: center;

      border-right: 2px solid;
      border-image: linear-gradient(to bottom, var(--red-deep-1), var(--dark-1)) 1 stretch;

      &>* {
         display: grid;
         place-items: center;
         text-decoration: none;
         color: var(--light-txt-2);
         padding: 0.5rem;

         &:hover {
            color: var(--blue-highlight-1);
            background-color: var(--dark-3);
            border-radius: var(--border-radius-1);
         }

         &.active {
            color: var(--blue-highlight-1);
         }
      }
   }

   &>.content {
      grid-area: content;
      display: grid;
      overflow: hidden;
   }
}
</style>


<route lang="yaml">
   meta:
      layout: default
</route>