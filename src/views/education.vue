<template>
    <div>
        <firstbar></firstbar>
        <navbar></navbar>
        <div class="mymain">
            <el-page-header @back="goBack" content="宣传教育" class="pageheader">
            </el-page-header>
            <div class="alledus">
                <img src="../assets/education.png" class="edutopimg">
                <ul class="eduslist" v-for="education in educations" :key="education.eno">
                    <li class="myedusshow">
                        <img :src="bindImg(education.eimg)" alt="" class="edusimgshow">
                        <div class="myntitleandtime">
                            <router-link :to="'/eduPage/' + education.eno" class="mypagetitle">
                                {{education.etitle}}
                            </router-link>
                            <div class="mypagetime">{{education.etime}}</div>
                        </div>
                    </li>
                </ul>
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
            educations: [],
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        bindImg(url){
            return require('../assets/'+url);
        }
    },
    created:function(){
      axios.get("http://localhost:8088/getAlledu").then((response)=>{
          this.educations = response.data;
      })
    },
}
</script>

<style>
.mymain{
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
.alledus{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 1080px;
    height: auto;
    margin-top: 45px;
    padding: 25px 20px 100px 0px;
}
.eduslist li{
    list-style: none;
}
.myedusshow{
    width: 100%;
    height: 88px;
    padding: 20px 0px;
    border-top: 1px dashed #c1c1c1d5;
}
.edusimgshow{
    width: 140px;
    height: 88px;
    border-radius: 5px;
    float: left;
}
.myntitleandtime{
    float: right;
    width: 880px;
    height: 88px;
    padding-left: 5px;
    position: relative;
}
.mypagetitle{
    display: inline;
    color: #000000e4;
    position: absolute;
    top: 0;
    font-size:16px;
    line-height: 16px;
}
.mypagetitle:hover{
    transform: scale(1);
    color: #0f7441;
  }
.mypagetime{
    font-size:15px;
    line-height: 15px;
    position: absolute;
    bottom: 0;
    color: #818181ba;
}
.edutopimg{
    width: 950px;
    height: 170px;
    margin-left: 75px;
}
</style>