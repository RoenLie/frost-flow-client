<script lang="ts">
   import icons from "~/assets/iconsheet.svg";

   export let svgName = "";
   export let size = "medium";
   export let width = "";
   export let onClick = () => {
      console.log("default on click");
   };
   export let style = {};

   const iconSize = {
      xsmall: "0.75rem",
      small: "1rem",
      medium: "1.5rem",
      large: "3rem",
      xlarge: "5rem",
   };

   $: iconStyle = {
      width: size ? iconSize[size] : width ? width : iconSize["medium"],
      height: size ? iconSize[size] : width ? width : iconSize["medium"],
      ...style,
   };
</script>

<template>
   <div
      class="svgWrapper"
      style={Object.entries(iconStyle)
         .map((e) => e.join(":"))
         .join(";")}
      on:click={onClick}
   >
      <svg
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
      >
         <use xlink:href={icons + "#icon-" + svgName} />
      </svg>
   </div>
</template>

<style>
   .svgWrapper {
      display: grid;
   }

   .svgWrapper > svg {
      height: 100%;
      width: 100%;
      pointer-events: none;
   }
</style>
