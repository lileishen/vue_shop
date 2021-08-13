<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域     -->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!--登录表单区-->
      <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--账号-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"  prefix-icon="el-icon-s-custom" ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)// 预校验
        if (!valid) return 0;
        const { data: res } = await this.$http.post('login', this.loginForm);
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        //  1.登录成功之后token ，保存到客户端的sessionStorage 中
        //    1.1项目中除了登录之外的其他接口的API,必须登录之后才能访问
        //    1.2 token 只应在房前网站打开期间生效，所以token 保存在sessionStorage 中
        //  2. 通过编程式导航到后台主页，路由地址是/home
        window.sessionStorage.setItem('token', res.data.token);
        this.$router.push('/home');
      })
    }
  }

}
</script>

<!--
scoped 控制生效区间
-->

<style scoped>
.login_container {
  height: 100%;
  background-color: #264A6B;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}

.avatar_box > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.btns{
  display: flex;
  justify-content: flex-end;
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>
