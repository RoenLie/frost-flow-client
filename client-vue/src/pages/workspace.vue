<script setup lang="ts">
import { RouteLocationNormalized, useRouter } from "vue-router";
import { Container } from "inversify";
import { IWorkflowContext } from "~/inversify/context/interfaces";
// import { TYPES } from "~/inversify/context/types";
// import { ModuleContext, Travel } from "~/inversify/context/entities";
// import { TravelIntegration } from "~/inversify/context/plugins/int.travel.container";

const workspaceRoutes = [
   {title: 'home', to: '/workspace/home', icon: 'home-solid'},
   {title: 'list', to: '/workspace/list', icon: 'list-solid'},
   {title: 'document', to: '/workspace/document', icon: 'file-regular'},
   {title: 'settings', to: '/workspace/settings', icon: 'cog-solid'},
]

const workspaceModules = [
   {name: 'invoice', container: () => import("~/inversify/context/containers/invoice.container").then(_=>_.invoiceContainer)},
   {name: 'costinvoice', container: () => import("~/inversify/context/containers/costInvoice.container").then(_=>_.costInvoiceContainer)},
   {name: 'travel', container: () => import("~/inversify/context/containers/travel.container").then(_=>_.travelContainer)},
]

const router = useRouter();
const currentRoute = router.currentRoute;
const initialModuleName = currentRoute.value.params['module'];
const initialModule = workspaceModules.find(m => m.name == initialModuleName);
const initialPath = router.currentRoute.value.path;
const activeRoute = ref(workspaceRoutes.find(r => r.to == initialPath));

const selectRoute = (route: {title: string, to: string, icon: string}) => {
   activeRoute.value = route
}
watch(activeRoute, val => {
   router.push({path: val?.to, params: { ...router.currentRoute.value.params }, query: {...router.currentRoute.value.query}});
});

const setContext = async (route: RouteLocationNormalized) => {
   // console.log('before resolve arg', route);
   // const moduleName = route.params['module'];
   // const module = workspaceModules.find(m => m.name == moduleName);
   // if (!module) return;

   // const container = await module.container();


   // const resolvedContext = container.get<IWorkflowContext>(TYPES.Workflow);
   // const resolvedContext = container.getAll<IWorkflowContext>(TYPES.Workflow);
   // const resolvedContext = container.resolve<IWorkflowContext>(Travel);
   // const resolvedContext = container.get<ModuleContext>(TYPES.Context);

   // console.log(resolvedContext);

   // context.value = resolvedContext as IWorkflowContext;
}

const beforeResolveHook = router.beforeResolve( async (route) => {
   await setContext(route);
})

onBeforeMount(async () => {
   await setContext(router.currentRoute.value);
});

onBeforeUnmount(() => {
   beforeResolveHook();
})

const context = ref<IWorkflowContext[] | Promise<Container> | null>(initialModule ? initialModule.container() : null);
provide("WorkflowContext", context);

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