<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const currentRoute = router.currentRoute.value;

const companies = ref(['high', 'middle', 'low']);

const initialCompany = () => {
   const queryCompany = currentRoute.query['company'] as string;
   const validQueryCompany = companies.value.includes(queryCompany);
   return validQueryCompany ? queryCompany : companies.value[0];
}

const company = ref(initialCompany());

router.push({
   path: currentRoute.path,
   query: {
      ...router.currentRoute.value.query, 
      company: currentRoute.query['company'] || company.value
   }
});

watch(company, (val) => {
   router.push({path:router.currentRoute.value.path, query: {company: val}})
})
</script>


<template>
  <div>
    <h1>WORKSPACE HOME</h1>
    <select v-model="company">
      <option
        v-for="company in companies"
        :key="company"
        :value="company"
      >
        {{ company }}
      </option>
    </select>
  </div>
</template>