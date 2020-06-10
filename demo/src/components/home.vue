<template>
  <div class="primary">
    <div class="icon">
      
    </div>
    <el-container class="container">
      <!--侧边栏显示头像和昵称以及三个操作的入口-->
      <el-aside class="aside">
        <el-container>
          <el-header class="asideHeader">
            <!--侧边栏的头部显示头像和昵称-->
            <div class="asideDiv">
              <img src="../assets/logo.png" alt />
            </div>
            <h2 class="name">{{myName}}</h2>
          </el-header>
          <!--侧边栏的主体放置三个按钮：修改个人信息，自己提出的问题帖子，退出-->
          <el-main class="asideMain">
            <div @click="tohome">首页</div>
            <div @click="updateDialogVisible=true">修改信息</div>
            <div @click="myquestion">我的问题</div>
            <div @click="loginout">退出</div>
          </el-main>
        </el-container>
      </el-aside>
      <!--主体部分-->
      <el-main class="main">
        <el-container>
          <!--主体的头部包括搜索栏+搜索按钮和提问按钮（新建问题）-->
          <el-header class="mainHeader">
            <!--搜索条-->
            <el-input placeholder="暂时还没有搜索功能哦" clearable v-model="input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <!--创建新的吹水按钮-->
            <el-button type="primary" round @click="addDialogVisible=true">吹个水呗</el-button>
          </el-header>
          <el-main class="mainMain">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <!--添加新吹水的对话框-->
    <el-dialog title="吹个水呗" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addformRef" :model="addForm" :rules="addFormRules">
        <!-- 题目 -->
        <el-form-item prop="title">
          <el-input v-model="addForm.title" placeholder="请输入一个吹水主题"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item prop="describe">
          <el-input
            v-model="addForm.describe"
            placeholder="具体描述..."
            type="textarea"
            :autosize="{ minRows: 5}"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addquestion">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改信息的对话框-->
    <el-dialog title="修改信息" :visible.sync="updateDialogVisible" width="30%">
      <el-form ref="updateformRef" :model="updateForm" :rules="updateFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="updateForm.username" placeholder="请输入新用户名"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入新昵称"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="updateForm.password" placeholder="请输入新密码" type="password"></el-input>
        </el-form-item>
        <!-- 密码确认 -->
        <el-form-item prop="confirm">
          <el-input v-model="updateForm.confirm" placeholder="请确认新密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var that=this;
    //吹水的主题（title）验证函数
    var titleCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/titleCheck',{title:value});
        if(result=="success"){
          that.$message.success("可装^w^"); 
          return callback();}
        that.$message.error("这个B已经被装了>_<");
        callback(new Error("重名啦"));
    }
    //修改信息的用户名重名验证
     var usernameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/usernameCheck',{username:value});
        if(result=="success"){
          that.$message.success("账户可用^w^"); 
          return callback();}
        that.$message.error("这个账号已经被注册啦>_<");
        callback(new Error("重名啦"));
    }
    //修改信息的昵称重名验证
    var nameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/nameCheck',{name:value});
        if(result=="success")
        { that.$message.success("昵称可用^w^");
          return callback();}
        that.$message.error("请想一个独一无二的昵称>_<");
        callback(new Error("重名啦"));
    }  
    return {
      myName: "",
      input: "",
      addDialogVisible: false,
      //提交新吹水的对象（题目，发起人，时间，描述）
      addForm: {
        title: "",
        writer: "",
        date: "",
        describe: "",
        pagenum:0
      },
      //修改信息
      updateForm:{
        username:"",
        password:"",
        name:"",
        confirm:"",
        prename:""
      },
      updateDialogVisible:false,
      //提交表单的规则
      addFormRules: {
        title: [
          { required: true, message: "装逼要开个好头！", trigger: "change" },
          { min: 3, max: 16, message: "请输入3-16位字符", trigger: "change" },
          {validator: titleCheck, trigger:'blur'}
        ],
        describe: [
          { required: true, message: "带点货啊！", trigger: "change" },
          { min: 40, max: 1000, message: "至少40字啊！", trigger: "change" }
        ]
      },
      //修改信息表单的提交规则
      updateFormRules:{
        username: [
          { required: true, message: "没号咋登？", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "账号要在3-16字符之间",
            trigger: "change"
          },
          {validator: usernameCheck, trigger:'blur'}
        ],
        name: [
          { required: true, message: "装逼不能没有姓名", trigger: "change" },
          {
            min: 3,
            max: 10,
            message: "昵称只能在3-10个字符之间",
            trigger: "change"
          },
          {validator: nameCheck, trigger:'blur'}
        ],
        password: [
          { required: true, message: "密码都不填？！", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码要在6-16字符之间",
            trigger: "change"
          }
        ],
        confirm: [
          { required: true, message: "密码都不填？！", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码要在6-16字符之间",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getName();
  },
  methods: {
    //退出函数，退出时消除token令牌进入登录界面
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //返回首页
    tohome() {
      this.$router.push("/all");
    },
    //前往自己提出的问题的页面
    myquestion() {
      this.$router.push("/myquestion");
    },
    //进来时使用login设置好的session获取用户名
    getName() {
      this.myName = window.sessionStorage.getItem("name");
    },
    async addquestion() {
      //在发送之前需要验证输入的内容是否符合rules中的各个规则不符合则返回，并显示提示信息
      this.$refs.addformRef.validate(async valid => {
        if (!valid){
          this.$message.error("不符合规范哦QAQ");
          return;}
        this.addForm.writer = this.myName;
        this.addForm.date = this.getLocalTime(this.addForm.date);
        await this.gettotal();
        const result=await this.$http.post("/insert",this.addForm);
        if(result.status!==200)return this.$message.error("吹水失败QAQ");
        this.$message.success("吹水成功^0^");
        this.addDialogVisible = false;
        //重置表单
        this.$refs.addformRef.resetFields();
        //如果不进行页面刷新则无法立即显示新加入的吹水，但是新吹水的问题是会加载出来但是总条数还是原来的总条数（设计有问题）
        this.$router.go(0);
      });
    },
    //获取发送的时间格式为YYYY-MM-DD HH:Minute
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
    },
    //获取总条数
    async gettotal(){
      const data=await this.$http.get('/total');
      this.addForm.pagenum=Number(data.data)+1;
    },
    //修改信息
    update1(){
         this.$refs.updateformRef.validate(async valid => {
        if (!valid){
          this.$message.error("不符合规范哦QAQ");
          return;}
        this.updateForm.prename=this.myName;
        const {data:resultUser}=await this.$http.post("/userUpdate",this.updateForm);
        const {data:resultQuestion}=await this.$http.post("/questionUpdate",{writer:this.updateForm.name,prename:this.updateForm.prename})
        if(resultUser=="error"||resultQuestion=="error")return this.$message.error("修改失败");
        this.$message.success("修改成功");
        this.updateDialogVisible=false;
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.primary {
  margin: 0 24.7%;
  width: 53%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  color:#777777;
  
  .icon {
    height: 120px;
    font-size: 30px;
    margin-bottom: 10px;
    border: 1px solid black;
    background-color: #39c5bb;
    background-image: url('../assets/head.png');
    background-repeat: no-repeat;
  }
  .container {
    width: 100% !important;
    height: 85% !important;
    .aside {
      width: 20% !important;
      height: 100% !important;
      .asideHeader {
        margin: 0 auto;
        width: 90%;
        height: 30%;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid rgb(253, 229, 41);
        border-radius: 20px;
        h2 {
          display: inline-block;
        }
        .asideDiv {
          display: inline-block;
          height: 80%;
          width: 20%;
          img {
            width: auto;
            height: 100%;
          }
        }
      }
      .asideMain {
        width:100%;
        height: 100%;
        position: relative;
      }
      .asideMain > div {
        width: 100%;
        height: 50px;
        background-color: rgb(255, 79, 143);
        color: white;
        text-align: center;
        line-height: 50px;
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
        border-radius: 5px;
      }
      .asideMain > div::before {
        content: "";
        width: 30px;
        height: 30px;
        border-radius: 30px;
        background: rgb(250, 250, 212);
        position: absolute;
        display: block;
        right: -15px;
        top: 11px;
      }
      .asideMain > div:hover {
        color: rgb(253, 229, 41);
        cursor: pointer;
        box-shadow: -2px -2px 10px #000;
      }
    }
    .main {
      height: 100%;
      padding: 0;
      .mainHeader {
        width: 100%;
        height: 60px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .mainMain {
        width: 100%;
        height: 100%;
        border: 3px solid rgba(253, 229, 41, 0.2);
        border-radius: 20px;
        background-color: #fff;
        padding: 10px;
      }
    }
  }
}
</style>