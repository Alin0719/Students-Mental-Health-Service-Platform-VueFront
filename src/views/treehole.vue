<template>
    <div>
        <firstbar></firstbar>
        <navbar></navbar>
        <div class="treebar">
            <div class="mytreebar">
                <div class="myinputbars">
                    <h3 class="mypost">发表帖子</h3>
                    <vue-editor class="myeditor" v-model="mycontent"/>
                    <div style="width:990px;margin-right:90px;height:55px">
                        <button class="postbut" v-on:click="addpost">发布</button>
                    </div>
                    <ul class="allpost" v-for="upost in uposts" :key="upost.trno">
                        <li class="myposts">
                            <div class="uimgdiv">
                                <img :src="bindImg(upost.uimg)" class="uimgcss">
                                <div class="myuname">{{upost.uname}}</div>
                            </div>
                            <div class="unameandcontent">
                                <div class="myconandtime">
                                    <div v-html="upost.trucontent" class="myucontent"></div>
                                    <div class="myposttime">{{upost.trtime}}</div>
                                    <router-link :to="'/commentPage/'+upost.trno" tag="div" class="gocomment">评论</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
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
    data:function() {
        return {
	       uposts:[],
           mycontent:"",
           uid:"",
	  	}
    },
    methods: {
        bindImg(url){
            return require('../assets/'+url);
        },
        addpost(){
            this.uid = window.localStorage.getItem("uid");
            if(this.uid == ""){
                alert("您还未登录，请先登录再发帖！");
                this.$router.push("/userlogin");
            }else{
                if(this.mycontent == ""){
                    alert("发布的内容不能为空！")
                }else{
                    axios.get("http://localhost:8088/addtreepost?uid="+this.uid+"&trucontent="+this.mycontent).then((response)=>{
                        alert(response.data)
                        window.location.reload();
                    })
                }
            }
        }
    },
    created:function() {
        axios.get("http://localhost:8088/getpostanduser").then((response)=>{
          this.uposts = response.data;
      })
    },


}
</script>

<style scoped>
.treebar{
    position: relative;
}
.mytreebar{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 1080px;
    height: auto;
}
.myeditor{
    border: 1px solid;
    width: 900px;
    margin: 20px 90px;
    background-color:rgba(245, 245, 245, 0.874);
    box-shadow: 0 0 25px 2px rgba(0, 0, 0, .2);
    overflow-y: auto;
    height: 250px;
    
}
.mypost{
    text-align: center;
}
.postbut{
    float: right;
    width: 90px;
    font-size: 18px;
    height: 35px;
    line-height: 35px;
}
.allpost{
    width: 920px;
    margin: 20px 10px 20px 25px;
}
.allpost li{
    list-style: none;
    padding: 20px 10px;
    padding-bottom: 5px;
}
.myposts{
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
.myconandtime{
    margin-top: 20px;
}
.myucontent{
    font-size: 16px;
}
.myposttime{
    width: 400px;
    font-size: 14px;
    margin-top: 30px;
    float: left;
}
.gocomment{
    font-size: 17px;
    width: 60px;
    height: 30px;
    margin-top: 22px;
    line-height: 30px;
    text-align: center;
    float: right;
    background-color: #42a83ef1;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}
</style>