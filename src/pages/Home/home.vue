<!--  -->
<template>
  <div>
      <TypeNav/>
      <Focus/>
      <Recom/>
      <Floor/>
      <Floor/>
  </div>
</template>

<script>
import Typenav from '@/components/TypeNav/typenav.vue';
import Focus from './Focus/focus.vue'
import Recom from './Recommon/recom.vue'
import Floor from './Floor/floor.vue'
export default {
  name:'',
  data () {
    return {
    };
  },

  components: {Typenav,Focus,Recom,Floor},

  computed: {},

  methods: {}
}

</script>
<style  scoped>
</style>