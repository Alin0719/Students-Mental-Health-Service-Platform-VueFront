<template>
    <div>
      <firstbar></firstbar>
      <navbar></navbar>
      <div class="bars">
        <div class="mybar">
            <div class="block">
                <el-carousel height="170px">
                  <el-carousel-item v-for="mentalimg in mentalimgs" :key="mentalimg.imgno">
                    <img class="mentalimg" :src="mentalimg.imgsrc">
                  </el-carousel-item>
                </el-carousel>
            </div>
            <div class="mycon">
                <div class="myinfos">
                    <div class="mynews">
                        <span class="cssfont">心理资讯</span>
                        <ul class="news" v-for="newsinfo in newsinfos" :key="newsinfo.nno" >
                          <li class="everynew">
                            <router-link :to="'/newsPage/' + newsinfo.nno" class="ntitle">{{newsinfo.ntitle}}</router-link>
                            <span class="ntime">{{newsinfo.ntime}}</span>
                          </li>
                        </ul>
                    </div>
                    <div class="myedu">
                        <span class="cssfont">宣传教育</span>
                        <ul class="news" v-for="education in educations" :key="education.eno" >
                          <li class="everynew">
                            <router-link :to="'/eduPage/' + education.eno" class="ntitle">{{education.etitle}}</router-link>
                            <span class="ntime">{{education.etime}}</span>
                          </li>
                        </ul>
                    </div>
                </div>
                <div class="mybuttons">
                    <router-link to="/scltest" class="mtest" tag="div">
                        <img src="../assets/test.png" class="timg">
                       <span class="myspa">心理健康测评</span>
                    </router-link>
                    <router-link to="/treehole" class="treehole" tag="div">
                        <img src="../assets/tree.png" class="treeimg">
                        <span class="mytreee">情绪共享帖子</span>
                    </router-link>    
                    <router-link to="/consultation" class="onlineconsult" tag="div">
                        <img src="../assets/consult.png" class="conimg">
                        <span class="myconss">在线心理咨询</span>
                    </router-link>
                </div>
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
        uid:"",
        newsinfos: [],
        educations: [],
        mentalimgs: [{imgno:1,imgsrc:require("../assets/mental1.png")},
                     {imgno:2,imgsrc:require("../assets/mental2.png")},
                     {imgno:3,imgsrc:require("../assets/mental3.png")},
                     {imgno:4,imgsrc:require("../assets/mental4.png")}]
      }
    },
    created:function(){
      axios.get("http://localhost:8088/getFivenew").then((response)=>{
          this.newsinfos = response.data;
      })
      axios.get("http://localhost:8088/getFiveedu").then((response)=>{
          this.educations = response.data;
      })
    },
    methods:{
      
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
  .bars{
    position: relative;
  }
  .mybar{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 1080px;
    height: 654px;
  }
  .block{
    margin: 20px 60px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .mentalimg{
    width:960px;
    height: 170px;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .myinfos{
    width: 485px;
    height: 400px;
    margin: 20px 15px 10px 35px;
    background-color: #fffaf1;
    border-radius: 8px;
    float: left;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, .2);
    opacity: 0.6;
  }
  .cssfont{
    font-weight: bold;
    color: #0f7441;
  }
  .mynews{
    width: 460px;
    height: 185px;
    margin: 10px 10px 5px 15px;
  }
  .myedu{
    width: 460px;
    height: 190px;
    margin: 0px 10px 10px 15px;
  }
  .news{
    margin: 10px 7px 5px 2px;
    padding: 0px;
  }
  .news li{
    margin: 0px;
    padding: 0px;
    list-style: none;
    height: 21px;
  }
  .ntitle{
    width: 330px;
    font-size: 12px;
    display: inline;
    color: #000000;
    float: left;
    line-height: 21px;
    height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ntitle:hover{
    transform: scale(1);
    color: #0f7441;
  }
  .ntime{
    font-size: 12px;
    float: right;
    line-height: 21px;
    color: rgb(94, 93, 93);;
  }



  .mybuttons{
    float: right;
    width: 485px;
    height: 400px;
    margin: 20px 35px 10px 15px;
    padding: 0px;
    border: 0px;
  }
  .mtest{
    width: 100%;
    height: 180px;
    margin: 0px 0px 10px 0px;
    background-color: #f3e628;
    border-radius: 20px;
    cursor: pointer;
  }
  .mtest:hover{
    transform: scale(1.1);
  }
  .treehole{
    width: 220px;
    height: 200px;
    float: left;
    margin: 10px 15px 0px 0px;
    border-radius: 18px;
    background-color: #f36874;
    cursor: pointer;
  }
  .treehole:hover{
    transform: scale(1.1);
  }
  .onlineconsult{
    width: 220px;
    height: 200px;
    float: right;
    margin: 10px 0px 0px 15px;
    border-radius: 18px;
    background-color: #9c93e9;
    cursor: pointer;
  }
  .onlineconsult:hover{
    transform: scale(1.1);
  }
  .timg{
    width: 190px;
    height: 180px;
  }
  .treeimg{
    width: 190px;
    height: 140px;
    margin: 10px 10px 3px 13.5px;
  }
  .conimg{
    width: 180px;
    height: 140px;
    margin: 12px 10px 3px 18px;
  }
  .myspa{
    float: right;
    font-size: 45px;
    color: #ffffff;
    margin: 55px 20px 0px 0px;
    font-weight: 600;
  }
  .mytreee{
    color: #ffffff;
    font-size: 22px;
    margin-left: 43px;
    font-weight: 600;
  }
  .myconss{
    color: #ffffff;
    font-size: 22px;
    margin-left: 43px;
    font-weight: 600;
  }
  </style>
  