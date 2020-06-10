<template>
  <div>
    <div class="main" v-for="item in myQuestion" :key="item._id">
      <div class="item" @click="question(item.title)">
         <h2>{{item.title}}</h2>
        <span class="iconfont icon-user"></span>:{{item.writer}}
        <span class="iconfont icon-danju"></span>:{{item.date}}
        <br />
        <span class="iconfont icon-showpassword"></span>:{{item.describe}}
        <el-button class="delete" type="warning" @click.stop="questionDelete(item.title,item.pagenum)">删除</el-button>
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
      questionAll: [],
      myQuestion: [],
      object: {
        name: window.sessionStorage.getItem("name")
      },
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
        total: 0
      }
    };
  },
  created() {
    this.getall();
  },
  methods: {
    async getall() {
      const result = await this.$http.post("/myquestion", this.object);
      this.queryInfo.total = result.data.length;
      this.questionAll = result.data;
      this.getThisPage();
    },
    //监听 pagesize改变的事件（总页数）每页有多少个元素
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getThisPage();
    },
    //监听 页码值改变的事件（当前页的改变）第几页
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getThisPage();
    },
    //分页：获取当前页的数据
    getThisPage() {
      var length = this.queryInfo.total;
      var pagenum = this.queryInfo.pagenum;
      var pagesize = this.queryInfo.pagesize;
      var first = (pagenum - 1) * pagesize;
      var last = (pagenum - 1) * pagesize + pagesize;
      if (last > length - 1) last = length;
      this.myQuestion = this.questionAll.slice(first, last);
    },
    //跳转到问题的具体网页
    question(title) {
      window.sessionStorage.setItem("title", title);
      this.$router.push("/question");
    },
    async questionDelete(title,pagenum) {
      const {data:result}=await this.$http.post("/questionDelete",{title:title,pagenum:pagenum});
      if(result=="error")return this.$message.error("删除失败");
      this.$message.success("黑历史被抹除了！");
      await this.getall();
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
  position: relative;
  padding-left: 10px;
  .delete {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 50px;
    height: 30px;
    text-align: center;
    padding: 0;
  }
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  box-shadow: -2px -2px 7px -2px #000;
}
</style>