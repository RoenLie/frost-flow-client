<script lang="ts">
   import { cargoLoader2 } from "~/inversify/APP/CORE/features/cargoLoader2";
   import { cargoLoader3 } from "~/inversify/APP/CORE/features/cargoLoader3";
   import { IDocumentService } from "~/inversify/APP/CORE/modules/core.document.module";

   // const [cargo] = cargoLoader2(["document"], "SYS", {});
   // const documentService = cargo.get<IDocumentService>(IDocumentService);

   const [cargo] = cargoLoader3("document", "SYS");
</script>

<template>
   <h1>Workflow List</h1>
   <h3>
      <!-- {documentService.documentTitle} -->
   </h3>
</template>
