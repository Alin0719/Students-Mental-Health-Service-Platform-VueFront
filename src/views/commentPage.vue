<template>
    <div>
        <firstbar></firstbar>
        <navbar></navbar>
        <div class="mycompagebars">
            <el-page-header @back="goBack" content="评论区" class="pageheader">
            </el-page-header>
            <div class="compagbar">
                <div class="mainpost">
                    <div class="imgandname">
                        <img :src="bindImg(mypost.uimg)" class="uimgcss">
                        <div class="myuname">{{mypost.uname}}</div>
                    </div>
                    <div class="timeandcontent">
                        <div class="myconandtime">
                            <div v-html="mypost.trucontent" class="myucontent"></div>
                            <div class="myposttime">{{mypost.trtime}}</div>
                        </div>
                    </div>
                </div>
                <div class="myeditorandbut">
                    <vue-editor class="myeditor" v-model="mycontent"/>
                    <div style="width:990px;margin-right:90px;height:55px">
                        <button class="postbut" v-on:click="addreply" >发布</button>
                    </div>
                </div>
                <h3 style="padding-left:70px">评论区</h3>
                <ul class="allreply" v-for="ureply in ureplys" :key="ureply.trno">
                    <li class="replys">
                        <div class="uimgdiv">
                            <img :src="bindImg(ureply.uimg)" class="uimgcss">
                            <div class="myuname">{{ureply.uname}}</div>
                        </div>
                        <div class="unameandcontent">
                            <div class="conandtime">
                                <div v-html="ureply.repcontent" class="myrcontent"></div>
                                <div class="myreplytime">{{ureply.reptime}}</div>
                            </div>
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
export default ({
    components: {
      navbar,
      firstbar,
    },
    data:function(){
        return {
            mypost:{},
            trno: 0,
            mycontent:"",
            ureplys:[],
            uid:"",
        }
    },
    mounted(){
      //获取动态路由传递的参数
      this.trno = this.$route.params.trno;
      this.requestData();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        bindImg(url){
            return require('../assets/'+url);
        },
        requestData(){
            axios.get("http://localhost:8088/getpostByuidAndtrno?trno="+this.trno).then((response)=>{
                this.mypost = response.data;
            })
            axios.get("http://localhost:8088/getreBytrnoanduid?trno="+this.trno).then((response)=>{
                this.ureplys = response.data;
            })
        },
        addreply(){
            this.uid = window.localStorage.getItem("uid");
            if(this.uid == ""){
                alert("您还未登录，请先登录再评论！");
                this.$router.push("/userlogin");
            }else{
                if(this.mycontent == ""){
                    alert("评论的内容不能为空！")
                }else{
                    axios.get("http://localhost:8088/addreply?trno="+this.trno+"&uid="+this.uid+"&repcontent="+this.mycontent).then((response)=>{
                        alert(response.data)
                        window.location.reload();
                    })
                }
            }
        }
    },
})
</script>

<style scoped>
.mycompagebars{
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
.compagbar{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 1080px;
    height: auto;
    margin-top: 45px;
}
.mainpost{
    margin: 20px 0px 20px 30px;
    width: 1000px;
    height: 250px;
    border-bottom: 1px dashed #c1c1c1d5;
    padding-top: 20px;
    padding-left: 10px;
}
.imgandname{
    width: 880px;
    height:40px;
}
.uimgcss{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    float: left;
}
.myuname{
    height:40px;
    line-height: 40px;
    font-size: 18px;
    float: left;
    margin-left: 10px;
}
.timeandcontent{
    width: 940px;
}
.myconandtime{
    margin-top: 20px;
}
.myucontent{
    font-size: 17px;
    padding:0px 10px 0px 45px;
    font-weight: 200;
}
.myposttime{
    font-size: 14px;
    margin-top: 80px;
    float: right;
    font-weight: 100;
}

.myeditor{
    border: 1px solid;
    width: 900px;
    margin: 20px 90px;
    background-color:rgba(245, 245, 245, 0.874);
    box-shadow: 0 0 25px 2px rgba(0, 0, 0, .2);
    overflow-y: auto;
    height: 200px;
}
.postbut{
    float: right;
    width: 90px;
    font-size: 18px;
    height: 35px;
    line-height: 35px;
}
.allreply{
    width: 920px;
    margin: 20px 10px 20px 25px;
}
.allreply li{
    list-style: none;
    padding: 20px 10px;
    padding-bottom: 5px;
}
.replys{
    width: 920px;
    height: 160px;
    border-top: 1px dashed #c1c1c1d5;
}
.uimgdiv{
    width: 880px;
    height:40px;
}
.unameandcontent{
    width: 940px;
}
.conandtime{
    margin-top: 20px;
}
.myrcontent{
    font-size: 16px;
}
.myreplytime{
    height: 50px;
    font-size: 14px;
    margin-top: 30px;
    margin-right: 20px;
    font-weight: 100;
    color: black;
    float: right;
}
</style>
