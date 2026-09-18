<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">教育宣传管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" placeholder="搜索.." v-model="edusearch">
          <button class="searchbut" v-on:click="mysearchedus">搜索</button>
          <button class="searchbut" v-on:click="freshedus">重置</button>
          <button class="addbut" @click="addedus = true">添加</button>
        </div>
        <el-table 
        :data="educations"
        border height="550" style="width: 100%">
            <el-table-column prop="eno" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="etitle" label="文章标题" width="200">
            </el-table-column>
            <el-table-column  prop="etime" label="发表时间" width="130">
            </el-table-column>
            <el-table-column  prop="econtent" label="文章内容" width="800">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="deledu(scope.row.eno)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        educations: [],
        addedus:false,
        edusearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchedus(){
        axios.get("http://localhost:8088/geteduByvague?str="+this.edusearch).then((response)=>{
          this.educations = response.data;
        });
      },
      freshedus(){
        axios.get("http://localhost:8088/getAlledu").then((response)=>{
          this.educations = response.data;
          this.edusearch = "";
        })
      },
      deledu(eno){
        this.$confirm('此操作将永久删除该条帖子信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delnews?nno="+nno).then((response)=>{
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
      axios.get("http://localhost:8088/getAlledu").then((response)=>{
          this.educations = response.data;
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
</style>