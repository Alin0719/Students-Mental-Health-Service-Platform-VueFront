<template>
<div>
    <div class="mybar">
        <div class="myname">学生心理健康系统后台管理</div>
        <div style="float:right;font-size:20px;margin-top:20px;margin-right:20px;">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <span>{{myname}}</span>
            <button style="margin-left:10px;" v-on:click="myexit">退出</button>
        </div>
    </div>
    <el-row class="tac">
        <el-col :span="5">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1" v-if="usermanage">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>用户管理</span>
                    </template>
                    <router-link to="/backhome/stumanage">
                        <el-menu-item index="1-1">学生管理</el-menu-item>
                    </router-link>
                    <router-link to="/backhome/teachermanage">
                        <el-menu-item index="1-2">教师管理</el-menu-item>
                    </router-link>
                    <router-link to="/backhome/classmanage">
                        <el-menu-item index="1-3">班级管理</el-menu-item>
                    </router-link>
                    <!--
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                    -->
                </el-submenu>
                <el-submenu index="2" v-if="testmanage">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">测评管理</span>
                    </template>
                    <router-link to="/backhome/sclmanage">
                        <el-menu-item index="2-1">SCL-90测评表管理</el-menu-item>
                    </router-link>
                    <router-link to="/backhome/othertabmanage">
                        <el-menu-item index="2-2">其他量表管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="3" v-if="postmanage">
                    <template slot="title">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">帖子管理</span>
                    </template>
                    <router-link to="/backhome/postmanage">
                        <el-menu-item index="3-1">原帖管理</el-menu-item>
                    </router-link>
                    <router-link to="/backhome/commentmanage">
                        <el-menu-item index="3-2">评论管理</el-menu-item>
                    </router-link>
                </el-submenu>

                <router-link to="/backhome/resultmanage" v-if="resultmanage">
                    <el-menu-item index="4">
                        <i class="el-icon-s-claim"></i>
                        <span slot="title">档案管理</span>
                    </el-menu-item>
                </router-link>

                <router-link to="/backhome/newsmanage" v-if="newsmanage">
                    <el-menu-item index="5">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">资讯管理</span>
                    </el-menu-item>
                </router-link>
                
                <router-link to="/backhome/edumanage" v-if="edumanage">
                    <el-menu-item index="6">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">教育宣传管理</span>
                    </el-menu-item>
                </router-link>
                
                <router-link to="/backhome/onlinechat" v-if="commentmanage">
                    <el-menu-item index="7" >
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">在线咨询</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
        <el-col :span="19" style="margin-top:80px;">
            <router-view></router-view>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
    data:function(){
      return{
        myname:"",
        usermanage:true,
        testmanage:true,
        postmanage:true,
        resultmanage:true,
        newsmanage:true,
        edumanage:true,
        commentmanage:false
      }  
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        },
        myexit(){
            window.localStorage.setItem("backname","")
            window.localStorage.setItem("user","")
            this.$router.push("/adminlogin")
        }
    },
    created:function(){
      this.myname = window.localStorage.getItem("backname");
      if(this.myname != "admin"){
        this.usermanage = false
        this.postmanage = false
        this.newsmanage = false
        this.commentmanage = true
      }
    },
    }
</script>

<style scoped>
.html{
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
}
.body{
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    
}
.el-menu-vertical-demo{
    margin-top:80px;
    height: 90vh;
}
.mybar{
    width: 100%;
    height: 80px;
    background-color: #5b5f63;
    margin: 0px;
    padding: 0px;
}
.myname{
    color: #ffffff;
    font-size: 32px;
    font-weight: bolder;
    line-height: 75px;
    height: 80px;
    margin-left: 50px;
    width: 65%;
    float: left;
}
a:hover{
    transform: scale(1);
}
.tac{
    position: static;
}
</style>