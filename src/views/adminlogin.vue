<template>
    <div>
        <div class="myloginpage">
            <el-page-header @back="goBack" content="管理员登陆" class="loginpageheader">
            </el-page-header>
            <div class="loginbar">
                <h1 class="loginspan">管理员登陆</h1>
                <div class="mylogininput">
                    <div class="logininput">
                        <div class="uidinput">
                            <div class="lginput">工号</div>
                            <input type="text" placeholder="请输入工号" class="myloinput" v-model="id">
                        </div>
                        <div class="upwdinput">
                            <div class="lginput">密码</div>
                            <input type="password" placeholder="请输入密码" class="myloinput" v-model="pwd">
                        </div>
                    </div>
                </div>
                <button class="myloginbut" v-on:click="tologin">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default ({
    data:function(){
        return{
            id: "",
            pwd: "",
            teacher:{},
            user:{uid:"",uname:""},
        }
    },
    methods: {
        goBack() {
            this.$router.push("/home");
        },
        tologin(){
            axios.get("http://localhost:8088/getBytidandtpwd?tid="+this.id+"&tpwd="+this.pwd).then((response)=>{
                if (response.data != ''){
                    window.localStorage.setItem("tname",response.data.tname)
                    window.localStorage.setItem("tid",response.data.tid)
                    window.localStorage.setItem("backname",response.data.tname)
                    this.teacher = response.data
                    console.log(window.localStorage.getItem("teacher"))
                    alert("登录成功！")
                    this.user.uid = response.data.tid
                    this.user.uname = response.data.tname
                    window.localStorage.setItem("user",JSON.stringify(this.user))
                    this.$router.push("/backhome");
                }else if(this.id == 'admin' & this.pwd == '123456'){
                    window.localStorage.setItem("backname","admin")
                    alert("登录成功！")
                    this.$router.push("/backhome");
                }
                else{
                    window.localStorage.setItem("tname","")
                    alert("登录失败，请重新登录！")
                }
            })
        }
    },

})
</script>

<style>
.myloginpage{
    width: 100%;
    height: 800px;
    opacity:0.7;
    margin: 0px;
    padding: 0px;
    background-image: url("../assets/loginbg2.png");
    background-size: cover; /* 背景图片铺满整个容器 */
    background-position: center; /* 背景图片居中 */
    background-repeat: no-repeat; /* 背景图片不重复 */
}
.loginpageheader{
    width: 1080px;
    height: 30px;
    line-height: 30px;
    padding-top: 15px;
    padding-left: 30px;
}
.loginbar{
    width: 600px;
    height: 600px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 0 8px 10px rgba(0, 0, 0, .2);
    float: right;
    margin-top: 45px;
    margin-right: 90px;
    opacity: 0.9;
    position: relative;
}
.loginspan{
    text-align: center;
    margin-top:60px;
}
.mylogininput{
    position: relative;
    width: 100%;
    height: 260px;
}
.logininput{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    height: 100px;
    padding: 50px 10px;
    padding-left: 0px;
    padding-bottom: 0px;
}
.lginput{
    font-weight: bold;
    float: left;
    line-height: 47px;
    font-size: 20px;
    width: 80px;
    height: 47px;
    background-color:bisque;
    text-align: center;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.myloinput{
    float: left;
    line-height: 20px;
    font-size: 20px;
    width: 350px;
    height: 40px;
    
}

.uidinput{
    width: 100%;
    height: 80px;
    margin-left: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
}
.upwdinput{
    width: 100%;
    height: 80px;
    margin-left: 10px;
}
input:focus {
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
}
.myloginbut{
    line-height: 41px;
    font-size: 20px;
    width: 90px;
    height: 47px;
    margin: 0px 255px;
    font-weight: bold;
    background-color: bisque;
    border-radius: 10px;
}
</style>
