<template>
    <div>
        <div class="treebar">
            <div class="mytreebar">
                <div class="myinputbars">
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
                                    <button class="mypostdel" @click="postdelbyid(upost.trno)">删除</button>
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
import axios from 'axios'

export default {
    components: {
    },
    data:function() {
        return {
	       uposts:[],
           mycontent:"",
           uid:"",
           myuid:"",
	  	}
    },
    methods: {
        bindImg(url){
            return require('../assets/'+url);
        },
        postdelbyid(trno){
            axios.get("http://localhost:8088/deltreepost?trno="+trno).then((response)=>{
            alert(response.data);
            window.location.reload();
        })
        }
    },
    created:function() {
        this.myuid = window.localStorage.getItem("uid");
        axios.get("http://localhost:8088/getpostanduserbyuid?uid="+this.myuid).then((response)=>{
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
.mypostdel{
    font-size: 17px;
    margin-top: 22px;
    float: right;
}
</style>