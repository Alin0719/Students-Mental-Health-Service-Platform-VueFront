<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">教师信息管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" v-model="teasearch">
          <button class="searchbut" v-on:click="mysearchteacher">搜索</button>
          <button class="searchbut" v-on:click="freshteacher">重置</button>
          <button class="addbut" @click="dialogVisible = true">添加</button>
        </div>

        <el-dialog
        title="添加教师"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <div class="myregisterinput">
          <div class="registerinput">
              <div class="reginput">
                  <div class="rinput">工号</div>
                  <input type="text" placeholder="请输入工号" class="myreinput" v-model="addtid">
              </div>
              <div class="reginput">
                  <div class="rinput">姓名</div>
                  <input type="text" placeholder="请输入姓名" class="myreinput" v-model="addtname">
              </div>
              <div class="reginput">
                  <div class="rinput">年龄</div>
                  <input type="text" placeholder="请输入年龄" class="myreinput" v-model="addtage">
              </div>
              <div class="reginput">
                  <div class="rinput">密码</div>
                  <input type="password" placeholder="请输入密码" class="myreinput" v-model="addtpwd1">
              </div>
              <div class="reginput">
                  <div class="rinput">确认密码</div>
                  <input type="password" placeholder="请再次输入密码" class="myreinput" v-model="addtpwd2">
              </div>
              <div class="reginput">
                  <div class="rinput">手机号码</div>
                  <input type="text" placeholder="请输入手机号码" class="myreinput" v-model="addtiphone">
              </div>
              <div class="reginput">
                  <div class="rinput">性别</div>
                  <input type="text" placeholder="请输入'男'或'女'" class="myreinput" v-model="addtsex">
              </div>
              <div class="reginput">
                <div class="rinput">经验</div>
                <input type="text" placeholder="请输入经验" class="myreinput" v-model="addqualification">
              </div>
              <div class="reginput">
                  <div class="rinput">上传头像</div>
                  <input type="file" ref="fileInput" />
              </div>
          </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-on:click="myteacherupload">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog
        title="修改教师"
        :visible.sync="updateteacher"
        width="40%"
        :before-close="handleClose">
        <div class="myregisterinput" style="height:300px">
          <div class="registerinput" style="height:300px">
              <div class="reginput">
                  <div class="rinput">工号</div>
                  <input type="text" placeholder="请输入工号" class="myreinput" v-model="addtids">
              </div>
              <div class="reginput">
                  <div class="rinput">姓名</div>
                  <input type="text" placeholder="请输入姓名" class="myreinput" v-model="addtnames">
              </div>
              <div class="reginput">
                  <div class="rinput">年龄</div>
                  <input type="text" placeholder="请输入年龄" class="myreinput" v-model="addtages">
              </div>
              <div class="reginput">
                  <div class="rinput">手机号码</div>
                  <input type="text" placeholder="请输入手机号码" class="myreinput" v-model="addtiphones">
              </div>
              <div class="reginput">
                  <div class="rinput">性别</div>
                  <input type="text" placeholder="请输入'男'或'女'" class="myreinput" v-model="addtsexs">
              </div>
              <div class="reginput">
                <div class="rinput">经验</div>
                <input type="text" placeholder="请输入经验" class="myreinput" v-model="addqualifications">
              </div>
          </div>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateteacher = false">取 消</el-button>
          <el-button type="primary" v-on:click="updatemyteacher">确 定</el-button>
        </span>
      </el-dialog>

            <el-table 
            :data="teachers"
            border  style="width: 100%;">
                <el-table-column prop="tid" label="工号" width="150">
                </el-table-column>
                <el-table-column prop="tname" label="姓名" width="120">
                </el-table-column>
                <el-table-column  prop="tsex" label="性别" width="120">
                </el-table-column>
                <el-table-column  prop="tage" label="年龄" width="120">
                </el-table-column>
                <el-table-column  prop="tiphone" label="联系电话" width="150">
                </el-table-column>
                <el-table-column  prop="qualification" label="经验" width="250">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="120"
                style="color:#87CEEB;">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.tid)"  style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                    <el-button @click="delteacher(scope.row.tid)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        teachers: [],
        teasearch:"",
        dialogVisible: false,
        addtid:"",
        addtname:"",
        addtage:"",
        addtpwd1:"",
        addtpwd2:"",
        addtiphone:"",
        addtsex:"",
        addqualification:"",
        filename:"",
        uploadresult:"",
        addtids:"",
        addtnames:"",
        addtages:"",
        addtiphones:"",
        addtsexs:"",
        addqualifications:"",
        filenames:"",
        updateteacher:false,
        teacher:{},
      }
    },
    methods: {
      handleClick(tid) {
        this.updateteacher = true;
        axios.get("http://localhost:8088/getBytid?tid="+tid).then((response)=>{
          this.teacher = response.data;
          this.addtids = this.teacher.tid;
          this.addtnames = this.teacher.tname;
          this.addtages = this.teacher.tage;
          this.addtiphones = this.teacher.tiphone;
          this.addtsexs = this.teacher.tsex;
          this.addqualifications = this.teacher.qualification;
          this.filenames = this.teacher.timg;
        });
      },
      updatemyteacher(){
        if(this.addtids == null || this.addtnames == null || this.addtages == null || this.addtiphones == null || this.addtsexs == null || this.addqualifications == null){
          alert("有选项未填写，请重新添加！");
        }else{
          axios.get("http://localhost:8088/delteacher?tid="+this.teacher.tid).then((response)=>{
          if(response.data == "删除成功"){
            axios.get("http://localhost:8088/addteacher?tid="+this.addtids+"&tpwd="+this.teacher.tpwd+"&tname="+this.addtnames+"&tsex="+this.addtsexs+"&tage="+parseInt(this.addtages)+"&tiphone="+this.addtiphones+"&qualification="+this.addqualifications+"&timg="+this.teacher.timg).then((response)=>{
              if(response.data = "添加成功"){
                  alert("修改成功！");
                  window.location.reload();
              }else{
                  alert("修改失败，请联系工作人员！");
              }
            });
          }else{
            alert("修改失败，请联系工作人员！")
          }
        });
        }
      },
      mysearchteacher(){
        axios.get("http://localhost:8088/getteacherbyvag?str="+this.teasearch).then((response)=>{
          this.teachers = response.data;
        });
      },
      freshteacher(){
        axios.get("http://localhost:8088/getAllteachers").then((response)=>{
          this.teachers = response.data;
          this.teasearch = ""
        })
      },
      myteacherupload(){
        const file = this.$refs.fileInput.files[0];
        if(this.addtid == null || this.addtname == null || this.addtage == null || this.addtpwd1 == null || this.addtpwd2 == null || this.addtiphone == null || this.addtsex == null || this.addqualification == null || file == null){
          alert("有选项未填写，请重新添加！");
        }else{
          if(this.addtpwd1 != this.addtpwd2){
            alert("两次密码不一致，请重新修改！")
          }else{
            if(this.addtsex == '男' || this.addtsex == '女'){
              const file = this.$refs.fileInput.files[0]; // 获取选择的文件对象
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
                  axios.get("http://localhost:8088/addteacher?tid="+this.addtid+"&tpwd="+this.addtpwd1+"&tname="+this.addtname+"&tsex="+this.addtsex+"&tage="+parseInt(this.addtage)+"&tiphone="+this.addtiphone+"&qualification="+this.addqualification+"&timg="+this.filename).then((response)=>{
                      if(response.data = "添加成功"){
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
              alert("性别必须为男或女，请重新填写！");
            }
          }
        }
      },
      delteacher(tid){
        this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delteacher?tid="+tid).then((response)=>{
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
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    created:function(){
      axios.get("http://localhost:8088/getAllteachers").then((response)=>{
          this.teachers = response.data;
      })
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