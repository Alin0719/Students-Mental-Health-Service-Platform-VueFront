<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3 style="text-align:center">个人信息</h3>
            </div>
            <ul>
                <li class="myimg">
                    头像<img :src="bindImg(user.uimg)" class="myuimg">
                </li>
                <li class="myli">
                    {{'学号：' + user.uid}}
                </li>
                <li class="myli">
                    {{'姓名：' + user.uname}}
                </li>
                <li class="myli">
                    {{'性别：' + user.usex}}
                </li>
                <li class="myli">
                    {{'年龄：' + user.uage}}
                </li>
                <li class="myli">
                    {{'联系号码：' + user.uiphone}}
                </li>
                <li class="myli">
                    {{'班级号：' + user.cno}}
                </li>
            </ul>
            <button class="myinfupdate" @click="updateinfor(user.uid)">修改</button>
        </el-card>
        <el-dialog
        title="修改用户"
        :visible.sync="updateuser"
        width="40%"
        :before-close="handleClose">
        <div class="myregisterinput" style="height:350px">
          <div class="registerinput" style="height:350px">
              <div class="reginput">
                  <div class="rinput">学号</div>
                  <input type="text" placeholder="请输入学号" class="myreinput" v-model="uidss">
              </div>
              <div class="reginput">
                  <div class="rinput">姓名</div>
                  <input type="text" placeholder="请输入姓名" class="myreinput" v-model="unamess">
              </div>
              <div class="reginput">
                <div class="rinput">密码</div>
                <input type="password" placeholder="请输入密码" class="myreinput" v-model="upwd">
            </div>
              <div class="reginput">
                  <div class="rinput">号码</div>
                  <input type="text" placeholder="请输入手机号码" class="myreinput" v-model="uiphoness">
              </div>
              <div class="reginput">
                  <div class="rinput">年龄</div>
                  <input type="text" placeholder="请输入年龄" class="myreinput" v-model="uagess">
              </div>
              <div class="reginput">
                  <div class="rinput">班级编码</div>
                  <input type="text" placeholder="请输入班级编码" class="myreinput" v-model="cnoss">
              </div>
              <div class="reginput">
                  <div class="rinput">性别</div>
                  <input type="text" placeholder="请输入'男'或'女'" class="myreinput" v-model="usexss">
              </div>
              <div class="reginput">
                <div class="rinput">上传头像</div>
                <input type="file" ref="fileInput" />
            </div>
          </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateuser = false">取 消</el-button>
          <el-button type="primary" v-on:click="myupload">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
      return{
        user:[],
        updateuser:false,
        upuser:[],
        uid:"",
        uidss:"",
        unamess:"",
        upwd:"",
        uiphoness:"",
        uagess:"",
        cnoss:"",
        usexss:"",
        filename:"",
      }  
    },
    created:function(){
      this.uid = window.localStorage.getItem("uid");
      axios.get("http://localhost:8088/getuserByid?uid="+this.uid).then((response)=>{
        this.user = response.data;
      });
    },
    methods: {
        bindImg(url){
            return require('../assets/'+url);
        },
        updateinfor(uid){
          this.updateuser=true;
          axios.get("http://localhost:8088/getuserByid?uid="+uid).then((response)=>{
            this.upuser = response.data;
            this.uidss = this.upuser.uid;
            this.unamess = this.upuser.uname;
            this.uiphoness = this.upuser.uiphone;
            this.uagess = this.upuser.uage;
            this.cnoss = this.upuser.cno;
            this.usexss = this.upuser.usex;
            this.upwd = this.upuser.upwd;
            this.filename = this.upuser.uimg;
          })
        },
        myupload() {
          const file = this.$refs.fileInput.files[0]; // 获取选择的文件对象
            if(this.uidss == null || this.unamess == null || this.uiphoness == null || this.uagess == null || this.upwd == "" || this.cnoss ==null || this.usexss == null){
                alert("有选项未填写，请重新添加！");
            }else if(this.uidss != null && this.unamess != null && this.uiphoness != null && this.uagess != null && this.upwd != "" && this.cnoss != null && this.usexss != null && file != null){
                if(this.usexss == "男" || this.usexss == "女"){
                    this.filename = file.name;
                    let formData = new FormData(); // 创建FormData对象
                    formData.append('file', file); // 将文件添加到FormData对象中
                    axios.post('http://localhost:8088/fileupload',formData).then((response) => {
                        console.log(response); // 处理服务器返回的数据
                        this.uploadresult = response.data;
                    }).catch((error) => {
                        console.error(error); // 处理错误信息
                    });
                    if(this.uploadresult = "文件上传成功"){
                      axios.get("http://localhost:8088/deluser?uid="+this.uidss).then((response)=>{
                        if(response.data = "删除成功"){
                          axios.get("http://localhost:8088/adduser?uid="+this.uidss+"&upwd="+this.upwd+"&uname="+this.unamess+"&usex="+this.usexss+"&uage="+parseInt(this.uagess)+"&uiphone="+this.uiphoness+"&cno="+this.cnoss+"&uimg="+this.filename).then((response)=>{
                            if(response.data = "插入成功"){
                                alert("修改成功！");
                                window.location.reload();
                            }else{
                                alert("修改失败，请联系工作人员！");
                            }
                          });
                        }else{
                          alert("修改失败，请联系工作人员！");
                          window.location.reload();
                        }
                      })
                    }else{
                        alert("文件未上传成功，请重新上传！");
                    }
                }else{
                    alert("性别必须为男或女，请重新填写！")
                }
            }else if(this.uidss != null && this.unamess != null && this.uiphoness != null && this.uagess != null && this.upwd != "" && this.cnoss != null && this.usexss != null && file == null){
                if(this.usexss == "男" || this.usexss == "女"){
                      axios.get("http://localhost:8088/deluser?uid="+this.uidss).then((response)=>{
                        if(response.data = "删除成功"){
                          axios.get("http://localhost:8088/adduser?uid="+this.uidss+"&upwd="+this.upwd+"&uname="+this.unamess+"&usex="+this.usexss+"&uage="+parseInt(this.uagess)+"&uiphone="+this.uiphoness+"&cno="+this.cnoss+"&uimg="+this.filename).then((response)=>{
                            if(response.data = "插入成功"){
                                alert("修改成功！");
                                window.location.reload();
                            }else{
                                alert("修改失败，请联系工作人员！");
                            }
                          });
                        }else{
                          alert("修改失败，请联系工作人员！");
                          window.location.reload();
                        }
                      })
                }else{
                    alert("性别必须为男或女，请重新填写！")
                }
            }
            
        },
    },
}
</script>

<style scoped>

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin:20px 0px 0px 420px;
    width: 600px;
  }
  li{
    list-style: none;
  }
  .myli{
    font-size: 18px;
    height: 50px;
  }
  .myimg{
    height: 80px;
    font-size: 18px;
    line-height: 80px;
    margin-bottom: 25px;
  }
  .myuimg{
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin-left: 50px;
    margin-top:20px;
  }
  .myinfupdate{
    margin-left: 280px;
    font-size: 16px;
  }
</style>