<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '~/stores/user';

const user = useUserStore();
const name = ref( user.savedName );

const router = useRouter();
const go = () => {
   if ( name.value )
      router.push( `/hi/${ encodeURIComponent( name.value ) }` );
};

const { t } = useI18n();
</script>

<template>
  <div>
    {{ t('ROOT') }}
    <button @click="go">
      GO
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
