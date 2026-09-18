<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">学生信息管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" v-model="searchcon">
          <button class="searchbut" v-on:click="mysearchuser">搜索</button>
          <button class="searchbut" v-on:click="freshuser">重置</button>
          <button class="addbut" @click="dialogVisible = true">添加</button>
        </div>
        <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-on:click="myupload">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog
        title="修改用户"
        :visible.sync="updateuser"
        width="40%"
        :before-close="handleClose">
        <div class="myregisterinput" style="height:300px">
          <div class="registerinput" style="height:300px">
              <div class="reginput">
                  <div class="rinput">学号</div>
                  <input type="text" placeholder="请输入学号" class="myreinput" v-model="uidss">
              </div>
              <div class="reginput">
                  <div class="rinput">姓名</div>
                  <input type="text" placeholder="请输入姓名" class="myreinput" v-model="unamess">
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
          </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateuser = false">取 消</el-button>
          <el-button type="primary" v-on:click="sureupdate">确 定</el-button>
        </span>
      </el-dialog>

      <el-table 
      :data="users"
      border height="580" style="width: 90%;margin-left:60px">
          <el-table-column prop="uid" label="学号" width="150">
          </el-table-column>
          <el-table-column prop="uname" label="姓名" width="120">
          </el-table-column>
          <el-table-column  prop="usex" label="性别" width="120">
          </el-table-column>
          <el-table-column  prop="uage" label="年龄" width="120">
          </el-table-column>
          <el-table-column  prop="uiphone" label="联系电话" width="150">
          </el-table-column>
          <el-table-column  prop="cno" label="班级号" width="120">
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="120"
          style="color:#87CEEB;">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.uid)"  style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
              <el-button style="background-color:red;color:#ffffff;" @click="handdel(scope.row.uid)">删除</el-button>
          </template>
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from 'axios';
 export default {
  data() {
      return {
        users: [],
        dialogVisible: false,
        updateuser:false,
        myuid:"",
        uids:"",
        uidss:"",
        unames:"",
        unamess:"",
        uiphones:"",
        uiphoness:"",
        uages:"",
        uagess:"",
        upwd1s:"",
        upwd1ss:"",
        upwd2s:"",
        cnos:"",
        cnoss:"",
        usexs:"",
        usexss:"",
        filename:"",
        filenames:"",
        searchcon:"",
        upuser:{},
      }
    },
    created:function(){
      axios.get("http://localhost:8088/getalluser").then((response)=>{
          this.users = response.data;
      })
    },
    methods: {
      mysearchuser(){
        axios.get("http://localhost:8088/getusersByvague?msg="+this.searchcon).then((response)=>{
          this.users = response.data;
        });
      },
      freshuser(){
        axios.get("http://localhost:8088/getalluser").then((response)=>{
          this.users = response.data;
          this.searchcon = "";
      })
      },
      handleClick(uid) {
        this.updateuser = true;
        axios.get("http://localhost:8088/getuserByid?uid="+uid).then((response)=>{
          this.upuser = response.data;
          this.uidss = this.upuser.uid;
          this.myuid = this.upuser.uid;
          this.unamess = this.upuser.uname;
          this.uiphoness = this.upuser.uiphone;
          this.uagess = this.upuser.uage;
          this.cnoss = this.upuser.cno;
          this.usexss = this.upuser.usex;
          this.upwd1ss = this.upuser.upwd;
          this.filenames = this.upuser.uimg;
      })
      },
      sureupdate(){
        axios.get("http://localhost:8088/deluser?uid="+this.myuid).then((response)=>{
          if(response.data = "删除成功"){
            axios.get("http://localhost:8088/adduser?uid="+this.uidss+"&upwd="+this.upwd1ss+"&uname="+this.unamess+"&usex="+this.usexss+"&uage="+parseInt(this.uagess)+"&uiphone="+this.uiphoness+"&cno="+this.cnoss+"&uimg="+this.filenames).then((response)=>{
              if(response.data = "插入成功"){
                  alert("修改成功！");
                  window.location.reload();
              }else{
                  alert("修改失败！");
              }
            });
          }else{
            alert("修改失败！");
            window.location.reload();
          }
        })
        
      },
      handdel(uid){
        this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/deluser?uid="+uid).then((response)=>{
            if(response.data = "删除成功"){
              window.location.reload();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              alert("删除失败")
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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
                                    alert("添加成功！");
                                    window.location.reload();
                                }else{
                                    alert("添加失败！");
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
    
  }
</script>

<style scoped>
.myfun{
  margin-bottom: 10px;
}
.mystusearch{
  margin-left: 420px;
}
.addbut{
  float:right;
  margin-right: 120px;
}
.myregisterinput{
  height: 400px;
}
</style>