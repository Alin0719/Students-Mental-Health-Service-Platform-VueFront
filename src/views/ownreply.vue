<template>
    <div>
        <div class="mycompagebars">
            <div class="compagbar">
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
                                <div class="mypost">
                                    <button class="myreplydel" @click="replydelbyid(ureply.replyno)">删除</button>
                                    <router-link :to="'/commentPage/'+ureply.trno" class="oldpost">去原帖</router-link>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default ({
    components: {
    },
    data:function(){
        return {
            trno: 0,
            mycontent:"",
            ureplys:[],
            uid:"",
        }
    },
    methods: {
        bindImg(url){
            return require('../assets/'+url);
        },
        replydelbyid(replyno){
            axios.get("http://localhost:8088/delreply?replyno="+replyno).then((response)=>{
                alert(response.data);
                window.location.reload();
            })
        }
    },
    created:function() {
        this.uid = window.localStorage.getItem("uid");
        axios.get("http://localhost:8088/getreplyanduserbyuid?uid="+this.uid).then((response)=>{
          this.ureplys = response.data;
      })
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
    width: 300px;
    float: left;
    font-size: 14px;
    margin-top: 30px;
    font-weight: 100;
    color: black;
    
}
.mypost{
    width: 200px;
    height: 50px;
    float:right;
    margin-top: 16px;
    margin-right: 20px;
}
.oldpost{
    color:blue;
    float: right;
}
.myreplydel{
    margin-top: 8px;
    margin-left: 15px;
    font-size: 16px;
    float: right;
}
</style>
