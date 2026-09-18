<template>
    <div>
        <firstbar></firstbar>
        <navbar></navbar>
        <div class="mybars">
            <el-page-header @back="goBack" content="教育宣传" class="pageheader">
            </el-page-header>
            <br>
            <div class="myybar">
                <h2 class="mytitle">{{title}}</h2>
                <div v-html="content" class="myeducontent"></div>
                <div class="etime">
                    <div class="myetime">{{etime}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../components/navbar.vue'
import firstbar from '../components/firstbar.vue'
import axios from 'axios'

export default {
    components: {
        navbar,
        firstbar,
    },
    data:function(){
      return{
        title:'暂无标题',
        content:'暂无内容',
        etime:'暂无',
        eno: 0,
        education: {},
      }
    },
    mounted(){
      //获取动态路由传递的参数
      this.eno = this.$route.params.eno;
      this.requestData();
    },
    methods:{
        requestData(){
            axios.get("http://localhost:8088/geteduByid?eno="+this.eno).then((response)=>{
            this.education = response.data;
            this.title = this.education.etitle;
            this.content = this.education.econtent;
            this.etime = this.education.etime;
        })
        },
        goBack() {
            this.$router.go(-1);
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
    margin-top: 0px;
    padding: 0px;
    border: 0px;
}
.mybars{
    position: relative;
  }
.pageheader{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1080px;
    height: 25px;
    margin: 10px 5px 5px 0px;
}
.el-page-header__content{
    font-size: 14px;
    font-weight: 500;
}
.myybar{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 930px;
    height: auto;
    margin-top: 25px;
    padding: 25px 75px 100px 75px;
}
.mytitle{
    width: 100%;
    text-align: center;
}
.myeducontent{
    font-size: 18px;
    font-weight: 200;
    margin-top:50px;
}
.myetime{
    font-size: 14px;
    color: #818181ba;
    float: left;
}
.etime{
    width: 300px;
    margin: 30px 100px 10px 800px;
}
</style>