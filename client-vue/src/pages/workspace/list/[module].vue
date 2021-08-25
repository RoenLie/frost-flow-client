<script lang="ts" setup>
import implement from "~/inversify/APP/implement";
import "~/inversify/APP/CORE/features/getContainer";
import { getContainer } from "~/inversify/APP/CORE/features/getContainer";

getContainer(implement.modules.accounting);











// import { container as sysContainer } from "~/inversify/APP/SYS/sys.container";
// import { AccountingService } from "~/inversify/APP/CORE/accounting/accounting.service";

// const container = coreContainer;
// const container = sysContainer;
// const accounting = container.get(AccountingService);
// const accounting = container.getNamed(Accounting, 'sys');
// const accounting = container.getAll(Accounting);
// console.log(accounting);
// const ListContext = container.get<AccountingListContext>(AccountingListContext);
// console.log(ListContext);


// const container = sysContainer;
// const test = container.get(AccountingService);
// console.log(test);



// const test = container.resolve(Accounting);
// console.log(test);

// const injectedContainer = inject<Ref<IWorkflowContext | Promise<Container> | null>>("WorkflowContext");
// const moduleContext = ref<IWorkflowContext>();

// onBeforeMount(() => {
//    console.log(moduleContext.value);
// })

// onMounted(() => {
//    console.log("module list mounted");
// })

// watch(() => injectedContainer?.value, async (val) => {
//    if (!val) return;
//    moduleContext.value = await val as IWorkflowContext;

//    console.log(moduleContext.value);
// },
// { immediate: true });

</script>


<template>
  <div class="listHost">
    <section class="moduleTabs">
      <ModuleTabs />
    </section>
    <section class="actionBar">
      <div>action bar</div>
    </section>
    <section class="listView">
      <div>list view</div>
    </section>
    <section class="documentView">
      <DocumentView />
    </section>
    <section class="documentGrid">
      <div>document grid</div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.listHost {
   display: grid;
   grid-template-areas: 
   "moduleTabs moduleTabs moduleTabs"
   "actionBar listView documentView"
   "actionBar documentGrid documentGrid";

   grid-template-rows: 3rem 1fr auto;
   grid-template-columns: 3rem 1fr auto;

   >section {
      display: grid;
   }
}

.moduleTabs {
   grid-area: moduleTabs;
   background-color: rgb(70,70,70);
}
.actionBar {
   grid-area: actionBar;
   background-color: rgb(45,45,45);
}
.listView {
   grid-area: listView;
}
.documentView {
   grid-area: documentView;
   max-width: 50vw;
   width: 20rem;
   background-color: rgb(40,40,40);
}
.documentGrid {
   grid-area: documentGrid;
   max-height: 50vh;
   height: 10rem;
   background-color: rgb(35,35,35);
}
</style>

<route>

</route>