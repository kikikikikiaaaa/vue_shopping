<!--  -->
<template>
  <div>
    <TypeNav />
    <Main />
    <Recom />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Typenav from "@/components/TypeNav/typenav.vue";
import Main from "./Main/main.vue";
import Recom from "./Recommon/recom.vue";
import Floor from "./Floor/floor.vue";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  components: { Typenav, Main, Recom, Floor },

  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {},
};
</script>
<style  scoped>
</style>