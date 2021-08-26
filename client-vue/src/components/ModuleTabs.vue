<script lang="ts" setup>
import { Ref } from "vue";
import { useRouter } from "vue-router";
import { Injected, WORKFLOW_PROVIDERS } from "~/features/workspace/providers";

const tabs = inject<Ref<string[]>>(WORKFLOW_PROVIDERS.Modules);
const { set: setModule } = inject(WORKFLOW_PROVIDERS.Module) as Injected<string>;

const router = useRouter();
const currentRoute = router.currentRoute;
</script>


<template>
  <div class="moduleTabsHost">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="moduleTab"
      :class="{'active': currentRoute.query['module'] == tab}"
      @click="() => setModule(tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>


<style lang="scss" scoped>
.moduleTabsHost {
   display: grid;
   grid-auto-flow: column dense;
   grid-auto-columns: 10rem;
   overflow-y: hidden;
   overflow-x: auto;
}
.moduleTab {
   display: grid;
   place-items: center;
   background-color: rgb(100,100,255);
   user-select: none;
   &:hover, &.active {
      cursor: pointer;
      background-color: rgb(60,60,255);
   }
}
</style>