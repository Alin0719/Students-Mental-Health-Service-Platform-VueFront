<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">原帖信息管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" placeholder="搜索.." v-model="postsearch">
          <button class="searchbut" v-on:click="mysearchpost">搜索</button>
          <button class="searchbut" v-on:click="freshpost">重置</button>
        </div>
        <el-table 
        :data="treeposts"
        border  style="width: 100%;" width="">
            <el-table-column prop="trno" label="编号" width="150">
            </el-table-column>
            <el-table-column prop="uid" label="学号" width="120">
            </el-table-column>
            <el-table-column  prop="trtime" label="发表时间" width="160">
            </el-table-column>
            <el-table-column  prop="trucontent" label="原帖内容" width="700">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="delpost(scope.row.trno)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        treeposts: [],
        postsearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchpost(){
        axios.get("http://localhost:8088/getpostbyvag?str="+this.postsearch).then((response)=>{
          this.treeposts = response.data;
        });
      },
      freshpost(){
        axios.get("http://localhost:8088/getAlltreepost").then((response)=>{
          this.treeposts = response.data;
          this.postsearch = "";
        })
      },
      delpost(trno){
        this.$confirm('此操作将永久删除该条帖子信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/deltreepost?trno="+trno).then((response)=>{
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
      axios.get("http://localhost:8088/getAlltreepost").then((response)=>{
          this.treeposts = response.data;
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
</style>