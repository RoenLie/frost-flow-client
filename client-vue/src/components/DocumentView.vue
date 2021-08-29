<script lang="ts" setup>
import { cargoLoader2 } from "~/inversify/APP/CORE/features/cargoLoader-v2";
import { IDocumentService } from "~/inversify/APP/CORE/modules/core.document.module";
const cargo = cargoLoader2(['list', 'document'], 'SYS', {debug:false});
const documentService = cargo.get<IDocumentService>(IDocumentService);

onBeforeUnmount(() => {
})
</script>


<template>
  <div>
    DOCUMENT VIEW
    <h1>{{ documentService.documentTitle }}</h1>
  </div>
</template>