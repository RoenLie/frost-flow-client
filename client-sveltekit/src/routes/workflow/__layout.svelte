<script lang="ts">
   import { page } from "$app/stores";
   import SvgIcon from "../../components/SvgIcon.svelte";
</script>

<template>
   <div class="workspaceHost">
      <section class="nav">
         <a sveltekit:prefetch href="/workflow/home">
            <SvgIcon
               svgName="home-solid"
               style={$page.path === "/workflow/home"
                  ? { color: "var(--blue-highlight-1)" }
                  : null}
            />
         </a>
         <a sveltekit:prefetch href="/workflow/list">
            <!-- <a href="/workflow/list"> -->
            <SvgIcon
               svgName="list-solid"
               style={$page.path === "/workflow/list"
                  ? { color: "var(--blue-highlight-1)" }
                  : null}
            />
         </a>
      </section>
      <section class="content">
         <slot />
      </section>
   </div>
</template>

<style lang="scss">
   .workspaceHost {
      height: 100%;

      display: grid;
      grid-template-areas: "nav content";
      grid-template-columns: 3rem 1fr;

      & > .nav {
         background-color: var(--dark-1);
         grid-area: nav;
         display: grid;
         grid-auto-flow: row dense;
         grid-auto-rows: min-content;
         align-items: center;

         border-right: 2px solid;
         border-image: linear-gradient(
               to bottom,
               var(--red-deep-1),
               var(--dark-1)
            )
            1 stretch;

         & > * {
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
         }
      }

      & > .content {
         grid-area: content;
         display: grid;
         overflow: hidden;
      }
   }
</style>
