<template>
    <div>
        <div class="mylogin">
          <ul class="logins">
            <li>
              <i class="fa fa-phone-square" aria-hidden="true"></i>
              <el-button type="text" @click="open">联系我们</el-button>
            </li>
            <li>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <router-link to="/adminlogin" class="mylg">教师/管理员登陆</router-link>
            </li>
            <li v-if="dlshow" class="myuserlo">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <router-link to="/userlogin" class="mylg">用户登陆</router-link>
            </li>
            <li v-if="usershow" class="myuserlo">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <router-link to="/ownpage/owninformation" class="mylg">{{myname}}</router-link>
              <button style="width:43px;height:20px;margin-left:10px;" v-on:click="myexit">退出</button>
            </li>
          </ul>
        </div>
        <div class="mylogos">
          <div class="mylogo">
            <img src="../assets/logo.png" class="logopt">
            <div class="mysearch">
              <input class="sdata">
              <button class="sbutton">搜索</button>
            </div>
          </div>
        </div>
    </div>
    
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
    export default {
      name:"firstbar",
      data:function(){
        return{
          dlshow: true,
          usershow: false,
          myname: "",
        }
      },
      created:function(){
        this.myname = window.localStorage.getItem("uname")
        if(this.myname != ""){
            this.dlshow = false
            this.usershow = true
        }else{
            this.dlshow = true
            this.usershow = false
        }
      },
      methods: {
        open() {
          this.$alert('请拨打电话：xxx-xxxxxx', '联系我们', {
            confirmButtonText: '确定',
          });
        },
        myexit(){
            window.localStorage.setItem("uname","");
            window.localStorage.setItem("uid","");
            window.localStorage.setItem("user","");
            window.location.reload()
        }
      }
  }

</script>

<style>
html{
    background-color: #f3f4f0;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: 0px;
  }
  body{
    background-color: #f3f4f0;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: 0px;
  }
  .mylogin{
    width: 100%;
    height: 26px;
    margin: 0px;
    padding: 0px;
  }
  .mylogos{
    background-color: #ffffff;
    width: 100%;
    height: 85px;
    position: relative;
    border: 0px;
    padding: 0px;
  }
  .mylogo{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1080px;
  }
  .logopt{
    height: 85px;
    width: 250px;
    margin-left: 35px;
    float: left;
  }
  .mysearch{
    float: right;
    padding-top: 20px;
    margin-right: 70px;
  }
  .sdata{
    vertical-align: middle;
    width: 320px;
    height: 40px;
    border:1px solid;
    margin: 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right-style: none;
    padding-left: 10px;
  }
  .sbutton{
    vertical-align: middle;
    width: 90px;
    height: 44.5px;
    font-size: 22px;
    padding: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border:1px solid;
    background-color: #0f7441;
    color: #ffffff;
  }
  input:focus {
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
}
.logins{
  float: right;
  margin: 0px 300px 0px 0px;
  padding: 0px;
  width: 400px;
  height: 100%;
  
}
.logins li{
  list-style:none;
  display:inline-block;
  width: 110px;
  height: 100%;
  text-align:center;
  padding:0px;
  font-size: 13px;
  vertical-align: middle;
}
.el-button--text {
  color: #BDB3B3;
  font-size: 13px;
  line-height: 25px;
}
.el-button{
  padding: 0px;
}
.el-button.el-button--default.el-button--small.el-button--primary{
  font-size: 20px;
}
i{
  color:#BDB3B3;
  font-size:13px;
  margin-right:2px;
}
.mylg{
  display: inline;
  height: 25px;
  line-height: 25px;
  color: #BDB3B3;
}
.myuserlo{
  margin-left: 30px;
}
</style>
