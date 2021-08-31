<script lang="ts">
   import { page } from "$app/stores";
   import "../app.css";
   import "reflect-metadata";
</script>

<template>
   <main class="main">
      <section class="header">
         <div class="headerLeftNav" />

         <nav class="headerCenterNav">
            <a sveltekit:prefetch href="/">
               <div class:active={$page.path === "/"}>Home</div>
            </a>
            <a sveltekit:prefetch href="/workflow">
               <div class:active={$page.path === "/workflow"}>Workflow</div>
            </a>
         </nav>

         <div class="headerRightNav">
            <div>
               <!-- <SvgIcon svg-name="user-solid" /> -->
            </div>
         </div>
      </section>

      <section class="content">
         <slot />
      </section>
   </main>
</template>

<style lang="scss">
   .main {
      color: var(--light-txt-1);
      background-color: var(--dark-5);

      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;

      overflow: hidden;
   }

   .header {
      background-color: var(--dark-1);
      border-bottom: 2px solid;
      border-image: linear-gradient(to right, var(--red-deep-1), var(--dark-1))
         1 stretch;
      min-height: 3.5rem;

      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;

      & .headerLeftNav {
         padding: 0 1rem;
         display: grid;
         place-items: center;
      }

      & .headerCenterNav {
         display: grid;
         grid-auto-flow: column dense;
         grid-auto-columns: min-content;

         & > * {
            display: flex;
            flex-flow: column nowrap;
            align-content: center;
            justify-content: center;
            padding: 0 1rem;
            user-select: none;
            text-decoration: none;
            color: var(--light-txt-1);

            &:hover {
               background-color: var(--dark-3);
               border-radius: var(--border-radius-1);
               cursor: pointer;

               & > * {
                  border-bottom: 1px solid var(--blue-highlight-1);
               }
            }

            & > .active {
               border-bottom: 1px solid var(--blue-highlight-1);
            }
         }
      }

      & .headerRightNav {
         padding: 0 1rem;
         display: grid;
         place-items: center;

         & > *:hover {
            cursor: pointer;
            color: var(--blue-highlight-1);
         }
      }
   }

   .content {
      height: 100%;
      overflow: auto;
   }
</style>
