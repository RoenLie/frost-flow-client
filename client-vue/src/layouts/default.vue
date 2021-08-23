<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const initialRoute = '/' + router.currentRoute.value.path.split('/')[1];

const mainRoutes = [
   { label: "Home", to: "/home" },
   { label: "Epoch", to: "/epoch" },
   { label: "Workspace", to: "/workspace" },
];
const activeRoute = ref(mainRoutes.find(r => r.to == initialRoute));

const openProfile = () => {
   console.log( "opening profile" );
};

</script>


<template>
  <main class="main">
    <section class="header">
      <div class="headerLeftNav" />

      <nav class="headerCenterNav">
        <router-link
          v-for="route in mainRoutes "
          :key=" route.label "
          :to=" route.to "
          @click="() => activeRoute = route"
        >
          <div :class="{'active': route.to == activeRoute?.to}">
            {{ route.label }}
          </div>
        </router-link>
      </nav>

      <div
        class="headerRightNav"
        @click="openProfile"
      >
        <div>
          <SvgIcon svg-name="user-solid" />
        </div>
      </div>
    </section>

    <section class="content">
      <router-view />
    </section>

    <!-- <ModalPortal serviceProvider={ rootModalService }></ModalPortal>
      <ToastPortal serviceProvider={ rootToastService }></ToastPortal>-->
  </main>
</template>


<style lang="scss" scoped>
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
   border-image: linear-gradient(to right, var(--red-deep-1), var(--dark-1)) 1
      stretch;
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

      &>*:hover {
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
