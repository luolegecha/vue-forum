<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/demo.jpg" alt />
      </div>
      <!--ref中的值是表单的引用对象，model用于绑定数据，rules用于绑定验证规则-->
      <el-form ref="loginformRef" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" round @click="login">登录</el-button>
          <el-button type="primary" round @click="addDialogVisible=true">注册</el-button>
          <el-button type="info" round @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--注册的对话框-->
    <el-dialog title="注册" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="addformRef" :model="addForm" :rules="addFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item prop="name">
          <el-input v-model="addForm.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="addForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- 密码确认 -->
        <el-form-item prop="confirm">
          <el-input v-model="addForm.confirm" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var that=this;
    //用户名验证函数
    var usernameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/usernameCheck',{username:value});
        console.log(result);
        if(result=="success"){
          that.$message.success("账户可用^w^"); 
          return callback();}
        that.$message.error("这个账号已经被注册啦>_<");
        callback(new Error("重名啦"));
    }
    //昵称验证函数
    var nameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/nameCheck',{name:value});
        if(result=="success")
        { that.$message.success("昵称可用^w^");
          return callback();}
        that.$message.error("请想一个独一无二的昵称>_<");
        callback(new Error("重名啦"));
    }
    return {
      // 这是登录表单的数据对象
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证规则
      loginFormRules: {
        //用户名和密码保证6-16位之间（改变即验证）
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 16, message: "请输入3-16位字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 16, message: "请输入6-16位字符", trigger: "change" }
        ]
      },
      //隐藏弹出表单
      addDialogVisible: false,
      //提交注册的对象
      addForm: {
        username: "",
        password: "",
        name: "",
        confirm: ""
      },
      
      //提交表单的规则
      addFormRules: {
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
  methods: {
    //重置函数
    resetForm() {
      this.$refs.loginformRef.resetFields();
    },
    //登录函数
    login() {
      //validate函数用于预校验（提交前的检测）参数是一个回调函数，回调函数的参数是一个布尔值提交成功则返回true反之false
      //就是用来检测输入的内容是否符合rule里的所有规则
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return;
        //配置好根路径以后可以直接使用this.http来发起post请求，登录验证接口的路径是login，方法是post，需要的数据是
        //name和password，在这里直接用对象传入
        const result = await this.$http.post("login", this.loginForm);
        if (result.data.length == 0) {
          return this.$message({
            message: "淦！登录失败了..",
            type: "error",
            center: true,
            showClose: true
          });
        }
        this.$message({
          message: "进...进来了...",
          type: "success",
          center: true,
          showClose: true
        });
        //1.登录成功后获得一个token令牌，保存到客户端的sessionStorage中
        //    1.1项目中除去登录之外的其他api接口，必须在登录之后才能访问
        //    1.2token令牌只在当前网站打开期间生效，所以将其保存在sessionStorage中
        window.sessionStorage.setItem("token", result.data[0]._id);
        window.sessionStorage.setItem("name", result.data[0].name);
        //2.通过编程式导航栏跳转到后台主页，路由地址是/home
        this.$router.push("/home");
      });
    },
    //注册函数
    register() {
      this.$refs.addformRef.validate(async valid => {
        if (!valid) return this.$message.error("输入有误>_<");
        if (this.addForm.password !== this.addForm.confirm)
          return this.$message.error("两次输入的密码不对>_<");
        const {data:result}=await this.$http.post("/register",this.addForm);
        if(result=="error")return this.$message.error("注册失败QAQ");
        this.$message.success("注册成功^0^");
        this.addDialogVisible = false;
        this.$refs.addformRef.resetFields();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(14, 99, 168);
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  background-color: #fff;
  border:5px solid #39c5bb;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>