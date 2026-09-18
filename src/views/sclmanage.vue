<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">SCL-90测量表管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" placeholder="搜索.." v-model="testsearch">
          <button class="searchbut" v-on:click="mysearchtest">搜索</button>
          <button class="searchbut" v-on:click="freshtest">重置</button>
        </div>
        <el-table 
        :data="questions"
        border height="500" style="width:70%;margin-left:150px">
            <el-table-column prop="id" label="题号" width="150">
            </el-table-column>
            <el-table-column prop="tfid" label="表号" width="120">
            </el-table-column>
            <el-table-column  prop="qname" label="题目" width="300">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="deltest(scope.row.id)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        questions: [],
        testsearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchtest(){
        axios.get("http://localhost:8088/getquebyvag?str="+this.testsearch).then((response)=>{
          this.questions = response.data;
        });
      },
      freshtest(){
        axios.get("http://localhost:8088/getAllque").then((response)=>{
          this.questions = response.data;
          this.testsearch = "";
      })
      },
      deltest(id){
        this.$confirm('此操作将永久删除该条班级信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delquestion?id="+id).then((response)=>{
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
      axios.get("http://localhost:8088/getAllque").then((response)=>{
          this.questions = response.data;
      })
    },
  }
</script>

<style scoped>
.myfun{
  margin-bottom: 10px;
}
.mystusearch{
  margin-left: 415px;
}
</style>