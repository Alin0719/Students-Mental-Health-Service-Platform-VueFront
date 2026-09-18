<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">班级信息管理</h1>
        <div class="myfun">
            <input type="text" class="mystusearch" v-model="classearch">
            <button class="searchbut" v-on:click="mysearchclass">搜索</button>
            <button class="searchbut" v-on:click="freshclass">重置</button>
            <button class="addbut">添加</button>
        </div>
        <el-table 
        :data="classes"
        border style="width:65%;margin-left:185px">
            <el-table-column prop="cno" label="班级号" width="150">
            </el-table-column>
            <el-table-column prop="cname" label="班级名" width="200">
            </el-table-column>
            <el-table-column  prop="cmajor" label="所属专业" width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="delcalss(scope.row.cno)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        classes: [],
        classearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchclass(){
        axios.get("http://localhost:8088/getclassByvague?str="+this.classearch).then((response)=>{
          this.classes = response.data;
        });
      },
      freshclass(){
        axios.get("http://localhost:8088/getAllclass").then((response)=>{
          this.classes = response.data;
          this.classearch = "";
      })
      },
      delcalss(cno){
        this.$confirm('此操作将永久删除该条班级信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delclass?cno="+cno).then((response)=>{
            if(response.data = "删除成功！"){
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
      }
    },
    created:function(){
      axios.get("http://localhost:8088/getAllclass").then((response)=>{
          this.classes = response.data;
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
    margin-right: 200px;
  }
</style>