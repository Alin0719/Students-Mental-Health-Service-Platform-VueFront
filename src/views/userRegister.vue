<template>
    <div>
        <div class="myregisterpage">
            <el-page-header @back="goBack" content="用户注册" class="registerpageheader">
            </el-page-header>
            
            <div class="registerbar">
                <h1 class="registerspan">用户注册</h1>
                <div class="myregisterinput">
                    <div class="registerinput">
                        <div class="reginput">
                            <div class="rinput">学号</div>
                            <input type="text" placeholder="请输入学号" class="myreinput" v-model="uids">
                        </div>
                        <div class="reginput">
                            <div class="rinput">姓名</div>
                            <input type="text" placeholder="请输入姓名" class="myreinput" v-model="unames">
                        </div>
                        <div class="reginput">
                            <div class="rinput">号码</div>
                            <input type="text" placeholder="请输入手机号码" class="myreinput" v-model="uiphones">
                        </div>
                        <div class="reginput">
                            <div class="rinput">年龄</div>
                            <input type="text" placeholder="请输入年龄" class="myreinput" v-model="uages">
                        </div>
                        <div class="reginput">
                            <div class="rinput">密码</div>
                            <input type="password" placeholder="请输入密码" class="myreinput" v-model="upwd1s">
                        </div>
                        <div class="reginput">
                            <div class="rinput">确认密码</div>
                            <input type="password" placeholder="请再次输入密码" class="myreinput" v-model="upwd2s">
                        </div>
                        <div class="reginput">
                            <div class="rinput">班级编码</div>
                            <input type="text" placeholder="请输入班级编码" class="myreinput" v-model="cnos">
                        </div>
                        <div class="reginput">
                            <div class="rinput">性别</div>
                            <input type="text" placeholder="请输入'男'或'女'" class="myreinput" v-model="usexs">
                        </div>
                        <div class="reginput">
                            <div class="rinput">上传头像</div>
                            <input type="file" ref="fileInput" />
                        </div>
                        
                    </div>
                </div>
                <button class="myloginbut" v-on:click="myupload">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default({
    data:function(){
        return {
            uploadresult:"",
            uids:"",
            unames:"",
            uiphones:"",
            uages:"",
            upwd1s:"",
            upwd2s:"",
            cnos:"",
            usexs:"",
            filename:"",
            user:{uid:"",upwd:"",uname:"",usex:"",uage:0,uiphone:"",cno:"",uimg:""},
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        //文件上传
        myupload() {
            const file = this.$refs.fileInput.files[0]; // 获取选择的文件对象
            if(this.uids == null || this.unames == null || this.uiphones == null || this.uages == null || this.upwd1s == "" || this.upwd2s == "" || this.cnos ==null || this.usexs == null || file == null){
                alert("有选项未填写，请重新添加！");
            }else{
                if(this.usexs == "男" || this.usexs == "女"){
                    
                    this.filename = file.name;
                    let formData = new FormData(); // 创建FormData对象
                    formData.append('file', file); // 将文件添加到FormData对象中
                    if(this.upwd1s == this.upwd2s){
                        axios.post('http://localhost:8088/fileupload',formData).then((response) => {
                            console.log(response); // 处理服务器返回的数据
                            this.uploadresult = response.data;
                        }).catch((error) => {
                            console.error(error); // 处理错误信息
                        });
                        if(this.uploadresult = "文件上传成功"){
                            axios.get("http://localhost:8088/adduser?uid="+this.uids+"&upwd="+this.upwd1s+"&uname="+this.unames+"&usex="+this.usexs+"&uage="+parseInt(this.uages)+"&uiphone="+this.uiphones+"&cno="+this.cnos+"&uimg="+this.filename).then((response)=>{
                                if(response.data = "插入成功"){
                                    alert("注册成功，返回登录！");
                                    this.$router.push("/userlogin");
                                }else{
                                    alert("注册失败，请联系工作人员！");
                                }
                            });
                        }else{
                            alert("文件未上传成功，请重新上传！");
                        }
                    }else{
                        alert("两次密码不一致，请修改！")
                    }
                }else{
                    alert("性别必须为男或女，请重新填写！")
                }
            }
            
        },
      
    },
})
</script>

<style>
.myregisterpage{
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
.registerpageheader{
    width: 1080px;
    height: 30px;
    line-height: 30px;
    padding-top: 15px;
    padding-left: 30px;
}
.registerbar{
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
.registerspan{
    text-align: center;
}
.myregisterinput{
    position: relative;
    width: 100%;
    height: 430px;
}
.registerinput{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    height: 400px;
    padding: 10px 10px;
}
.reginput{
    width: 100%;
    height: 35px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 17px;
}
.rinput{
    font-weight: bold;
    float: left;
    line-height: 35px;
    font-size: 17px;
    width: 80px;
    height: 35px;
    background-color:bisque;
    text-align: center;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.myreinput{
    float: left;
    line-height: 17px;
    font-size: 17px;
    width: 350px;
    height: 30px;
    border-left-style: none;
    border:1px solid;
}
</style>
