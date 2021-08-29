<script lang="ts">

type BeforeRouteEnterHook = (to: any, from: any, next: (vm?: any) => void) => void;
export default {
   // called before the route that renders this component is confirmed.
   // does NOT have access to `this` component instance,
   // because it has not been created yet when this guard is called!
   beforeRouteEnter: function(to, from, next) {
      // console.log("workspace: before route enter");
      const initialDomain = to.query['domain'];
      const cargo = cargoLoader2(['workspace'], initialDomain, {debug:false});
      const queryService = cargo.get<IQueryService>(IQueryService);

      const domains = queryService
         .flattenMapNodeTree(queryService
            .jsonToMapNodeTree(dummyDomains));

      const correctedQuery = queryService.ensureMandatoryQueriesExist(to.query, dummyModules, domains);
      const queryCorrect = queryService.queryCompare(correctedQuery, to.query);

      if (!queryCorrect) next({...to, query: {...to.query, ...correctedQuery}});
      else next();
   } as BeforeRouteEnterHook,
   // called when the route that renders this component has changed.
   // This component being reused (by using an explicit `key`) in the new route or not doesn't change anything.
   // For example, for a route with dynamic params `/foo/:id`, when we
   // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
   // will be reused (unless you provided a `key` to `<router-view>`), and this hook will be called when that happens.
   // has access to `this` component instance.
   // beforeRouteUpdate(to, from, next) {
   //    console.log("workspace: before route update");
   //    next();
   // },
   // called when the route that renders this component is about to
   // be navigated away from.
   // has access to `this` component instance.
   // beforeRouteLeave(to, from, next) {
   //    console.log("workspace: before route leave");
   //    next();
   // }
}
</script>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { WORKFLOW_PROVIDERS } from "~/features/workspace/providers";
import { dummyDomains, dummyModules } from "~/features/workspace/dummydata";
import { cargoLoader2 } from "~/inversify/APP/CORE/features/cargoLoader-v2";
import { IQueryService } from "~/inversify/APP/CORE/modules/core.workspace.module";

const router = useRouter();
const currentRoute = router.currentRoute;
const initialModule = router.currentRoute.value.query['module']  as string || '';
const initialDomain = router.currentRoute.value.query['domain'] as string || '';
const initialPath = router.currentRoute.value.path;

const cargo = cargoLoader2(['workspace'], initialDomain, {debug:false});
const queryService = cargo.get<IQueryService>(IQueryService);

type WorkspaceRoute = {title: string, to: string, icon: string};
const workspaceRoutes: WorkspaceRoute[] = [
   {title: 'home', to: '/workspace/home', icon: 'home-solid'},
   {title: 'list', to: '/workspace/list', icon: 'list-solid'},
   {title: 'document', to: '/workspace/document', icon: 'file-regular'},
   {title: 'settings', to: '/workspace/settings', icon: 'cog-solid'},
]

const domains = ref(queryService.jsonToMapNodeTree(dummyDomains));
const domain = ref(queryService.defaultDomain);
const setDomain = (v: string) => domain.value = v;

const modules = ref(dummyModules);
const module = ref(queryService.defaultModule);
const setModule = (v: string) => module.value = v;
const activeRoute = ref(workspaceRoutes.find(r => r.to == initialPath));

if (initialModule) module.value = initialModule as string;
if (initialDomain) domain.value = initialDomain as string;

/* Actions */
const selectRoute = (route: WorkspaceRoute) => activeRoute.value = route;

const updatePath = (
   to: string | undefined,
   keepQuery: boolean = true,
   keepParams: boolean = false
) => {
   const query = keepQuery ? {...router.currentRoute.value.query} : {};
   const params = keepParams ? {...router.currentRoute.value.params} : {};
   router.push({ path: to || '', query, params });
}

const updateQuery = (key: string, value: string) => {
   router.push({
      path: currentRoute.value.path,
      query: {...currentRoute.value.query, [key]: value}
   });
}

/* Router hooks */
/* Computed properties */

/* Watchers */
watch(activeRoute, val => updatePath(val?.to));
watch(domain, val => updateQuery('domain', val));
watch(module, val => updateQuery('module', val));

/* Lifecycle hooks */
onBeforeMount(() => { });
onBeforeUnmount(() => { });

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