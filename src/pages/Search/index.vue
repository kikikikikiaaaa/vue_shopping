<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removecateName">×</i>
            </li>
            <li
              class="with-x"
              v-if="searchParams.keyword"
              @click="removeKeyword"
            >
              {{ searchParams.keyword }}<i>×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="removeAttrs(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          v-on:trademarkValue="addTrademark"
          v-on:attrsValue="addAttrs"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active:isOne  }" @click="changeOrder(1)">
                  <b>综合<i v-if="isOne" class="iconfont" :class="{'icon-jiantou_xiangshang':isUp,'icon-jiantou_xiangxia':isDown}" ></i></b>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <b>价格<i v-if="isTwo" class="iconfont" :class="{'icon-jiantou_xiangshang':isUp,'icon-jiantou_xiangxia':isDown}" ></i></b>
                </li>
              </ul>
            </div>
          </div>

          <!-- 商品详情开始 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goodlist, index) in goodsList"
                :key="goodlist.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goodlist.id}`" @click="goDetail(goodlist.id)"
                      ><img :src="goodlist.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goodlist.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href=""
                      title=""
                      >{{ goodlist.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 商品详情结束 -->

          <!-- 分页器开始 -->
          <Pagination :pageNo=searchParams.pageNo :pageSize=searchParams.pageSize :total="total" :continues='5' v-on:getPage='getPage'/>
          <!-- 分页器结束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/store/search';
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined,
        keyword: undefined,
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: undefined,
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isUp() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDown() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    getPage(page){
      this.searchParams.pageNo=page
     this.getData()
    },
    addTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    addAttrs(attr, attrvalue) {
      let props = `${attr.attrId}:${attrvalue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    removeAttrs(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    removecateName() {
      let Params = this.searchParams;
      [
        Params.categoryName,
        Params.category1Id,
        Params.category2Id,
        Params.category3Id
      ] = [undefined, undefined, undefined, undefined];
      this.$router.push({
        name: "search",
        params: this.$route.params,
        query: { undefined },
      });
      this.getData();
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$router.push({
        name: "search",
        params: { keyword: undefined },
        query: this.$route.query,
      });
      this.getData();
      this.$bus.$emit("clear");
    },
    changeOrder(flag) {
      let orginFlag = this.searchParams.order.split(":")[0];
      let orginSort = this.searchParams.order.split(":")[1];
      if (flag == orginFlag) {
        if (orginSort == "asc") {
          orginSort = "desc";
        } else {
          orginSort = "asc";
        }
      } else {
        orginFlag = flag;
        orginSort = "desc";
      }
      this.searchParams.order = orginFlag + ":" + orginSort;
      this.getData()
    },
    goDetail(){
      console.log(1);
      this.router.push({name:'/detail'})
    }
  },
  watch: {
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      let Params = this.searchParams;
      [Params.category1Id, Params.category2Id, Params.category3Id] = [
        undefined,
        undefined,
        undefined,
      ];
    },
  },
};
</script>

<style  scoped>
@import '~@/css/search.css'
</style>