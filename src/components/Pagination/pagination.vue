<template>
  <div>
    <div class="page clearfix">
      <button @click="prePage">上一页</button>
      <button v-if="pageNo > parseInt(continues / 2) + 1" @click="goPage(1)">
        1
      </button>
      <button v-if="pageNo > parseInt(continues / 2) + 2">···</button>

      <button
        v-for="(page, index) in startPageAndEndPage"
        :key="index"
        :class="{ active: page == pageNo }"
        @click="goPage(page)"
      >
        {{ page }}
      </button>

      <button v-if="pageNo < finalPage - parseInt(continues / 2) - 1">
        ···
      </button>
      <button
        v-if="pageNo < finalPage - parseInt(continues / 2)"
        @click="goPage(finalPage)"
      >
        {{ finalPage }}
      </button>
      <button @click="nextPage">下一页</button>

      <button style="margin-left: 30px">共 {{ finalPage }} 页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      continuePage: [],
    };
  },
  props: ["pageNo", "pageSize", "total", "continues"],
  mounted() {},
  components: {},

  computed: {
    finalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startPageAndEndPage() {
      const { finalPage, continues, pageNo } = this;
      let start = 0,
        end = 0;
      if (finalPage < continues) {
        start = 1;
        end = this.finalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > finalPage) {
          start = finalPage - continues + 1;
          end = finalPage;
        }
      }
      let arr = [];
      for (let i = start; i <= end; i++) arr.push(i);
      return arr;
    },
  },

  methods: {
    goPage(page) {
      this.$emit("getPage", page);
    },
    prePage() {
      if (this.pageNo > 1) {
        this.$emit("getPage", this.pageNo - 1);
      }
    },
    nextPage() {
      if (this.pageNo < this.finalPage) {
        this.$emit("getPage", this.pageNo + 1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  margin: 30px 220px;
  button {
    // margin: 0 5px;
    // margin-left: -1px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    // border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 58px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;


    &.active {
      background-color: #c81623;
      color: #fff;
    }

    &:hover {
      border: 1.5px solid #c81623;
    }
  }
}
</style>