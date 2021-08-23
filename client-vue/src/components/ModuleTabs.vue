<script lang="ts" setup>
import { useRouter } from "vue-router";
const tabs = ref(['new', 'inprogress', 'ready', 'transferred']);
const tab = ref(tabs.value[0]);

const router = useRouter();
const currentRoute = router.currentRoute.value;
router.push({
   ...currentRoute,
   query: {
      ...currentRoute.query,
      module: currentRoute.query['module']  || tab.value
   }
});

watch(tab, (val) => {
   tab.value = val;
   router.push({...router.currentRoute.value, query: {...router.currentRoute.value.query, module: tab.value}});
})

const selectModule = (module: string) => {
   tab.value = module;
}
</script>

<template>
  <div class="moduleTabsHost">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="moduleTab"
      :class="{'active': router.currentRoute.value.query['module'] == tab}"
      @click="() => selectModule(tab)"
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