<script setup lang="ts">
import { RouteLocationNormalized, useRouter } from "vue-router";
import { dummyDomains, dummyModules } from "~/features/workspace/dummydata";
import { jsonToMapNodeTree, MapNode } from "~/features/workspace/helpers/jsonToMapNode";
import { WORKFLOW_PROVIDERS } from "~/features/workspace/providers";

const workspaceRoutes = [
   {title: 'home', to: '/workspace/home', icon: 'home-solid'},
   {title: 'list', to: '/workspace/list', icon: 'list-solid'},
   {title: 'document', to: '/workspace/document', icon: 'file-regular'},
   {title: 'settings', to: '/workspace/settings', icon: 'cog-solid'},
]

const domains = ref(jsonToMapNodeTree(dummyDomains));
const defaultDomain = 'SYS';
const domain = ref(defaultDomain);
const setDomain = (v: string) => domain.value = v;

const modules = ref(dummyModules);
const defaultModule = 'costinvoice';
const module = ref(defaultModule);
const setModule = (v: string) => {
   module.value = v;
}

/* Router logic */
const router = useRouter();
const currentRoute = router.currentRoute;

const initialPath = router.currentRoute.value.path;
const activeRoute = ref(workspaceRoutes.find(r => r.to == initialPath));

const selectRoute = (route: {title: string, to: string, icon: string}) => {
   activeRoute.value = route
}

const ensureMandatoryQueriesExist = (route: RouteLocationNormalized) => {
   const _query = JSON.parse(JSON.stringify(route.query));

   const existingModuleQuery = _query['module'] || '';
   const existingDomainQuery = _query['domain'] || '';
   
   const moduleIsValid = modules.value.includes(existingModuleQuery as string);
   const domainIsValid = allDomainsFlat.value.includes(existingDomainQuery);

   if (!moduleIsValid) _query['module'] = defaultModule;
   if (!domainIsValid) _query['domain'] = defaultDomain;

   return _query;
}

/* Router hooks */
const beforeResolveHook = router.beforeResolve( async (route) => {
   const query = ensureMandatoryQueriesExist(route);
   route.query = query;
})

/* Computed properties */

const allDomainsFlat = computed(() => {
   const domainList = [] as any[];

   const returnValues = (map: MapNode) => {
      const values = [] as any[]
      if (!map.size) return values;

      const keys = map.keys();
      for (const key of keys) {
         values.push([key]);
      }

      map.forEach(m => {
         values.push(returnValues(m));
      })

      return values;
   }

   domains.value.forEach(d => domainList.push(returnValues(d)));

   const flattened = domainList.flat(Infinity);
   return flattened;
});

/* Watchers */
watch(activeRoute, val => {
   router.push({path: val?.to, query: {...router.currentRoute.value.query}});
});

watch(domain, val => {
   const query = ensureMandatoryQueriesExist(currentRoute.value);
   router.push({
      path: currentRoute.value.path,
      query: {...query, domain: val}
   });
})

watch(module, val => {
   const query = ensureMandatoryQueriesExist(currentRoute.value);
   router.push({
      path: currentRoute.value.path,
      query: {...query, module: val}
   });
})

/* Lifecycle hooks */
onBeforeMount(() => {
   // const query = ensureMandatoryQueriesExist(currentRoute.value);
   // router.push({path: initialPath, query: {...query}});
});
   
onBeforeUnmount(() => {
   beforeResolveHook();
})

/* Providers */

provide(WORKFLOW_PROVIDERS.Domains, domains );
provide(WORKFLOW_PROVIDERS.Modules, modules );
provide(WORKFLOW_PROVIDERS.Domain, {get: domain, set: setDomain} );
provide(WORKFLOW_PROVIDERS.Module, {get: module, set: setModule} );
</script>
   
   
<template>
  <div class="workspaceHost">
    <section class="nav">
      <router-link
        v-for="route in workspaceRoutes"
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
.workspaceHost {
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