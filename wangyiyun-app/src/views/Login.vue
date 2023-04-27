<template>
    <div class="login">
      
			<div class="box">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
				<p class="table">Login</p>
				<input type="text" placeholder="账号">
				<input type="password" placeholder="密码">
				<br>
				<a href="#" class="go">登录</a>
				
			</div>
		</div>
  </template>
  
  <script>
  import {getLoginUser} from '@/request/api/home.js'
  export default {
      data(){
          return{
              phone:'',
              password:''
          }
      },
      methods:{
          Login:async function(){
            let res= await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
            console.log(res);
            if(res.data.code===200){//如果返回的code等于200，说明登录成功，就跳转个人中心页面
            this.$store.commit('updateIsLogin',true)
            this.$store.commit('updateToken',res.data.token)
            let result=await getLoginUser(res.data.account.id)
            console.log(result);
            this.$store.commit('updateUser',result)
            this.$router.push('/infoUser')
            }else{
                alert("手机号码或者密码错误")
                this.password=''
            }
          }
      }
  
  }
  </script>
  <style lang="less" scoped>
  * {
				padding: 0;
				margin: 0;
				text-decoration: none;
			}

			

			.login {
				width: 100%;
				height: 667px;
				display: flex;
				border-radius: 15px;
				justify-content: center;
				align-items: center;
				background: linear-gradient(to right bottom,
						rgba(255, 255, 255, .7),
						rgba(255, 255, 255, .5),
						rgba(255, 255, 255, .4),
					);
				backdrop-filter: blur(10px);
				box-shadow: 0 0 20px #a29bfe;
				
        background-image: url('../images/12.png');
			}

			.table {
				font: 900 40px '';
				text-align: center;
				letter-spacing: 5px;
				color: #3d3d3d;
			}

			.box {
				overflow: hidden;
        margin-top: -370px;
        .icon{
          width: 40px;
          height: 40px;
          margin-top: 0;
        }
			}

			.box input {
				width: 100%;
				margin-bottom: 20px;
				outline: none;
				border: 0;
				padding: 10px;
				background-color: transparent;
				border-bottom: 3px solid rgb(150, 150, 240);
				font: 900 16px '';
				
			}

			.go {
				text-align: center;
				display: block;
				height: 50px;
				padding: 12px;
				font: 900 20px '';
				border-radius: 10px;
				margin-top: 20px;
				color: #fff;
				letter-spacing: 3px;
				background-image: linear-gradient(to left,
						#fd79a8, #9221BB);
			}
  </style>
  