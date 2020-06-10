<template>
  <div>
    <div class="theme">
      <h2>{{question.title}}</h2>
      口嗨人:{{question.writer}}
      口嗨时间:{{question.date}}
      <br />
      吹了什么:{{question.describe}}
    </div>
    <div
      class="context"
      v-for="item in question.context"
      :key="item.index"
    >
    <div class="index">{{item.index}}</div>
    <div>{{item.writer}}:{{item.message}}</div>
    <div class="time">{{item.date}}</div></div>
    <!--添加评论-->
    <div class="add">
    <el-input placeholder="请输入内容" clearable v-model="addform.message">
    </el-input>
    <!--添加按钮-->
    <el-button type="primary" round @click="addContext">评论</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: "",
        writer: "",
        date: "",
        describe: "",
        context: []
      },
      addform:{
        title:'',
        writer:'',
        date:'',
        message:'',
        index:0
      },
      index:0
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.question.title = window.sessionStorage.getItem("title");
      const { data: result } = await this.$http.post(
        "/question",
        this.question
      );
      this.question.title = result[0].title;
      this.question.writer = result[0].writer;
      this.question.date = result[0].date;
      this.question.describe = result[0].describe;
      this.question.context = result[0].context;
      this.index=result[0].context.length;
    },
    //添加评论函数
    async addContext(){
      this.addform.title=this.question.title;
      this.addform.index=this.index+1;
      this.addform.date=this.getLocalTime("");
      this.addform.writer=window.sessionStorage.getItem("name");
      const result=await this.$http.post("/addContext",this.addform);
      if(result.status!==200)return this.$message.error("添加失败QAQ");
      this.$message.success("评论成功^0^");
      this.addform.message='';
      await this.init();
    },
    //获取当前时间
    getLocalTime(result) {
      result = "";
      var time = new Date();
      var year = time.getFullYear().toString();
      var month = (time.getMonth() + 1).toString();
      var date = time.getDate().toString();
      var hour = time.getHours().toString();
      var minutes = time.getMinutes().toString();
      result = year + "-" + month + "-" + date + " " + hour + ":" + minutes;
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
.theme {
  border: 5px solid rgba(241, 22, 132, 0.6);
  margin-bottom: 10px;
  border-radius: 10px;
  padding-left:10px;
}
.context {
  border: 3px solid rgba(241, 22, 132, .6);
  border-radius: 5px;
  box-shadow: 0 0 10px;
  margin-bottom: 5px;
  padding-left:20px;
  position: relative;
  .time {
    color:rgba(241, 22, 132, .4);
    text-align: right;
    font-size: 10px;
  }
  .index {
    position: absolute;
    top:-5px;
    left:-5px;
    width: 20px;
    height: 20px;
    background-color: rgb(241, 22, 132);
    color: white;
    border-top-left-radius: 10px;
    line-height: 20px;
    text-align: center;
  }
}
.add {
  display: flex;
  align-content: center;
}
</style>