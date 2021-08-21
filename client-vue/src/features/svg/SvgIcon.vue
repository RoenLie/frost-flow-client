<script setup lang="ts">
import icons from "/assets/iconsheet.svg"

type SvgIconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
interface ISvgIconProps {
   svgName: string;
   size?: SvgIconSize;
   width?: string;
   onClick?: ( e: any ) => any;
   style?: any
}
const {svgName,size, width, onClick, style} = defineProps<ISvgIconProps>();

const iconSize = {
   xsmall: '0.75rem',
   small: '1rem',
   medium: '1.5rem',
   large: '3rem',
   xlarge: '5rem'
};

const iconStyle = {
   width: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ],
   height: size ? iconSize[ size ] : width ? width : iconSize[ 'medium' ],
   ...style
};

</script>

<template>
  <div
    class="svgWrapper"
    :style="iconStyle"
    @click="onClick"
  >
    <suspense>
      <template #default>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <use :xlink:href="icons+ '#icon-' + svgName" />
        </svg>
      </template>
      <template #fallback>
        ...
      </template>
    </suspense>
  </div>
</template>

<style scoped>
.svgWrapper {
   display: grid;
}

.svgWrapper>svg {
   height: 100%;
   width: 100%;
   pointer-events: none;
}
</style>