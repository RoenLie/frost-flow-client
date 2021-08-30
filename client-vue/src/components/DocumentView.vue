<!-- <script lang="ts" setup>
// import { cargoLoader2 } from "~/inversify/APP/CORE/features/cargoLoader-v2";
// import { IDocumentService } from "~/inversify/APP/CORE/modules/core.document.module";
// const [cargo, unloader] = cargoLoader2(['list', 'document'], 'SYS', {debug:false});
// const documentService = cargo.get<IDocumentService>(IDocumentService);

onBeforeUnmount(() => {
   // serviceTes = null;
   // unloader();
   // documentService.randomdata = [];
})
</script> -->

<script lang="ts">   
import { CustomDocumentService } from "~/inversify/APP/CUS/modules/custom.document.module";

export default {
   setup() {
      let serviceTes = new CustomDocumentService();
      serviceTes.documentTitle;

      return {
         title: serviceTes.documentTitle
      }
   }
}
</script>


<template>
  <div>
    DOCUMENT VIEW
    <h1>{{ title }}</h1>
    <!-- <h1>{{ documentService.documentTitle }}</h1> -->
  </div>
</template>