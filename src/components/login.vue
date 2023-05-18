<template>
  <div class="login-body">
    <div id="login-body">
      <div class="login-wrapper">
        <div class="login-container">
          <h1>黄土高原地震滑坡与强震动记录数据库</h1>
          <h2>国家自然科学基金重点项目   (U1939209)</h2>
          <div class="login-form" style="margin-top: 4.6875rem">
            <p style="color:	#4169E1;font-size:30px;position: relative;right:15%">用户登录</p>
            <p>
              <el-input v-model="username" placeholder="用户名">
              </el-input>
            </p>
            <p>
              <el-input show-password v-model="password" placeholder="密码" class="nameandpwd" >
              </el-input>
            </p>
            <p>
              <input
                  type="text"
                  class="login-verify"
                  v-model="verifyCode"
                  placeholder="验证码"
                  style="padding-left: .520833rem;color: black;font-weight: 600 "
                  @keyup.enter="login()"
              />
              <img :src="verifyimg"  @click="updateVerifyCode" style="background:transparent;border:.052083rem solid black;width:5.7813rem;height:2.3438rem" />
            </p>
            <p>
              <Button type="primary" @click="login()" style="background: #409EFF;color: #ffffff;font-weight: 900">登录</Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import axios from 'axios'
import { Login as loginApi } from '../api/user'
import { GetCheck } from '../api/login'
import {setToken} from "../utils/auth";

export default {
  name: 'login',
  data() {
    return {
      username: 'admin',
      password: 'htdzhp@fzgis',
      verifyCode: null,
      verifyimg: '',
      check_code: '',
    }
  },
  created() {
    this.updateVerifyCode()
  },
  mounted() {},

  methods: {
    updateVerifyCode() {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      GetCheck()
          .then((res) => {
            console.log(res.data.base64)
            console.log(res.data.code)
            this.verifyimg = res.data.base64
            this.check_code = res.data.code
          })
          .catch((err) => {
            alert(err)
          })
    },

    login() {
      loginApi(
          this.username,
          this.password,
          this.verifyCode,
          this.check_code
      )
          .then((res) => {
            console.log(res)
            if (res.code === 200) {
              this.loginAnimation()
              setTimeout(() => {
                setToken(res.data.token)
                // window.localStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user_type',res.data.type)
                window.localStorage.setItem('userid', res.data.id)
                this.$router.push({ name: 'webHome' })
              }, 500)
            } else if (res.code !== 200) {
              ElMessage({
                message: res.msg,
                type: 'error',
              })
              this.updateVerifyCode()
            }
          })
          .catch((err) => {
            console.error(err)
          })
    },
    //验证是否登录
    // loginVerify() {
    //   let token = localStorage.getItem('token');
    //   if(token !==null){
    //     axios ({
    //       method: "get",
    //       url: "http://127.0.0.1:8848/user/token?",
    //       params:{
    //         token:token
    //       }
    //     })
    //         .then((res) => {
    //           if (res.data.code === 200) {
    //             this.$router.push({ name: "cthd" });
    //           } else {
    //             ElMessage.error(res.data.msg)
    //           }
    //         })
    //         .catch((err) => {
    //           ElMessage.error(err)
    //         });
    //   }
    // },

    loginAnimation() {
      let loginBox = document.getElementsByClassName('login-form')
      let loginTitle = document.getElementsByTagName('h1')
      let loginTitle_2 = document.getElementsByTagName('h2')
      loginBox[0].style.display = 'none'
      loginTitle[0].classList.add('form-success')
      loginTitle_2[0].classList.add('form-success')
    },
  },
}
</script>

<style>
html{
  font-size: 1vw;
}

.login-body {
  font-family: "Source Sans Pro", sans-serif;
  color: black;
  font-weight: 900;
  min-height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  overflow: hidden;
  position: relative;
}
#login-body ::-webkit-input-placeholder {
  border-color: transparent;
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
#login-body :-moz-placeholder {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
#login-body ::-moz-placeholder {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
#login-body :-ms-input-placeholder {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
.login-wrapper {
  background: url("../assets/imgicon/back.jpg") no-repeat center center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
}
/* 登录成功动画*/

.login-wrapper .login-container .form-success {
  -webkit-transform: translateY(4.427083rem);
  -moz-transform: translateY(4.427083rem);
  -ms-transform: translateY(4.427083rem);
  transform: translateY(4.427083rem);
}

.login-container {
  position: relative;
  top: 2%;
  max-width: 36.458333rem;
  margin: 0 auto;
  border-radius: 25%;
  padding: 1.5625rem 1.5625rem;
  height: 31.25rem;
}
.login-container h1 {
  position: relative;
  right: 28%;
  font-size: 3.125rem;
  font-weight:1000;
  color: #f89104;
  width: 150%;
  text-align: center;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
}
.login-container h2 {
  position: relative;
  right: 35%;
  font-size: 2.022917rem;
  font-weight:1000;
  color: #f89104;
  width: 170%;
  text-align: center;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
}

.login-form {
  width: 70%;
  height: 15.229167rem;
  position: relative;
  top:30%;
  left: 10%;
  background: rgba(255,251,240,.4);
  /*background: rgba(255,251,36,.2);*/
  /*background: url(../assets/imgicon/logininfo.png) no-repeat left top;*/
}
.login-form p {
  display: inline-flex;
  line-height: 2.239583rem;
  width: 100%;
  padding: .520833rem .78125rem 0rem 13.020833rem;
  margin: 0 ;
  position: relative;
  right: 30%;
}
.login-form Input {
  border: .052083rem solid;
  width: 14.583333rem;
  height: 2.239583rem;
  font-size: .9375rem;
  /*background: rgba(0,0,0,.4);*/
  background: rgba(255,251,240,.3);
  /*border: white;*/
  color: black;
  font-weight:600;
  /*background: transparent*/
}
.login-form .login-verify {
  width: 7.8125rem;
  height: 2.239583rem;
  margin-right: .520833rem;
  font-size: .9375rem;
}

.login-form Button {
  padding: 0rem 0;
  margin: 0 auto auto 0;
  width: 15.052083rem;
  height: 2.604167rem;
  cursor: pointer;
  font-size: .9375rem;
}
.nameandpwd{
  width: 14.583333rem;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-36.458333rem) rotate(600deg);
    transform: translateY(-36.458333rem) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-36.458333rem) rotate(600deg);
    transform: translateY(-36.458333rem) rotate(600deg);
  }
}
</style>
