<template>
  <div>
    <div class="main" v-for="item in questionArr" :key="item.date">
      <div class="item" @click="question(item.title)">
        <h2>{{item.title}}</h2>
        <span class="iconfont icon-user"></span>:{{item.writer}}
        <span class="iconfont icon-danju"></span>:{{item.date}}
        <br />
        <span class="iconfont icon-showpassword"></span>:{{item.describe}}
      </div>
    </div>
    <!--分页区-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionArr: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
        total: 0
      }
    };
  },
  created() {
   this.gettotal();
    this.getall();
  },
  methods: {
    async getall() {
      const result = await this.$http.post("/all", this.queryInfo);
      this.questionArr = result.data;
    },
    //监听 pagesize改变的事件（总页数）每页有多少个元素
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getall();
    },
    //监听 页码值改变的事件（当前页的改变）第几页
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getall();
    },
    //获取总条数
    async gettotal() {
      const data = await this.$http.get("/total");
      this.queryInfo.total = Number(data.data);
    },
    //跳转到问题的具体网页
    question(title) {
      window.sessionStorage.setItem("title",title);
      this.$router.push("/question");
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  border: 2px solid rgb(255, 79, 143);
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 10px;
  color:rgba(0,0,0,.7);
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  box-shadow: -2px -2px 7px -2px #000;
}
</style>