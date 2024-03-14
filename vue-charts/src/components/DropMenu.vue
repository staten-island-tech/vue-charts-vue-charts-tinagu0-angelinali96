<template>
    <div>
        <Dropdown v-model="selectedSchool" :options="schoolNames" placeholder="Select a School"  aria-label="School Selector" class="w-full md:w-14rem"/>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import Dropdown from 'primevue/dropdown';

/*
<Dropdown v-model="" // define a variable as the input selection from this dropdown
 :aria-label="" // label for wave
  editable checkmark // make dropdown searchable
   placeholder="Select School"
    :options="" // feed prop of list of schools; pull from api
     optionLabel="" // whatever object key points to school name
      optionValue=""/> // whatever object key points to the value of the school -> make it the index in the api
*/


export default {
    components: {
        Dropdown
    },
    props: {
        index: Number,
        scores: Array,
    },
    setup() {
        const selectedSchool = ref("");
        const schoolNames = computed(() => scores.value.map(school => school.school_name));
        return {
           selectedSchool,
           schoolNames
        }
            
    },
}
</script>

<style scoped>

</style>