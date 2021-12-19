<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="(trademark, index) in trademarkList"
            :key="trademark.tmId"
            @click="trademarkHandler(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="(attrs, index) in attrsList">
      <div class="fl key">{{ attrs.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="attrvalue in attrs.attrValueList">
            <a 
            @click="attrsHandler(attrs,attrvalue)">{{ attrvalue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchSelector",
  computed: { ...mapGetters(["attrsList", "trademarkList"]) },
  methods: {
    trademarkHandler(trademark) {
      this.$emit("trademarkValue", trademark);
    },
    attrsHandler(attrs,attrvalue){
      this.$emit("attrsValue", attrs,attrvalue);
    }
  },
};
</script>

<style scoped>
@import '~@/css/searchselector.css'
</style>