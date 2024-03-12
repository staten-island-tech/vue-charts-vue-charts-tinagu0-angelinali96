<template>
    <div>
        <Dropdown v-model="a" :options="scores" placeholder="Select a School"  aria-label="School Selector" class="w-full md:w-14rem"/>
    </div>
</template>

<script>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';


const a = ref()
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

    }
}
</script>

<style scoped>

</style>